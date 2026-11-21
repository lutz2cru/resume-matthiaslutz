# TULZ — Architecture

## 1. Choix de la stack

| Besoin | Choix | Pourquoi |
|---|---|---|
| Générer un site statique multipage bilingue | **Astro 7** (`output: 'static'`) | Compatible GitHub Pages, zéro JavaScript par défaut, routage par fichiers, collections de contenu typées, optimisation d'images intégrée. L'ancien site (HTML écrit à la main) dupliquait tout le contenu en FR et EN. |
| Contenu modifiable sans toucher au code | **Collections YAML** validées par **Zod** (`src/content.config.ts`) | Une entrée = un fichier lisible ; chaque texte porte ses deux langues côte à côte (`fr` / `en`) ; une faute de structure casse le build au lieu de casser la page. |
| Typage | **TypeScript** strict (composants, scripts client, bibliothèque `terrain`) | `astro check` en contrôle. |
| Styles | **CSS natif** : jetons globaux (`src/styles/tokens.css`) + styles scopés par composant | Pas de Tailwind : l'identité repose sur quelques jetons et beaucoup de typographie, pas sur des classes utilitaires. Le CSS scopé d'Astro suffit à la modularité. |
| Animations | **CSS + Web Animations + IntersectionObserver** | Pas de bibliothèque Motion : les besoins (révélations, transitions de page natives, palette) tiennent en quelques centaines de lignes, sans dépendance. |
| Transitions de page | **View Transitions natives entre documents** (`@view-transition`) | Aucun routeur JS ; chaque page reste un vrai document HTML ; repli automatique sur les navigateurs qui ne les gèrent pas. |
| Génératif | **Canvas 2D** + bruit simplex + marching squares (`src/lib/terrain.ts`) | Plus léger et plus robuste que WebGL pour des lignes ; le même module tourne dans le navigateur (fond animé) et au build (couvertures SVG des projets). |
| Polices | `@fontsource-variable/archivo` (axes largeur + graisse), `@fontsource-variable/martian-mono` | Auto-hébergées, une seule requête par famille pour l'alphabet latin, préchargement de la police principale. |
| SEO | `@astrojs/sitemap`, `hreflang`, Open Graph, JSON-LD `Person`, `robots.txt` | |

## 2. Arborescence

```
public/                  fichiers servis tels quels (CNAME, favicon, robots.txt)
src/
  assets/images/         images optimisées par Astro (portrait, Nyhavn)
  content/               ← LE CONTENU (à modifier ici)
    profile.yaml         identité, liens, « en ce moment », bio
    projects/*.yaml      un fichier par projet
    journey.yaml         étapes du parcours
    skills.yaml          compétences groupées
    interests.yaml       constellation (centres d'intérêt et liens)
    places.yaml          lieux et coordonnées (parcours, carte)
  content.config.ts      schémas Zod des collections
  i18n/
    ui.ts                textes d'interface FR/EN
    routes.ts            correspondance des URL FR ↔ EN
  lib/
    terrain.ts           bruit + courbes de niveau (navigateur et build)
    content.ts           accès typé au contenu (tri, langue, liens calculés)
    format.ts            dates, coordonnées
  layouts/Base.astro     <head>, en-tête, pied de page, palette, scripts globaux
  components/            composants d'interface (un dossier par domaine)
  views/                 contenu d'une page, partagé entre FR et EN
  pages/                 routes (fines : elles appellent une vue avec la langue)
    index.astro, a-propos/, projets/, projets/[slug].astro, parcours/, competences/, hors-code/, contact/
    en/index.astro, en/about/, en/projects/, en/projects/[slug].astro, en/journey/, en/skills/, en/beyond/, en/contact/
    covers/[slug].svg.ts couvertures de projets générées au build
    404.astro
  scripts/               scripts client (palette, révélations, terrain, filtres…)
  styles/                jetons, base, typographie, utilitaires
scripts/                 validate-yaml, check-links, make-assets (icônes + og.png)
.github/workflows/       déploiement GitHub Pages
legacy/                  ancien site statique (référence ; non publié)
```

## 3. Flux de données

```
content/*.yaml ──(Zod)──► astro:content ──► lib/content.ts ──► views/*.astro ──► pages/(fr|en)
                                                   │
                                                   └─► données de la palette (JSON embarqué)
lib/terrain.ts ──► pages/covers/[slug].svg.ts (build)   et   scripts/terrain-canvas.ts (navigateur)
```

- **Langue** : chaque route passe `lang` à sa vue. `pick(lang, champ)` choisit la traduction. `routes.ts` donne l'URL équivalente dans l'autre langue (sélecteur de langue, `hreflang`).
- **Liens calculés** : la page Compétences retrouve les projets qui utilisent chaque technologie à partir de `projects/*.yaml` ; aucune donnée n'est saisie deux fois.
- **TODO** : un champ `todo` dans un fichier de contenu est affiché comme repère jaune en `npm run dev`, et jamais en production.

## 4. Amélioration progressive

| Fonction | Sans JavaScript | Avec JavaScript |
|---|---|---|
| Navigation | Liens normaux, menu mobile en `<details>` | Menu plein écran animé, palette ⌘K, raccourcis |
| Projets | Liste complète | Filtres, aperçu qui suit le curseur |
| Parcours | Liste chronologique complète | Filtres, ligne de progression, repères d'années |
| Constellation | Liste des liens en texte | Survol / focus qui met en évidence les relations |
| Fond | Grille de points CSS | Terrain animé (image fixe si mouvement réduit) |
| Transitions | Navigation normale | Transitions natives si le navigateur les gère |

## 5. Notes

- `hreflang` : chaque page déclare son équivalent dans l'autre langue dans son `<head>` (les URL sont traduites : `/projets/` ↔ `/en/projects/`). Le sitemap ne regroupe que les URL de même chemin ; les balises `<head>` font foi.
- Les illustrations HTML (`components/mocks/`) sont décoratives (`aria-hidden`) et signalées comme reconstitutions.
- Préchargement au survol (`prefetch`) : les pages internes sont récupérées avant le clic.

## 6. Commandes

```bash
npm install          # dépendances
npm run dev          # http://localhost:4321
npm run check        # TypeScript + diagnostics Astro
npm run build        # génère dist/
npm run preview      # sert dist/ localement
npm run test:links   # vérifie les liens internes de dist/
npm run verify       # check + build + liens
```

## 7. Déploiement

Voir `README.md` : GitHub Actions construit `dist/` et le publie sur GitHub Pages. Il faut passer la source Pages du dépôt sur « GitHub Actions » (réglage à faire par toi, non effectué).
