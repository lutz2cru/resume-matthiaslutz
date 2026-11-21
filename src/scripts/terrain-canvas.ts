/**
 * Terrain génératif en canvas 2D : courbes de niveau animées très lentement,
 * le curseur soulève une colline. Pause hors écran / onglet caché ; image fixe si animations réduites.
 */
import { contourSegments, createNoise3D, hashString, sampleField, type Bump } from '~/lib/terrain';
import { isMotionReduced, onMotionChange } from './preferences';

type Variant = 'hero' | 'band';

const CONFIG: Record<Variant, { cell: number; levels: number; scale: number; alpha: number; bump: number; radius: number; speed: number }> = {
  hero: { cell: 14, levels: 13, scale: 0.0026, alpha: 1, bump: 0.62, radius: 150, speed: 0.000045 },
  band: { cell: 16, levels: 9, scale: 0.0032, alpha: 0.7, bump: 0.5, radius: 120, speed: 0.00003 },
};

/**
 * Le relief est d'abord dessiné une fois, immobile ; il ne s'anime qu'à la première interaction
 * (souris, défilement, clavier, toucher). La page reste ainsi légère au chargement.
 */
let awake = false;
const sleepers = new Set<() => void>();
const WAKE_EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'scroll', 'touchstart'] as const;
function wake() {
  if (awake) return;
  awake = true;
  WAKE_EVENTS.forEach((ev) => removeEventListener(ev, wake));
  sleepers.forEach((cb) => cb());
}
WAKE_EVENTS.forEach((ev) => addEventListener(ev, wake, { passive: true }));

function cssColor(name: string, fallback: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function withAlpha(hex: string, alpha: number): string {
  const m = hex.replace('#', '');
  const n = parseInt(m.length === 3 ? m.replace(/(.)/g, '$1$1') : m, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

class Terrain {
  private ctx: CanvasRenderingContext2D;
  private noise;
  private cfg;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private cols = 0;
  private rows = 0;
  private cell: number;
  private values: Float32Array | undefined;
  private time: number;
  private running = false;
  private visible = false;
  private raf = 0;
  private last = 0;
  private pointer = { x: 0, y: 0, tx: 0, ty: 0, amp: 0, target: 0 };
  private readout: HTMLElement | null;
  private colors = { line: '', index: '', brand: '', tech: '' };

  constructor(
    private root: HTMLElement,
    private canvas: HTMLCanvasElement,
    variant: Variant,
  ) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('canvas 2D indisponible');
    this.ctx = ctx;
    this.cfg = CONFIG[variant];
    this.cell = this.cfg.cell;
    const seed = hashString(root.dataset.seed ?? 'tulz');
    this.noise = createNoise3D(seed);
    this.time = (seed % 1000) / 10;
    this.readout = document.querySelector<HTMLElement>(`[data-terrain-readout="${root.id}"]`);
    const text = cssColor('--c-text', '#f1f5f9');
    this.colors = {
      line: withAlpha(text, 0.085 * this.cfg.alpha),
      index: withAlpha(text, 0.2 * this.cfg.alpha),
      brand: cssColor('--c-brand', '#8b5cf6'),
      tech: cssColor('--c-tech', '#60a5fa'),
    };

    new ResizeObserver(() => this.resize()).observe(root);
    new IntersectionObserver(([entry]) => {
      this.visible = !!entry?.isIntersecting;
      this.update();
    }).observe(root);
    document.addEventListener('visibilitychange', () => this.update());
    onMotionChange(() => this.update());
    sleepers.add(() => this.update());

    window.addEventListener('pointermove', (e) => this.onPointer(e), { passive: true });
    // Le terrain ignore les pointeurs (pointer-events: none) : on écoute la sortie de la fenêtre.
    document.documentElement.addEventListener('mouseleave', () => (this.pointer.target = 0));
    this.resize();
    root.classList.add('is-live');
  }

  private onPointer(e: PointerEvent) {
    if (!this.visible || e.pointerType === 'touch') return;
    const rect = this.root.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    this.pointer.target = inside ? this.cfg.bump : 0;
    if (inside) {
      this.pointer.tx = x;
      this.pointer.ty = y;
      if (this.pointer.amp < 0.01) {
        this.pointer.x = x;
        this.pointer.y = y;
      }
    }
  }

  private resize() {
    const rect = this.root.getBoundingClientRect();
    this.width = Math.max(1, Math.round(rect.width));
    this.height = Math.max(1, Math.round(rect.height));
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.cell = this.width < 640 ? this.cfg.cell + 4 : this.cfg.cell;
    this.cols = Math.ceil(this.width / this.cell);
    this.rows = Math.ceil(this.height / this.cell);
    this.values = undefined;
    this.draw();
  }

  private update() {
    const shouldRun = awake && this.visible && !document.hidden && !isMotionReduced();
    if (shouldRun && !this.running) {
      this.running = true;
      this.last = performance.now();
      this.raf = requestAnimationFrame((t) => this.loop(t));
    } else if (!shouldRun && this.running) {
      this.running = false;
      cancelAnimationFrame(this.raf);
      this.pointer.amp = 0;
      this.draw();
    }
  }

  private loop(now: number) {
    if (!this.running) return;
    this.raf = requestAnimationFrame((t) => this.loop(t));
    const dt = now - this.last;
    if (dt < 33) return; // 30 images/s maximum
    this.last = now;
    this.time += dt * this.cfg.speed;
    const p = this.pointer;
    p.x += (p.tx - p.x) * 0.09;
    p.y += (p.ty - p.y) * 0.09;
    p.amp += (p.target - p.amp) * 0.06;
    this.draw();
  }

  private draw() {
    const { ctx, cols, rows, cell } = this;
    if (!cols || !rows) return;
    const bumps: Bump[] = this.pointer.amp > 0.005 ? [{ x: this.pointer.x, y: this.pointer.y, amp: this.pointer.amp, radius: this.cfg.radius }] : [];
    this.values = sampleField(this.noise, { cols, rows, cell, scale: this.cfg.scale, time: this.time, bumps }, this.values);
    const values = this.values;

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const min = -0.85;
    const max = 0.85 + this.cfg.bump * 0.55;
    const count = this.cfg.levels;
    const step = (max - min) / (count + 1);
    const segs: number[] = [];
    // Courbe du sommet : dégradé identitaire violet → bleu, le seul élément coloré du relief.
    const summit = ctx.createLinearGradient(0, 0, this.width, this.height);
    summit.addColorStop(0, this.colors.brand);
    summit.addColorStop(1, this.colors.tech);

    for (let k = 1; k <= count; k++) {
      const level = min + step * k;
      segs.length = 0;
      contourSegments(values, cols, rows, level, segs);
      if (!segs.length) continue;
      const isTop = k === count;
      const isIndex = k % 4 === 0;
      ctx.strokeStyle = isTop ? summit : isIndex ? this.colors.index : this.colors.line;
      ctx.lineWidth = isTop ? 1.4 : isIndex ? 1.15 : 1;
      ctx.beginPath();
      for (let s = 0; s < segs.length; s += 4) {
        ctx.moveTo(segs[s]! * cell, segs[s + 1]! * cell);
        ctx.lineTo(segs[s + 2]! * cell, segs[s + 3]! * cell);
      }
      ctx.stroke();
    }

    if (this.readout && this.pointer.amp > 0.02) {
      const i = Math.min(cols, Math.max(0, Math.round(this.pointer.x / cell)));
      const j = Math.min(rows, Math.max(0, Math.round(this.pointer.y / cell)));
      const v = values[j * (cols + 1) + i] ?? 0;
      const z = Math.round(((v - min) / (max - min)) * 1000);
      this.readout.textContent = `x ${String(Math.round((this.pointer.x / this.width) * 1000)).padStart(3, '0')} · y ${String(Math.round((this.pointer.y / this.height) * 1000)).padStart(3, '0')} · z ${String(Math.max(0, z)).padStart(3, '0')}`;
    }
  }
}

export function mountTerrains(): void {
  document.querySelectorAll<HTMLElement>('[data-terrain]').forEach((root) => {
    const canvas = root.querySelector('canvas');
    if (!canvas || root.dataset.mounted) return;
    root.dataset.mounted = '1';
    try {
      new Terrain(root, canvas, (root.dataset.variant as Variant) ?? 'band');
    } catch {
      /* canvas indisponible : la grille de points CSS reste en place */
    }
  });
}
