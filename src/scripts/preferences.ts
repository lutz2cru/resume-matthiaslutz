/**
 * Préférences de l'utilisateur (animations) et petits utilitaires partagés.
 * Stockage local entouré de try/catch : le site fonctionne sans.
 */
const KEY = 'tulz-motion';
type Motion = 'full' | 'reduced';
const listeners = new Set<(reduced: boolean) => void>();

export function isMotionReduced(): boolean {
  return !document.documentElement.classList.contains('motion-ok');
}

export function setMotion(value: Motion): void {
  const root = document.documentElement;
  root.dataset.motion = value;
  root.classList.toggle('motion-ok', value === 'full');
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* stockage indisponible : la préférence vaut pour cette page */
  }
  syncMotionButtons();
  listeners.forEach((fn) => fn(value === 'reduced'));
}

export function onMotionChange(fn: (reduced: boolean) => void): void {
  listeners.add(fn);
}

export function syncMotionButtons(): void {
  const reduced = isMotionReduced();
  document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]').forEach((btn) => btn.setAttribute('aria-pressed', String(!reduced)));
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
}
