/**
 * Terrain : bruit simplex 3D + marching squares → courbes de niveau.
 * Module isomorphe : utilisé dans le navigateur (canvas animé) et au build (couvertures SVG).
 * Aucune dépendance.
 */

/* ------------------------------------------------------------------ hasard reproductible */

export function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ bruit simplex 3D */

const GRAD3 = new Float32Array([
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0,
  -1, -1,
]);
const F3 = 1 / 3;
const G3 = 1 / 6;

export type Noise3D = (x: number, y: number, z: number) => number;

/** Bruit simplex 3D (d'après S. Gustavson), valeurs dans [-1, 1]. */
export function createNoise3D(seed: number): Noise3D {
  const rand = mulberry32(seed);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = p[i]!;
    p[i] = p[j]!;
    p[j] = tmp;
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255]!;
    permMod12[i] = perm[i]! % 12;
  }

  return (xin, yin, zin) => {
    let n0 = 0;
    let n1 = 0;
    let n2 = 0;
    let n3 = 0;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    const z0 = zin - (k - t);

    let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
    if (x0 >= y0) {
      if (y0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 1, 0];
      else if (x0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 0, 1];
      else [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 1, 0, 1];
    } else {
      if (y0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 0, 1, 1];
      else if (x0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 0, 1, 1];
      else [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 1, 1, 0];
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3;
    const y2 = y0 - j2 + 2 * G3;
    const z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3;
    const y3 = y0 - 1 + 3 * G3;
    const z3 = z0 - 1 + 3 * G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 > 0) {
      const gi = permMod12[ii + perm[jj + perm[kk]!]!]! * 3;
      t0 *= t0;
      n0 = t0 * t0 * (GRAD3[gi]! * x0 + GRAD3[gi + 1]! * y0 + GRAD3[gi + 2]! * z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 > 0) {
      const gi = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]!]!]! * 3;
      t1 *= t1;
      n1 = t1 * t1 * (GRAD3[gi]! * x1 + GRAD3[gi + 1]! * y1 + GRAD3[gi + 2]! * z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 > 0) {
      const gi = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]!]!]! * 3;
      t2 *= t2;
      n2 = t2 * t2 * (GRAD3[gi]! * x2 + GRAD3[gi + 1]! * y2 + GRAD3[gi + 2]! * z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 > 0) {
      const gi = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]!]!]! * 3;
      t3 *= t3;
      n3 = t3 * t3 * (GRAD3[gi]! * x3 + GRAD3[gi + 1]! * y3 + GRAD3[gi + 2]! * z3);
    }
    return 32 * (n0 + n1 + n2 + n3);
  };
}

/* ------------------------------------------------------------------ champ d'altitude */

export interface Bump {
  x: number;
  y: number;
  /** Hauteur ajoutée au sommet. */
  amp: number;
  /** Étalement (mêmes unités que x / y). */
  radius: number;
}

export interface FieldSpec {
  cols: number;
  rows: number;
  /** Taille d'une cellule (px ou unités SVG). */
  cell: number;
  /** Fréquence du relief : plus petit = plus large. */
  scale: number;
  time: number;
  bumps?: Bump[];
}

/** Échantillonne le relief sur une grille de (cols + 1) × (rows + 1) points. */
export function sampleField(noise: Noise3D, spec: FieldSpec, out?: Float32Array): Float32Array {
  const { cols, rows, cell, scale, time, bumps = [] } = spec;
  const w = cols + 1;
  const size = w * (rows + 1);
  const values = out && out.length === size ? out : new Float32Array(size);
  for (let j = 0; j <= rows; j++) {
    const y = j * cell;
    for (let i = 0; i <= cols; i++) {
      const x = i * cell;
      let v = noise(x * scale, y * scale, time) * 0.68 + noise(x * scale * 2.3, y * scale * 2.3, time * 1.4 + 17) * 0.32;
      for (const b of bumps) {
        const dx = x - b.x;
        const dy = y - b.y;
        v += b.amp * Math.exp(-(dx * dx + dy * dy) / (2 * b.radius * b.radius));
      }
      values[j * w + i] = v;
    }
  }
  return values;
}

/* ------------------------------------------------------------------ marching squares */

/**
 * Ajoute à `out` les segments (x1, y1, x2, y2, en unités de grille) de la courbe de niveau `level`.
 */
export function contourSegments(values: Float32Array, cols: number, rows: number, level: number, out: number[]): void {
  const w = cols + 1;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = values[j * w + i]!;
      const b = values[j * w + i + 1]!;
      const c = values[(j + 1) * w + i + 1]!;
      const d = values[(j + 1) * w + i]!;
      const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
      if (idx === 0 || idx === 15) continue;

      const topX = i + (level - a) / (b - a);
      const rightY = j + (level - b) / (c - b);
      const bottomX = i + (level - d) / (c - d);
      const leftY = j + (level - a) / (d - a);

      switch (idx) {
        case 1:
        case 14:
          out.push(i, leftY, bottomX, j + 1);
          break;
        case 2:
        case 13:
          out.push(i + 1, rightY, bottomX, j + 1);
          break;
        case 3:
        case 12:
          out.push(i, leftY, i + 1, rightY);
          break;
        case 4:
        case 11:
          out.push(topX, j, i + 1, rightY);
          break;
        case 5:
          out.push(topX, j, i + 1, rightY, i, leftY, bottomX, j + 1);
          break;
        case 6:
        case 9:
          out.push(topX, j, bottomX, j + 1);
          break;
        case 7:
        case 8:
          out.push(i, leftY, topX, j);
          break;
        case 10:
          out.push(i, leftY, topX, j, i + 1, rightY, bottomX, j + 1);
          break;
      }
    }
  }
}

/** Relie les segments en polylignes (pour un SVG compact). */
export function chainSegments(segs: number[]): number[][] {
  const n = segs.length / 4;
  const key = (x: number, y: number) => `${Math.round(x * 1000)}:${Math.round(y * 1000)}`;
  const ends = new Map<string, number[]>();
  for (let s = 0; s < n; s++) {
    for (const e of [0, 1]) {
      const k = key(segs[s * 4 + e * 2]!, segs[s * 4 + e * 2 + 1]!);
      const list = ends.get(k);
      if (list) list.push(s);
      else ends.set(k, [s]);
    }
  }
  const used = new Uint8Array(n);
  const lines: number[][] = [];

  const extend = (line: number[], x: number, y: number, forward: boolean) => {
    let cx = x;
    let cy = y;
    for (;;) {
      const candidates = ends.get(key(cx, cy));
      const next = candidates?.find((s) => !used[s]);
      if (next === undefined) return;
      used[next] = 1;
      const ax = segs[next * 4]!;
      const ay = segs[next * 4 + 1]!;
      const bx = segs[next * 4 + 2]!;
      const by = segs[next * 4 + 3]!;
      const sameA = key(ax, ay) === key(cx, cy);
      const nx = sameA ? bx : ax;
      const ny = sameA ? by : ay;
      if (forward) line.push(nx, ny);
      else line.unshift(nx, ny);
      cx = nx;
      cy = ny;
    }
  };

  for (let s = 0; s < n; s++) {
    if (used[s]) continue;
    used[s] = 1;
    const line = [segs[s * 4]!, segs[s * 4 + 1]!, segs[s * 4 + 2]!, segs[s * 4 + 3]!];
    extend(line, line[2]!, line[3]!, true);
    extend(line, line[0]!, line[1]!, false);
    lines.push(line);
  }
  return lines;
}

/** Niveaux régulièrement espacés entre min et max. */
export function levelsBetween(min: number, max: number, count: number): number[] {
  const step = (max - min) / (count + 1);
  return Array.from({ length: count }, (_, k) => min + step * (k + 1));
}

export function extent(values: Float32Array): { min: number; max: number; maxIndex: number } {
  let min = Infinity;
  let max = -Infinity;
  let maxIndex = 0;
  for (let k = 0; k < values.length; k++) {
    const v = values[k]!;
    if (v < min) min = v;
    if (v > max) {
      max = v;
      maxIndex = k;
    }
  }
  return { min, max, maxIndex };
}

/* ------------------------------------------------------------------ couverture SVG (build) */

export interface CoverOptions {
  width?: number;
  height?: number;
  cell?: number;
  levels?: number;
  colors?: { bg: string; line: string; index: string; accent: string; grid: string };
}

const DEFAULT_COLORS = {
  bg: '#141920',
  line: 'rgba(232,237,242,0.20)',
  index: 'rgba(232,237,242,0.42)',
  accent: '#B6F36A',
  grid: 'rgba(232,237,242,0.06)',
};

const r1 = (v: number) => Math.round(v * 10) / 10;

function linesToPath(lines: number[][], cell: number): string {
  return lines
    .map((line) => {
      let d = `M${r1(line[0]! * cell)} ${r1(line[1]! * cell)}`;
      for (let k = 2; k < line.length; k += 2) d += `L${r1(line[k]! * cell)} ${r1(line[k + 1]! * cell)}`;
      return d;
    })
    .join('');
}

/**
 * Relief propre à une graine (identifiant de projet) : courbes, courbes maîtresses, sommet en citron.
 */
export function renderCoverSVG(seed: string, options: CoverOptions = {}): string {
  const { width = 800, height = 500, cell = 10, levels = 11 } = options;
  const colors = { ...DEFAULT_COLORS, ...options.colors };
  const rand = mulberry32(hashString(seed));
  const noise = createNoise3D(hashString(`${seed}:noise`));
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const bumps: Bump[] = [
    { x: width * (0.3 + rand() * 0.4), y: height * (0.3 + rand() * 0.4), amp: 0.75 + rand() * 0.3, radius: width * (0.12 + rand() * 0.08) },
    { x: width * rand(), y: height * rand(), amp: 0.35 + rand() * 0.25, radius: width * (0.08 + rand() * 0.08) },
  ];
  const values = sampleField(noise, { cols, rows, cell, scale: 0.0042 + rand() * 0.0018, time: rand() * 50, bumps });
  const { min, max, maxIndex } = extent(values);
  const lv = levelsBetween(min, max, levels);

  let minor = '';
  let major = '';
  let top = '';
  lv.forEach((level, k) => {
    const segs: number[] = [];
    contourSegments(values, cols, rows, level, segs);
    const d = linesToPath(chainSegments(segs), cell);
    if (k === lv.length - 1) top += d;
    else if (k % 4 === 3) major += d;
    else minor += d;
  });

  const peakX = r1((maxIndex % (cols + 1)) * cell);
  const peakY = r1(Math.floor(maxIndex / (cols + 1)) * cell);
  let grid = '';
  for (let x = 100; x < width; x += 100) grid += `M${x} 0V${height}`;
  for (let y = 100; y < height; y += 100) grid += `M0 ${y}H${width}`;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice">`,
    `<rect width="${width}" height="${height}" fill="${colors.bg}"/>`,
    `<path d="${grid}" stroke="${colors.grid}" stroke-width="1" fill="none"/>`,
    `<g fill="none" stroke-linecap="round" stroke-linejoin="round">`,
    `<path d="${minor}" stroke="${colors.line}" stroke-width="1"/>`,
    `<path d="${major}" stroke="${colors.index}" stroke-width="1.6"/>`,
    `<path d="${top}" stroke="${colors.accent}" stroke-width="1.8"/>`,
    `</g>`,
    `<g stroke="${colors.accent}" stroke-width="1.5" fill="none">`,
    `<circle cx="${peakX}" cy="${peakY}" r="5"/>`,
    `<path d="M${peakX - 14} ${peakY}h8M${peakX + 6} ${peakY}h8M${peakX} ${peakY - 14}v8M${peakX} ${peakY + 6}v8"/>`,
    `</g>`,
    `</svg>`,
  ].join('');
}
