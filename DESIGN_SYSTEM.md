# Design system

> Refonte du 28/11/2026 : une seule page, minimalisme suisse. Remplace l'identité « TULZ, carte topographique » du 21/11/2026 (consultable dans l'historique Git).

## 1. Idée directrice : un CV qui se lit d'un trait

La page sert à se situer vite : qui est Matthias, où il travaille, ce qu'il étudie, ce qu'il sait faire, et sa pratique du handball. Rien d'autre.

- **Typographie et filets** portent toute la structure : pas d'image, pas d'illustration, pas d'effet.
- **Une grille** : sur grand écran, le titre de rubrique à gauche (3/12, il reste visible pendant la lecture), le contenu à droite (9/12). Sur mobile, tout s'empile.
- **Un filet noir** ouvre chaque rubrique ; des filets gris séparent les entrées.
- **Un seul bleu** pour ce qui est cliquable ou actif : liens, rubrique en cours, numéros de rubrique, repères de niveau.

**Ce qu'on s'interdit** : dégradés, ombres, cartes arrondies, icônes décoratives, animations au défilement, couleurs d'accent multiples, texte gris clair sur fond gris.

## 2. Couleurs

Toutes les couleurs vivent dans `src/styles/tokens.css` ; les composants n'utilisent que ces rôles. Le thème sombre suit automatiquement la préférence du système.

| Rôle | Clair | Sombre | Usage |
|---|---|---|---|
| `--c-bg` | `#FFFFFF` | `#0E1014` | Fond |
| `--c-bg-soft` | `#F5F6F8` | `#161920` | Réservé (survols, bandeaux) |
| `--c-text` | `#121318` (18,9:1) | `#ECEEF2` (16,8:1) | Titres, valeurs, filets d'ouverture |
| `--c-text-2` | `#464B55` (8,9:1) | `#B4B9C4` (9,4:1) | Texte courant secondaire |
| `--c-text-3` | `#656A75` (5,4:1) | `#8D93A0` (6,0:1) | Dates, libellés |
| `--c-line` | `#E2E4E9` | `#252932` | Filets entre entrées |
| `--c-line-strong` | `#C3C7CF` | `#3A3F4B` | Contour du sélecteur de langue |
| `--c-accent` | `#1F45D6` (7,3:1) | `#94ABFF` (8,7:1) | Liens, rubrique active, repères |
| `--c-accent-soft` | `#EEF1FD` | `#171D36` | Fond de l'étiquette « En cours » |

## 3. Typographie

Une seule famille : **Archivo** variable (auto-hébergée). Chiffres tabulaires partout pour aligner les dates.

| Jeton | Taille | Usage |
|---|---|---|
| `--fs-display` | 48 → 112 px | Nom (graisse 700, chasse 92 %, interlettrage −0,04 em) |
| `--fs-h2` | 28 → 42 px | Titres de rubrique, e-mail du pied de page |
| `--fs-quote` | 24 → 36 px | Phrase d'ouverture de la rubrique Handball |
| `--fs-lede` | 18 → 23 px | Accroche sous le nom |
| `--fs-h3` | 19 px | Titres d'entrée, valeurs des repères |
| `--fs-body` | 17 px, interligne 1,6 | Texte courant (mesure max. 68 caractères) |
| `--fs-meta` | 15 px | Dates, métadonnées |
| `--fs-small` | 14 px | Libellés en capitales espacées (`.label`) |

## 4. Espacements et mise en page

Grille de 4/8 px (`--s-1` à `--s-10`). Largeur maximale 1200 px, gouttière de 16 à 48 px. Points de rupture : 640 px (date à gauche des entrées), 720 px (repères sur 3 colonnes), 768 px (en-tête fixe sur une ligne), 960 px (grille titre / contenu).

## 5. Composants

| Élément | Règle |
|---|---|
| En-tête | Nom à gauche, 4 rubriques au centre, langue à droite. Fixe à partir de 768 px ; sur mobile, les rubriques passent sur une deuxième ligne qui défile horizontalement. La rubrique lue est soulignée en bleu (`aria-current`). |
| Repères | Trois colonnes sous un filet noir : libellé, valeur, précision. |
| Entrée de parcours | Date (et « En cours ») à gauche, puis titre, structure · lieu, description, points, outils, liens « Lire le rapport ». |
| Compétences | Groupes en colonnes. Disque plein = pratiqué, anneau = en apprentissage, rien = non précisé ; le niveau est aussi écrit pour les lecteurs d'écran. |
| Liens externes | Soulignés en bleu, petite flèche, mention « (nouvel onglet) » pour les lecteurs d'écran. Zone cliquable de 44 px minimum. |
| Pied de page | Contact : e-mail en grand, LinkedIn, GitHub, CV en ligne, date de mise à jour. |

## 6. Accessibilité

Lien d'évitement, contrastes AA (AAA pour le texte courant), focus visible bleu de 2 px, cibles tactiles de 44 px, langues balisées (`lang`, `hreflang`), défilement doux désactivé si l'utilisateur réduit les animations.
