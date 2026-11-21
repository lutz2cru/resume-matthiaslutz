/**
 * Scripts communs à toutes les pages (amélioration progressive : rien d'indispensable ici).
 */
import { initPalette } from './palette';
import { copyText, isMotionReduced, isTyping, onMotionChange, setMotion, syncMotionButtons } from './preferences';

/* -------------------------------------------- libellé du modificateur (⌘ sur Mac) */
const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
if (isMac) document.querySelectorAll('[data-kbd-mod]').forEach((el) => (el.textContent = '⌘'));

/* -------------------------------------------- animations : interrupteur */
syncMotionButtons();
document.querySelectorAll('[data-motion-toggle]').forEach((btn) =>
  btn.addEventListener('click', () => setMotion(isMotionReduced() ? 'full' : 'reduced')),
);

/* -------------------------------------------- révélations au défilement */
function initReveal() {
  const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (!items.length) return;
  // Décalage entre frères d'un même groupe.
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((el, i) => el.style.setProperty('--reveal-i', String(Math.min(i, 8))));
  });
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
  onMotionChange(() => items.forEach((el) => el.classList.add('is-in')));
}
initReveal();

/* -------------------------------------------- menu mobile */
function initMenu() {
  const menu = document.querySelector<HTMLDetailsElement>('[data-menu]');
  if (!menu) return;
  const summary = menu.querySelector('summary')!;
  const setLock = () => document.documentElement.style.setProperty('overflow', menu.open ? 'hidden' : '');
  menu.addEventListener('toggle', setLock);
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) {
      menu.open = false;
      summary.focus();
    }
  });
  matchMedia('(min-width: 1100px)').addEventListener('change', (mq) => {
    if (mq.matches) menu.open = false;
  });
}
initMenu();

/* -------------------------------------------- palette + raccourcis */
const palette = initPalette();

document.addEventListener('keydown', (e) => {
  const mod = e.metaKey || e.ctrlKey;
  if (mod && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    palette?.open();
    return;
  }
  if (isTyping(e.target) || mod || e.altKey) return;
  if (e.key === '/' && palette) {
    e.preventDefault();
    palette.open();
    return;
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const link = document.querySelector<HTMLAnchorElement>(e.key === 'ArrowLeft' ? '[data-nav-prev]' : '[data-nav-next]');
    if (link && !e.shiftKey) {
      e.preventDefault();
      window.location.href = link.href;
    }
  }
});

/* -------------------------------------------- copier (adresse e-mail) */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const ok = await copyText(btn.dataset.copy ?? '');
    const live = document.getElementById(btn.getAttribute('aria-describedby') ?? '') ?? btn.parentElement?.querySelector<HTMLElement>('[data-copy-status]');
    if (live && ok) {
      live.textContent = btn.dataset.copied ?? '';
      setTimeout(() => (live.textContent = ''), 2400);
    }
    btn.classList.toggle('is-done', ok);
    setTimeout(() => btn.classList.remove('is-done'), 2400);
  });
});

/* -------------------------------------------- terrain génératif (chargé seulement s'il y en a un) */
if (document.querySelector('[data-terrain]')) {
  import('./terrain-canvas').then((m) => m.mountTerrains());
}
