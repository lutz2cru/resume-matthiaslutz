/**
 * Palette de commandes : recherche floue (sans accents), navigation clavier, actions.
 */
import { copyText, setMotion, isMotionReduced } from './preferences';

type Item = { id: string; group: 'pages' | 'projects' | 'actions'; label: string; hint?: string; href?: string; action?: string; keywords?: string };
type Data = { email: string; groups: Record<Item['group'], string>; empty: string; copied: string; items: Item[] };

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Score simple : préfixe > mot > sous-séquence. Renvoie -1 si aucune correspondance. */
function score(item: Item, query: string): number {
  if (!query) return 1;
  const label = normalize(item.label);
  const hay = `${label} ${normalize(item.keywords ?? '')} ${normalize(item.hint ?? '')}`;
  if (label.startsWith(query)) return 100 - label.length / 100;
  if (label.split(/\s+/).some((w) => w.startsWith(query))) return 80;
  if (hay.includes(query)) return 60;
  let qi = 0;
  for (const ch of label) if (ch === query[qi]) qi++;
  return qi === query.length ? 30 : -1;
}

function highlight(label: string, query: string): string {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
  if (!query) return esc(label);
  const idx = normalize(label).indexOf(query);
  if (idx < 0) return esc(label);
  return `${esc(label.slice(0, idx))}<mark>${esc(label.slice(idx, idx + query.length))}</mark>${esc(label.slice(idx + query.length))}`;
}

export function initPalette(): { open: () => void } | null {
  const dialog = document.getElementById('palette') as HTMLDialogElement | null;
  const input = document.getElementById('palette-input') as HTMLInputElement | null;
  const list = document.getElementById('palette-list') as HTMLUListElement | null;
  const raw = document.getElementById('palette-data')?.textContent;
  if (!dialog || !input || !list || !raw || typeof dialog.showModal !== 'function') return null;

  const data = JSON.parse(raw) as Data;
  const status = dialog.querySelector<HTMLElement>('.status')!;
  let results: Item[] = [];
  let active = 0;
  let lastFocus: HTMLElement | null = null;

  const render = () => {
    const query = normalize(input.value.trim());
    results = data.items
      .map((item) => ({ item, s: score(item, query) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => (query ? b.s - a.s : 0))
      .map((r) => r.item);
    active = Math.min(active, Math.max(results.length - 1, 0));

    list.innerHTML = '';
    status.textContent = results.length ? '' : data.empty;
    const groups: Item['group'][] = ['pages', 'projects', 'actions'];
    let index = 0;
    const ordered: Item[] = [];
    for (const g of groups) {
      const inGroup = results.filter((r) => r.group === g);
      if (!inGroup.length) continue;
      const head = document.createElement('li');
      head.className = 'group';
      head.setAttribute('role', 'presentation');
      head.textContent = data.groups[g];
      list.append(head);
      for (const item of inGroup) {
        const li = document.createElement('li');
        li.id = `opt-${item.id}`;
        li.setAttribute('role', 'option');
        li.dataset.index = String(index);
        li.setAttribute('aria-selected', String(index === active));
        li.innerHTML = `<span class="lbl">${highlight(item.label, query)}</span>${item.hint ? `<span class="hint">${highlight(item.hint, '')}</span>` : ''}`;
        li.addEventListener('mousemove', () => select(Number(li.dataset.index)));
        li.addEventListener('click', () => run(item));
        list.append(li);
        ordered.push(item);
        index++;
      }
    }
    results = ordered;
    updateActive();
  };

  const updateActive = () => {
    const current = results[active];
    list.querySelectorAll('[role="option"]').forEach((el) => el.setAttribute('aria-selected', String(Number((el as HTMLElement).dataset.index) === active)));
    if (current) {
      input.setAttribute('aria-activedescendant', `opt-${current.id}`);
      document.getElementById(`opt-${current.id}`)?.scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  };

  const select = (i: number) => {
    if (i === active) return;
    active = i;
    updateActive();
  };

  const close = () => {
    if (dialog.open) dialog.close();
  };

  const run = async (item: Item) => {
    if (item.href) {
      close();
      window.location.href = item.href;
      return;
    }
    switch (item.action) {
      case 'copy-email': {
        const ok = await copyText(data.email);
        status.textContent = ok ? data.copied : data.email;
        setTimeout(close, ok ? 700 : 2500);
        break;
      }
      case 'toggle-motion':
        setMotion(isMotionReduced() ? 'full' : 'reduced');
        close();
        break;
      case 'top':
        close();
        window.scrollTo({ top: 0 });
        document.getElementById('main')?.focus({ preventScroll: true });
        break;
    }
  };

  const open = () => {
    if (dialog.open) return;
    lastFocus = document.activeElement as HTMLElement | null;
    input.value = '';
    active = 0;
    render();
    dialog.showModal();
    input.focus();
  };

  input.addEventListener('input', () => {
    active = 0;
    render();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      select(results.length ? (active + 1) % results.length : 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      select(results.length ? (active - 1 + results.length) % results.length : 0);
    } else if (e.key === 'Home' && e.ctrlKey) {
      select(0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[active];
      if (item) void run(item);
    }
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  dialog.querySelector('[data-palette-close]')?.addEventListener('click', close);
  dialog.addEventListener('close', () => lastFocus?.focus?.());

  document.querySelectorAll('[data-palette-open]').forEach((btn) => btn.addEventListener('click', open));

  return { open };
}
