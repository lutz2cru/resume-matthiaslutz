# tulz.fr

Portfolio de Matthias Lutz : une seule page, bilingue (FR / EN), qui présente ses expériences professionnelles, ses formations, ses compétences et sa pratique du handball. Site statique construit avec Astro.

- Design : [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- Architecture : [`ARCHITECTURE.md`](ARCHITECTURE.md)
- Produit (public, objectif, principes) : [`PRODUCT.md`](PRODUCT.md)
- Historique des refontes : [`RAPPORT.md`](RAPPORT.md), [`AUDIT.md`](AUDIT.md)

## Lancer le projet

Node 22.23 ou plus récent (testé avec Node 24).

```bash
npm install
npm run dev          # http://localhost:4321 — les repères TODO sont visibles
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Génère le site dans `dist/` |
| `npm run preview` | Sert `dist/` comme en production |
| `npm run check` | TypeScript + diagnostics Astro |
| `npm run check:content` | Syntaxe des fichiers YAML |
| `npm run test:links` | Liens et ancres internes de `dist/` |
| `npm run verify` | Tout ce qui précède, dans l'ordre (utilisé par le déploiement) |
| `npm run assets` | Régénère les icônes PNG et l'image de partage `public/og.png` |

## Modifier le contenu

Tout le texte est dans `src/content/`. Chaque texte s'écrit dans les deux langues :

```yaml
title: { fr: "Préparateur de commandes", en: "Order picker" }
```

| Je veux… | Fichier |
|---|---|
| Changer mon accroche, mes repères, mes liens, mes langues | `src/content/profile.yaml` |
| Modifier la rubrique Handball | `src/content/profile.yaml`, bloc `handball` |
| Ajouter une expérience ou une formation | `src/content/journey.yaml` (`type: work` ou `engagement` → Expériences ; `education` ou `international` → Formations) |
| Ajouter une compétence | `src/content/skills.yaml` (`level: solid` = pratiqué, `learning` = en apprentissage) |
| Ajouter une ville | `src/content/places.yaml` |

- Les entrées sont triées automatiquement : celle en cours d'abord, puis de la plus récente à la plus ancienne.
- Un champ `todo:` s'affiche en jaune en mode développement, jamais en production.
- Le build échoue si un champ manque : c'est voulu.
- Une valeur YAML qui contient « : » doit être entre guillemets.

## Déployer

Le site est publié par GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur `main`. Le domaine `tulz.fr` est défini dans les réglages Pages et dans `public/CNAME`. Le déploiement s'arrête si `npm run verify` échoue : le site en ligne n'est alors pas modifié.

Si une dépendance change, régénère `package-lock.json` avec `npm install` et vérifie avec `npm ci --dry-run` avant de pousser.

Les anciennes adresses (`/parcours/`, `/competences/`, `/projets/…`, `/hors-code/`, etc.) redirigent vers la rubrique correspondante de la page unique (voir `astro.config.mjs`).

## Structure

```
src/content/      contenu (YAML)
src/views/        Resume.astro : la page, partagée FR / EN
src/pages/        routes (FR à la racine, EN sous /en/, 404)
src/layouts/      Base.astro : <head>, en-tête, pied de page (contact)
src/components/   petits composants d'interface (liens, icônes)
src/lib/          accès au contenu, formats de date, données structurées
src/styles/       jetons et styles globaux
public/           fichiers servis tels quels
scripts/          vérifications et génération d'images
legacy/           ancien site, non publié
```
