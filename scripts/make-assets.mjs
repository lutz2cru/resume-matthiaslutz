// Génère les icônes PNG (depuis public/favicon.svg) et l'image de partage public/og.png
// (scripts/og/og.html rendu par Chrome sans interface). Usage : npm run assets
import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { renderCoverSVG } from '../src/lib/terrain.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (p) => resolve(root, 'public', p);

// 1. Icônes
const favicon = resolve(root, 'public/favicon.svg');
await sharp(favicon, { density: 384 }).resize(32, 32).png().toFile(pub('favicon-32.png'));
await sharp(favicon, { density: 768 }).resize(180, 180).png().toFile(pub('apple-touch-icon.png'));
console.log('icônes : favicon-32.png, apple-touch-icon.png');

// 2. Image de partage
writeFileSync(resolve(root, 'scripts/og/cover.svg'), renderCoverSVG('tulz-og', { width: 1200, height: 630, cell: 12, levels: 14 }));
const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.warn('Chrome introuvable : og.png non régénérée (définir CHROME_PATH).');
  process.exit(0);
}
const out = pub('og.png');
execFileSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=1',
    '--virtual-time-budget=4000',
    '--window-size=1200,630',
    `--screenshot=${out}`,
    pathToFileURL(resolve(root, 'scripts/og/og.html')).href,
  ],
  { stdio: 'ignore' },
);
const meta = await sharp(out).metadata();
console.log(`og.png : ${meta.width} × ${meta.height}`);
