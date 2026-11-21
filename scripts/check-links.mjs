// Vérifie, dans dist/, que chaque lien interne (href, src, srcset) pointe vers un fichier existant
// et que chaque ancre (#id) existe dans la page cible. Usage : npm run test:links (après npm run build).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const dist = resolve('dist');
if (!existsSync(dist)) {
  console.error('dist/ introuvable : lancer npm run build avant.');
  process.exit(1);
}

const pages = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) pages.push(p);
  }
};
walk(dist);

const idsCache = new Map();
const idsOf = (file) => {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
};

const resolveTarget = (from, url) => {
  const clean = decodeURI(url.split('#')[0].split('?')[0]);
  const base = clean.startsWith('/') ? join(dist, clean) : join(from, '..', clean);
  if (clean === '' || clean.endsWith('/')) return join(clean === '' ? from : base, clean === '' ? '' : 'index.html');
  if (existsSync(base) && statSync(base).isDirectory()) return join(base, 'index.html');
  return base;
};

let checked = 0;
const errors = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const refs = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(ref) || ref.startsWith('//')) continue;
    checked++;
    const target = ref.startsWith('#') ? page : resolveTarget(page, ref);
    if (!existsSync(target)) {
      errors.push(`${relative(dist, page).split(sep).join('/')} → ${ref} (fichier manquant)`);
      continue;
    }
    const hash = ref.includes('#') ? decodeURIComponent(ref.split('#')[1]) : '';
    if (hash && target.endsWith('.html') && !idsOf(target).has(hash)) {
      errors.push(`${relative(dist, page).split(sep).join('/')} → ${ref} (ancre absente)`);
    }
  }
}

console.log(`${pages.length} pages, ${checked} liens internes vérifiés.`);
if (errors.length) {
  console.error(`${errors.length} lien(s) cassé(s) :\n  ${[...new Set(errors)].join('\n  ')}`);
  process.exit(1);
}
console.log('Aucun lien interne cassé.');
