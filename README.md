# TULZ — tulz.fr

Portfolio de Matthias Lutz : un site statique bilingue (FR / EN) construit avec Astro, pensé comme une carte topographique personnelle.

- Design : [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- Architecture : [`ARCHITECTURE.md`](ARCHITECTURE.md)
- Audit de l'ancien site : [`AUDIT.md`](AUDIT.md)
- Rapport de la refonte : [`RAPPORT.md`](RAPPORT.md)

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
title: { fr: "Station météo connectée", en: "Connected weather station" }
```

| Je veux… | Fichier |
|---|---|
| Changer ma bio, « En ce moment », mes liens | `src/content/profile.yaml` |
| Ajouter un projet | un nouveau fichier `src/content/projects/<id>.yaml` (copier un existant) |
| Ajouter une étape au parcours | `src/content/journey.yaml` |
| Ajouter une compétence | `src/content/skills.yaml` (l'id sert dans le champ `stack` des projets) |
| Relier un projet à la constellation | `src/content/interests.yaml` |

- `kind: case` donne une fiche détaillée ; `kind: note` une entrée courte dans le carnet.
- Les projets qui utilisent une compétence sont calculés automatiquement à partir des `stack`.
- Un champ `todo:` s'affiche en jaune en mode développement, jamais en production.
- Le build échoue si un champ manque ou si un projet cite une compétence inconnue : c'est voulu.
- Une valeur YAML qui contient « : » doit être entre guillemets.

## Déployer

Le site est publié par GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur `main`.

**À faire une seule fois, avant de fusionner la refonte dans `main`** :

1. Sur GitHub : *Settings → Pages → Build and deployment → Source* : choisir **GitHub Actions** (aujourd'hui : « Deploy from a branch »).
2. Vérifier que le domaine personnalisé reste `tulz.fr` (le fichier `public/CNAME` est publié avec le site).
3. Fusionner la branche `refonte/tulz-universe` dans `main`, puis pousser.

Sans l'étape 1, GitHub Pages servirait le code source au lieu du site construit.

**Revenir à l'ancien site** : il est conservé dans l'historique (tag `sauvegarde/site-statique-2026-11-21`) et, pour référence, dans `legacy/site-statique/`.

## Structure

```
src/content/      contenu (YAML)
src/views/        une vue par page, partagée FR / EN
src/pages/        routes (FR à la racine, EN sous /en/)
src/components/   interface (site/, ui/, blocks/, mocks/)
src/lib/          terrain génératif, accès au contenu, formats
src/scripts/      JavaScript client (palette, préférences, terrain)
src/styles/       jetons et styles globaux
public/           fichiers servis tels quels
scripts/          vérifications et génération d'images
legacy/           ancien site, non publié
```
