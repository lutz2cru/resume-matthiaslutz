// Vérifie la syntaxe de tous les fichiers YAML de src/content (erreurs lisibles).
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const roots = ['src/content', 'src/content/projects'];
let failed = 0;
for (const dir of roots) {
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.yaml')) continue;
    const file = join(dir, name);
    try {
      parse(readFileSync(file, 'utf8'), { strict: true });
    } catch (e) {
      failed++;
      console.log(`${file}\n  ${String(e.message).split('\n').slice(0, 4).join('\n  ')}`);
    }
  }
}
console.log(failed ? `${failed} fichier(s) en erreur` : 'YAML : tout est valide');
process.exit(failed ? 1 : 0);
