# Architecture

## 1. Choix de la stack

| Besoin | Choix | Pourquoi |
|---|---|---|
| Site statique bilingue | **Astro 7** (`output: 'static'`) | Compatible GitHub Pages, zéro JavaScript par défaut, collections de contenu typées. |
| Contenu modifiable sans toucher au code | **Collections YAML** validées par **Zod** (`src/content.config.ts`) | Chaque texte porte ses deux langues côte à côte (`fr` / `en`) ; une faute de structure casse le build au lieu de casser la page. |
| Typage | **TypeScript** strict | `astro check` en contrôle. |
| Styles | **CSS natif** : jetons (`src/styles/tokens.css`), base (`global.css`), styles scopés de la page | Une page, une poignée de jetons : pas besoin de framework CSS. |
| JavaScript | Un seul script de quelques lignes (rubrique active dans la navigation) | Tout fonctionne sans JavaScript. |
| Police | `@fontsource-variable/archivo` (axes largeur + graisse) | Auto-hébergée, alphabet latin préchargé. |
| SEO | `@astrojs/sitemap`, `hreflang`, Open Graph, JSON-LD `Person`, `robots.txt` | |

## 2. Arborescence

```
public/                  fichiers servis tels quels (CNAME, favicon, og.png, robots.txt)
src/
  content/               ← LE CONTENU (à modifier ici)
    profile.yaml         identité, accroche, repères, liens, langues, handball
    journey.yaml         expériences et formations
    skills.yaml          compétences groupées, avec leur niveau
    places.yaml          noms des villes
  content.config.ts      schémas Zod des collections
  i18n/
    ui.ts                textes d'interface FR/EN
    routes.ts            URL de la page par langue, ancres des rubriques
  lib/
    content.ts           accès typé au contenu (tri, regroupements)
    format.ts            dates et périodes
    seo.ts               données structurées schema.org
  layouts/Base.astro     <head>, en-tête (rubriques, langue), pied de page (contact)
  views/Resume.astro     la page : profil, Expériences, Formations, Compétences, Handball
  components/ui/         ExternalLink, Icon, Todo
  pages/                 index.astro (FR), en/index.astro (EN), 404.astro
  styles/                tokens.css, global.css
scripts/                 validate-yaml, check-links, make-assets (icônes + og.png)
.github/workflows/       déploiement GitHub Pages
legacy/                  ancien site statique (référence ; non publié)
```

## 3. Flux de données

```
content/*.yaml ──(Zod)──► astro:content ──► lib/content.ts ──► views/Resume.astro ──► pages/(fr|en)
```

- **Langue** : chaque route passe `lang` à la vue. `pick(lang, champ)` choisit la traduction.
- **Tri** : `getJourney()` sépare Expériences (`work`, `engagement`) et Formations (`education`, `international`), l'entrée en cours d'abord, puis de la plus récente à la plus ancienne. `getSkillGroups()` range chaque groupe : pratiquées, en apprentissage, puis sans niveau.
- **TODO** : un champ `todo` est affiché comme repère jaune en `npm run dev`, jamais en production.

## 4. Redirections

Le site comptait auparavant plusieurs pages et 14 fiches projet par langue. `astro.config.mjs` génère pour chaque ancienne adresse une page de redirection (`meta refresh` + lien) vers la rubrique correspondante de la page unique. Les ancres sont celles de `ANCHORS` dans `src/i18n/routes.ts` : `npm run test:links` vérifie qu'elles existent.

## 5. Commandes

```bash
npm install          # dépendances
npm run dev          # http://localhost:4321
npm run check        # TypeScript + diagnostics Astro
npm run build        # génère dist/
npm run preview      # sert dist/ localement
npm run test:links   # vérifie les liens et ancres internes de dist/
npm run verify       # YAML + check + build + liens
```

## 6. Déploiement

Voir `README.md` : GitHub Actions construit `dist/` et le publie sur GitHub Pages à chaque push sur `main`.
