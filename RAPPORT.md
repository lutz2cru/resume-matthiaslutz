# Rapport de refonte — TULZ

21 novembre 2026 · fusionné dans `main` et **publié sur tulz.fr le 21/11/2026** (GitHub Actions).

## 1. Ce qui a changé

| Avant | Après |
|---|---|
| 2 fichiers HTML de 517 lignes (FR et EN copiés à la main) | Astro 7 : 8 vues partagées, 31 pages générées, contenu unique en YAML |
| Une seule longue page | 6 territoires + 8 fiches projet détaillées, en FR et en EN |
| Style « pages produit », fond blanc, bleu | Identité TULZ : carte topographique, sombre, typographie expressive |
| Google Fonts (requête tierce) | Polices auto-hébergées, latin préchargé |
| Pas de sitemap, favicon de 2000 px | Sitemap, robots.txt, icônes 32/180 px, image de partage 1200 × 630 |
| Déploiement : la branche `main` telle quelle | GitHub Actions : vérifications puis build, à chaque push |

L'ancien site est sauvegardé (tag `sauvegarde/site-statique-2026-11-21`) et copié dans `legacy/site-statique/` pour référence.

## 2. Décisions graphiques

- **Concept** : le site est une carte. Les courbes de niveau sont le seul motif décoratif ; elles relient l'accueil animé, les bandeaux de page et les couvertures de projet. Elles ont un sens : le parcours est fait de lieux, et l'Erasmus était déjà raconté par une carte.
- **Palette** : celle du brief, gardée telle quelle (`#101319`, `#1B222C`, `#B6F36A`, `#65D9CB`, `#E8EDF2`), avec des règles strictes. Le citron est réservé au « tu es ici » et au point culminant ; le turquoise est réservé aux données (liens, trajets, progression).
- **Typographie** : Archivo, une police variable dont l'axe de largeur porte l'expressivité (titres étendus, texte normal, liens qui s'élargissent au survol), et Martian Mono pour les étiquettes, index et coordonnées.
- **Formes** : angles droits et filets de 1 px. Aucune carte arrondie.
- **Mouvement** : chaque animation montre une relation (titre d'un projet qui passe de la liste à la fiche, liens de la constellation, ligne du parcours qui avance). Les animations sont coupées par `prefers-reduced-motion` ou par l'interrupteur du pied de page.
- **Le logo TULZ arrondi** (`legacy/site-statique/sources/tulz.png`) est remplacé par un wordmark typographique et une icône « courbes de niveau ». Le fichier d'origine est conservé.

## 3. Décisions techniques

- **Astro plutôt que le HTML écrit à la main** : sortie 100 % statique, compatible GitHub Pages, aucun JavaScript par défaut. Cela supprime la duplication FR/EN et génère les fiches projet à partir des données.
- **Pas de Tailwind ni de bibliothèque d'animation** : des jetons CSS, des styles par composant, et environ 7 Ko de JavaScript commun (plus 7 Ko pour le terrain, chargé seulement s'il y en a un sur la page).
- **Canvas 2D plutôt que WebGL** : des lignes suffisent. Un seul module (`src/lib/terrain.ts`) sert dans le navigateur et au build (couvertures SVG).
- **Transitions de page natives** (`@view-transition`) : pas de routeur ; repli normal sur les navigateurs qui ne les gèrent pas.
- **Contenu validé au build** : schémas Zod. Un champ manquant ou une compétence inconnue fait échouer le build.
- **TODO visibles en développement seulement** : tu repères ce qui manque sans que ça apparaisse en ligne.

## 4. Fonctionnalités

- **Accueil** : terrain génératif qui réagit au curseur (une colline se soulève sous la souris, la courbe la plus haute passe en citron), avec un relevé x/y/z. Légende des 6 territoires avec leurs compteurs, « En ce moment », 3 projets choisis, dernières étapes, aperçu du Hors-code.
- **Projets** : index éditorial filtrable par domaine (filtre conservé dans l'URL `?domaine=`), aperçu de la couverture qui suit le curseur, carnet pour les petits projets. Fiches avec métadonnées, illustration propre au projet (téléphone Caisse Noire, terminal htop, schéma SP-Bot, galerie Photomatt'on, relief généré), outils reliés à la page Compétences, et navigation précédent/suivant (flèches ← →).
- **Parcours** : chronologie par année, filtrable par type, ligne de progression au défilement, repères d'années qui suivent la lecture, coordonnées des lieux.
- **Compétences** : tableau par domaine. Le niveau vient de ton profil GitHub (« maîtrisés » / « en cours ») ; les projets qui utilisent chaque outil sont calculés automatiquement. Filtre par niveau.
- **Hors-code** : constellation interactive qui relie 6 centres d'intérêt à 11 choses réelles (survol, clavier, et au doigt : un toucher pour sélectionner, un second pour ouvrir). Version texte dépliable. Sections handball (cage dessinée en CSS), photo (galerie), voyages (carte animée des 14 villes).
- **Palette de commandes** : Ctrl/⌘ K ou `/`. Recherche sans accents dans les pages et projets, plus des actions (copier l'e-mail, changer de langue, couper les animations, revenir en haut).
- **Partout** : menu mobile plein écran, sélecteur de langue qui renvoie vers la page équivalente, lien d'évitement, interrupteur d'animations mémorisé, page 404 bilingue.

## 5. Tests effectués

| Test | Résultat |
|---|---|
| `astro check` (TypeScript strict) | 0 erreur, 0 avertissement |
| Syntaxe YAML (`npm run check:content`) | OK. Deux erreurs de guillemets trouvées et corrigées pendant le développement |
| Build | 31 pages, ~1,7 s |
| Liens internes et ancres (`npm run test:links`) | 1 354 liens, 0 cassé. Le script a trouvé 4 vrais liens cassés (constellation → projets sans fiche), corrigés |
| Liens externes (curl) | Tous répondent, sauf : LinkedIn (999, blocage anti-robot, normal) et `matthiasvocable03.page.gd` (pas de réponse en 30 s, **à vérifier**) |
| Lighthouse mobile (accueil, projets, hors-code, fiche SP-Bot) | Performance 97–99, accessibilité 100 (après correction du nom du lien « TULZ » sur mobile), bonnes pratiques 100, SEO 100 |
| Lighthouse ordinateur (accueil, parcours EN) | 100 / 100 / 100 / 100 |
| Contrôle visuel 1440 px et 375 px, toutes les pages | Corrigés pendant le contrôle : nom de l'accueil qui chevauchait la légende ; menu mobile rogné (le `backdrop-filter` de l'en-tête créait un bloc conteneur) ; liens de la constellation invisibles (`pathLength` sur `<line>`) ; libellés superposés sur mobile ; galerie déséquilibrée ; paragraphe d'ouverture trop lourd ; e-mail affiché deux fois sur Contact |
| Débordement horizontal à 375 px | Aucun, sur toutes les pages |
| Interactions | Filtres (projets, parcours, compétences), aperçu au survol, palette et ses raccourcis, flèches entre projets, menu mobile (ouverture, Échap), sélection au doigt dans la constellation |
| Mouvement réduit | Le terrain dessine une image fixe ; pas d'animation ni de contenu masqué |
| Sans JavaScript | Tout le contenu est dans le HTML ; les contrôles qui ont besoin de JS sont masqués |
| Console | Aucune erreur du site. Un avertissement interne de Chrome sur les transitions de vue apparaît en arrivant sur la 404 (sans effet) |

Limites : les tests ont été faits sous Chrome (navigateur intégré et Lighthouse). Firefox et Safari n'ont pas été testés ici ; les transitions de page y sont simplement absentes si le navigateur ne les gère pas.

## 6. Informations à compléter

Elles sont marquées `todo:` dans `src/content/` et apparaissent en jaune dans `npm run dev`.

1. **Caisse Noire** : année, contexte (pour quelle équipe ?), fait seul ou non.
2. **Gestionnaire de processus** : ta part du travail dans l'équipe.
3. **Photomatt'on** : année de création, choix techniques (stockage, vignettes, administration).
4. **Gestion d'entrepôt BD70** : seul ou en équipe.
5. **Station météo** : ta part du travail, capteurs utilisés.
6. **Service civique** : vérifier les dates (sept. 2025 → juin 2026), qui chevauchent l'Erasmus (févr. → juin 2026).
7. **Stellantis** : ville du site, si tu veux qu'elle apparaisse.
8. **Crunch Time 2025** : mois, sujet, rôle.
9. **Handball** : une photo de match dans les cages, avec le crédit du photographe.

Points à confirmer :

- **ARNia BFC** : le site cite l'outil CmonIA (déjà public sur l'ancien site) et des thèmes généraux (IA conversationnelle, RAG hybride, serveurs MCP, visualisation, outils pour les collectivités), sans aucun détail interne. Vérifie que ça te convient.
- **Dépôts non repris** : `pea-visu` (données financières personnelles), `grist-GLPI-test` (peut-être lié au travail), `muscu-tracker` et `cracolive-matt` (peu documentés). À ajouter si tu le souhaites.
- **Site de vocabulaire** : le lien n'a pas répondu pendant les tests.

## 7. Mise en production (faite le 21/11/2026)

- GitHub Pages est passé en mode « GitHub Actions » (domaine `tulz.fr` et HTTPS conservés).
- L'adresse du dépôt a été mise à jour (`lutz2cru/resume-matthiaslutz`).
- La refonte a été fusionnée dans `main`. Le premier déploiement a échoué sur `npm ci` : le fichier de verrouillage généré sous Windows ne contenait pas des dépendances que npm exige sous Linux. Pendant ce temps, l'ancien site est resté en ligne. Le fichier a été régénéré et validé avec npm 11 et 12, et le second déploiement a réussi.
- Vérifié en ligne : les 16 pages FR/EN, les couvertures, l'image de partage, le sitemap et robots.txt répondent 200. Les fichiers internes (PRODUCT.md, README, `legacy/`) ne sont pas publiés.

Il reste à faire :

1. Compléter les TODO (section 6) ; chaque push sur `main` republie le site.
2. Tester l'aperçu de partage (LinkedIn Post Inspector) et déclarer `https://tulz.fr/sitemap-index.xml` dans Google Search Console.
3. Conseillé : sortir le dépôt de OneDrive et harmoniser l'identité Git (`lutz2cru` / `lutztoucru`).

Pistes pour plus tard :

- Sous-domaines de tulz.fr pour Photomatt'on et Caisse Noire.
- Captures réelles des applications.
- Un PDF du CV hébergé sur le site.
