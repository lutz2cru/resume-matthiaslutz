# Audit — tulz.fr avant la refonte TULZ

Date : 21 novembre 2026. Base auditée : `main` @ `7f2c918`, identique au site en production.

## 1. État Git et sauvegardes

| Élément | Constat | Action |
|---|---|---|
| `main` local | Était en retard de 11 commits sur `origin/main`, avec un brouillon non commité d'août dans `index.html` / `style.css`. | Synchronisé. Brouillon conservé : `git stash list` → « brouillon refonte sobre du 27 août ». |
| Production | GitHub Pages sert `main` (Jekyll par défaut) sur `tulz.fr` (fichier `CNAME`). | Aucune modification de production pendant la refonte. |
| Sauvegarde | — | Tag local `sauvegarde/site-statique-2026-11-21` sur `main`. |
| Travail | — | Branche locale `refonte/tulz-universe`. Rien n'est poussé. |
| Dépôt distant | GitHub signale que le dépôt a déménagé : `luztoucru/resume-matthiaslutz` → `lutz2cru/resume-matthiaslutz`. | À mettre à jour par toi : `git remote set-url origin https://github.com/lutz2cru/resume-matthiaslutz.git`. |
| Branche `origin/master` | Figée au 14 sept. 2026, déjà fusionnée (PR #1). | Peut être supprimée (action distante : non faite). |
| Identités | Commits sous `lutz2cru` et `lutztoucru`. | À harmoniser (`git config user.name/email`). |
| Dossiers vides | `.agents/`, `.codex/`, `.zencoder/`, `.zenflow/` : vides ou presque, non suivis. | Laissés en place. |

## 2. Stack existante

- **HTML/CSS/JS statique, sans build** : `index.html` (FR, 517 lignes), `en/index.html` (EN, 517 lignes), `404.html`, `style.css` (860 lignes), `main.js` (46 lignes, amélioration progressive : menu mobile + section active).
- **Hébergement** : GitHub Pages, branche `main`, domaine `tulz.fr`. `_config.yml` exclut `PRODUCT.md` et `DESIGN.md` (ajouté le 21/11, vérifié en ligne : 404).
- **Polices** : Geist / Geist Mono via Google Fonts (requête tierce à chaque visite).
- **Images locales** : `portrait-matthias.jpg` (933×1500, 149 Ko), `erasmus.png` (en réalité un **JPEG** 960×1280 de 274 Ko avec une extension `.png`), `tulz.png` (2000×2000, 89 Ko, utilisé comme favicon : beaucoup trop lourd pour cet usage).
- **Images distantes** : 6 vignettes WebP de Photomatt'on servies par Supabase Storage, icône de Caisse Noire servie par Vercel.
- **Outils de conception** : `.impeccable/` (notes de l'outil Impeccable), `DESIGN.md` (système visuel « pages produit » du 10/11), `PRODUCT.md` (public, positionnement, principes), `.claude/launch.json` (aperçu `python -m http.server 8765`).

## 3. Ce qui fonctionne bien (à conserver)

- **Contenu exact et sourcé** : dates, postes, liens réels. Le principe « Que du vrai » de `PRODUCT.md` rejoint la règle absolue du brief.
- **Accessibilité soignée** : lien d'évitement, `aria-current`, textes alternatifs descriptifs, mention « (nouvel onglet) » en `sr-only`, contrastes corrects.
- **SEO de base** : `canonical`, `hreflang` FR/EN, Open Graph, JSON-LD `Person`.
- **Parité FR/EN** vérifiée : mêmes sections, mêmes projets, mêmes villes.
- **Bonnes idées visuelles** : maquette HTML du téléphone Caisse Noire, terminal façon htop, carte SVG de l'Erasmus (coordonnées réutilisables).
- **Mobile** : aucun débordement horizontal à 375 px, aucune image cassée.

## 4. Problèmes techniques

1. **Contenu dupliqué à la main** dans deux fichiers HTML de 517 lignes : chaque mise à jour doit être faite deux fois, avec un risque de divergence.
2. **Une seule longue page** (10 sections, ~10 800 px) : pas de fiche projet, pas d'URL partageable par projet, impossible d'approfondir un sujet.
3. **CSS monolithique** de 860 lignes sans découpage par composant ; cache-busting manuel (`style.css?v=18`, `main.js?v=3`).
4. **Polices Google Fonts** : requête vers un tiers (performance, RGPD) alors qu'elles peuvent être auto-hébergées.
5. **Images non optimisées** : pas de formats modernes, pas de `srcset`, favicon de 2000 px, mauvaise extension pour `erasmus.png`.
6. **Emplacement laissé vide** : commentaire `<!-- Photo dans les cages … -->` en FR et en EN.
7. **Liens sur des domaines techniques** : `photomatton.matthias-lutz2006.workers.dev` (reprend l'identifiant Gmail) et `caisse-noire-mu.vercel.app`.
8. **Pas de `sitemap.xml` ni de `robots.txt`.**

## 5. Problèmes graphiques et d'expérience

1. **Identité faible** : le parti pris « pages produit Apple » (fond blanc, bleu `#0066cc`, alternance de bandes) est propre mais interchangeable avec des milliers de sites.
2. **Hiérarchie plate** : toutes les sections ont le même poids, avec le même gabarit « titre + rangées ».
3. **Projets en cartes arrondies** répétées : le format que le brief demande d'éviter.
4. **Navigation à 8 entrées** dans la barre fixe : dense, et rien n'aide à explorer au-delà du défilement.
5. **Peu d'interactions** : aucune exploration (filtres, liens entre centres d'intérêt, parcours).

## 6. Inventaire du contenu vérifié

Sources : site en production (FR + EN), historique Git du portfolio (versions de 2025–2026), README du profil GitHub `lutz2cru`, README des dépôts publics, brief du 21/11.

### Parcours

| Période | Élément | Source |
|---|---|---|
| sept. 2026 → | Apprenti ingénieur Data & IA, ARNia BFC (Dijon). Outil CmonIA. Sujets (brief + README profil) : assistant conversationnel en RAG hybride, plateforme régionale de données publiques, serveurs MCP, visualisation de données, outils pour les collectivités. | site, profil GitHub, brief |
| 2026 → 2029 | Cycle ingénieur informatique par apprentissage (FISA), UTBM. | site |
| févr. → juin 2026 | Semestre Erasmus, AGH University of Krakow. 14 villes, 11 pays. | site |
| sept. 2025 → juin 2026 | Service civique, assistant communication, CSVesoul70 Partenaires. | site |
| été & hiver 2025 | Opérateur de production et stagiaire, Stellantis (rapport en ligne). | site |
| été 2024 | Préparateur de commandes, Mister Auto. | site |
| 2024 → 2026 | Cycle préparatoire, UTBM. Certification Pix niveau avancé. | site |
| 2021 → 2024 | Bac général mention Bien, lycée Édouard Belin, Vesoul. | site |

> **À vérifier (non tranché)** : le service civique (sept. 2025 → juin 2026) chevauche l'Erasmus à Cracovie (févr. → juin 2026). Les deux dates sont reprises telles quelles du site actuel et signalées par un TODO.

### Projets (dépôts publics vérifiés)

| Projet | Statut de la source |
|---|---|
| Caisse Noire (React, Vite, Supabase, PWA, Vercel) | Site actuel, application en ligne. Pas de dépôt public. |
| Photomatt'on (Cloudflare Workers, Supabase) | Site actuel, site en ligne. |
| SP-Bot (Python, GitHub Actions, Docker, ntfy) | README détaillé du dépôt `sp-bot`. |
| Gestionnaire de processus Linux (C, ncurses) | README du dépôt `JulesGIT2/Projet-LP25` (projet d'équipe, fork `Projet-LP25-A25`). |
| Système expert automobile (C) | README du dépôt `Projet-LO21-A25`. |
| Gestion d'entrepôt BD70 (PHP 8, MariaDB) | README du dépôt `site-logistique-BD70` (projet de cours). |
| The Wall (JS, GitHub Pages, API GitHub) | README du dépôt `thewall`, en ligne. |
| Révisions Java PR70 (HTML/JS) | README du dépôt `revisions-java-pr70`, en ligne. |
| Station météo ESP32 (C++, MQTT, Node-RED) | Dépôt `station_meteo_groupe7_a25` (README minimal). |
| Matchs du week-end CSV70 (JS) | Dépôt `gamesweekend-csv70handball` (pas de README). |
| Jeu de lettres en C, NAS TrueNAS Scale, clavier de raccourcis AutoHotkey, Crunch Time 2025, site de vocabulaire PHP/SQL | Anciennes versions du portfolio (historique Git). Pas de dépôt public. |

**Écartés volontairement** : `pea-visu` (données financières personnelles), `grist-GLPI-test` (lien possible avec le travail à l'ARNia : rien publié par précaution), `muscu-tracker` et `cracolive-matt` (personnels, peu documentés), `hotel_projet` et `lecteurpdf` (exercices anciens).

### Contradiction avec la décision précédente

`PRODUCT.md` (10/11) indique : « le portfolio standard, sobre […] Pas d'univers décalé ». Le brief du 21/11 demande l'inverse (« Personal Digital Universe »). **Le brief le plus récent l'emporte** ; `PRODUCT.md` est mis à jour en conséquence. Ses principes éditoriaux (« La personne avant la vitrine technique », « Que du vrai », « Bilingue pour de bon ») restent valables et sont repris.

## 7. Environnement disponible

- Node 24.13, npm 11.6, `gh` authentifié (`lutz2cru`), Chrome et Edge installés (Lighthouse possible).
- Navigateur intégré à l'application pour le contrôle visuel.
- **Le dépôt est dans OneDrive** : `node_modules/` (des milliers de fichiers) sera synchronisé. Recommandation : déplacer le dépôt hors de OneDrive (ex. `C:\dev\tulz`).

## 8. Conclusions pour la refonte

- Passer à **Astro** (sortie 100 % statique, compatible GitHub Pages, zéro JS par défaut) : il résout la duplication FR/EN, permet des fiches projets générées depuis des données, auto-héberge les polices et optimise les images.
- **Séparer le contenu** (fichiers YAML validés par schéma) **de la présentation** (composants).
- **Construire une identité propre** autour d'une idée : le site comme une carte topographique personnelle.
- Ne garder que les interactions qui servent la lecture : palette de commandes, filtres de projets, parcours chronologique, constellation des centres d'intérêt, fond génératif discret.
