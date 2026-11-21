# TULZ — Design system

> Remplace `DESIGN.md` (direction « pages produit » du 10/11/2026, conservée pour l'historique).

## 1. Idée directrice : une carte, pas une vitrine

TULZ est présenté comme **une carte topographique personnelle**. Chaque partie du site est un territoire (le code, le parcours, le handball, la photo, les voyages) et le visiteur l'explore comme une carte : courbes de niveau, coordonnées, index numérotés, légende.

Ce parti pris vient du contenu réel :

- le parcours est fait de **lieux** (Vesoul, Belfort-Montbéliard, Dijon, Cracovie) ;
- l'Erasmus est déjà raconté par une carte ;
- les projets sont des **terrains** distincts, chacun avec sa propre forme générée.

Les courbes de niveau sont le seul motif décoratif du site. Tout le reste est typographie, filets et espace.

**Ce qu'on s'interdit** : dégradés violet/bleu, néons, faux terminal comme navigation, cartes arrondies en série, effets sans rapport avec le contenu, phrases marketing.

## 2. Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--c-bg` | `#101319` | Fond principal |
| `--c-bg-deep` | `#0B0E12` | Pied de page, voiles (palette, menu mobile) |
| `--c-surface` | `#1B222C` | Blocs mis en avant, champs |
| `--c-surface-2` | `#232B37` | Survol des surfaces |
| `--c-line` | `#2A323D` | Filets, bordures |
| `--c-line-soft` | `#1C232C` | Grille de fond, séparateurs discrets |
| `--c-text` | `#E8EDF2` | Texte principal (contraste 15,6:1) |
| `--c-text-2` | `#A9B3BF` | Texte secondaire (8,7:1) |
| `--c-text-3` | `#7C8794` | Métadonnées, légendes (5,0:1, ≥ 4,5 requis) |
| `--c-accent` | `#B6F36A` | **Accent rare** : état actif, focus, sommet d'une carte, un seul élément par écran |
| `--c-accent-ink` | `#101319` | Texte posé sur l'accent |
| `--c-accent-2` | `#65D9CB` | Données : liens de la constellation, tracés, progression |

Règles :

- L'accent citron ne sert jamais de couleur de fond étendue. Il signale : « tu es ici », « c'est cliquable maintenant », « c'est le point haut ».
- Le turquoise est réservé à la **visualisation** (liens, trajets, barres), jamais au texte courant.
- Pas de dégradé de couleur. Seules les opacités varient (courbes de niveau, voiles).

## 3. Typographie

Deux familles auto-hébergées (`@fontsource-variable`), aucun appel à Google Fonts.

| Rôle | Police | Réglages |
|---|---|---|
| Titres, wordmark | **Archivo Variable** (axes `wdth` 62–125, `wght` 100–900) | Largeur 112–125 (étendue), graisse 650–800, interlettrage −0,02 à −0,035 em |
| Texte courant | **Archivo Variable** | Largeur 100, graisse 400, interligne 1,6 |
| Étiquettes, index, coordonnées | **Martian Mono Variable** | 11–12 px, capitales, interlettrage +0,04 em, largeur 87,5 |

L'axe de largeur d'Archivo porte l'expressivité : les grands titres sont étendus, le texte courant est normal, et certains liens s'élargissent légèrement au survol (`font-stretch`), sans changer de graisse.

Échelle (fluide, `clamp`) :

| Token | Min → max | Usage |
|---|---|---|
| `--fs-mega` | 72 → 240 px | Wordmark TULZ, nom en ouverture |
| `--fs-h1` | 44 → 104 px | Titre de page |
| `--fs-h2` | 32 → 56 px | Titre de section |
| `--fs-h3` | 20 → 24 px | Titre de bloc |
| `--fs-lead` | 20 → 26 px | Chapeau |
| `--fs-body` | 17 px | Texte |
| `--fs-small` | 15 px | Texte dense |
| `--fs-mono` | 11–12 px | Étiquettes |

Mesure de lecture : 62 caractères maximum (`--measure: 62ch`).

## 4. Espace et grille

- Base 4 px. Échelle : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192.
- Conteneur : 1440 px max, gouttières `clamp(16px, 4vw, 48px)`.
- Grille éditoriale de 12 colonnes (gap 24 px) sur ordinateur, 4 colonnes sur mobile.
- Les sections respirent : `--space-section: clamp(96px, 14vw, 192px)`.
- Détails techniques discrets : repères `+` aux angles des en-têtes de page, coordonnées en mono, numérotation `01–06` des territoires.

## 5. Formes

- **Angles droits partout.** Pas de carte arrondie. Les blocs se séparent par des filets de 1 px ou par l'espace.
- Seule exception : les points (pastilles d'état, nœuds de la constellation) sont ronds.
- Bordures `1px solid var(--c-line)`. Focus : contour citron 2 px, décalé de 3 px.

## 6. Mouvement

| Token | Valeur | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(.2,.7,.1,1)` | Apparition, déplacement |
| `--ease-in-out` | `cubic-bezier(.6,0,.2,1)` | Ouverture de panneaux |
| `--dur-1` | 160 ms | Survol, couleur |
| `--dur-2` | 320 ms | Menus, palette, filtres |
| `--dur-3` | 700 ms | Révélations au défilement |

Principes :

1. **Le mouvement montre une relation** (un projet qui passe de la liste à sa fiche, un lien qui relie deux passions, la ligne du parcours qui avance). Il ne décore pas.
2. **Transitions entre pages** natives (`@view-transition`) : fondu-glissé du contenu, titre de projet qui se transforme de la liste vers la fiche. Navigateurs sans support : navigation normale.
3. **Révélations au défilement** : une seule fois, opacité + 16 px de translation, décalage de 60 ms entre éléments frères.
4. **`prefers-reduced-motion`** et l'interrupteur « Animations » du pied de page coupent toutes les translations, la carte animée (une image fixe est dessinée) et les transitions de page.

## 7. Le terrain génératif

- Canvas 2D, bruit simplex 3D + marching squares → 9 à 14 courbes de niveau.
- Le temps avance très lentement ; le curseur soulève une « colline » douce que les courbes contournent.
- Une seule courbe, la plus haute, est tracée en citron.
- Pause quand le canvas sort de l'écran ou que l'onglet est caché ; 30 images/s maximum ; résolution plafonnée à 1,5×.
- Repli : sans JavaScript ou sans canvas, une grille de points en CSS ; en mouvement réduit, une image fixe.
- Le **même algorithme** génère, au build, la couverture SVG de chaque projet (graine = identifiant du projet) : chaque projet a son propre relief, cohérent avec le reste du site.

## 8. Composants

| Composant | Rôle |
|---|---|
| `SiteHeader` | Wordmark, 6 territoires numérotés, langue, bouton ⌘K, menu mobile |
| `MobileMenu` | Plein écran, grands liens étendus, fermeture Échap / clic |
| `CommandPalette` | Ctrl/⌘ K ou `/` : pages, projets, actions (copier l'e-mail, langue, animations) |
| `SiteFooter` | Contact, raccourcis, interrupteur d'animations, langue |
| `Terrain` | Canvas génératif (accueil en plein écran, en-têtes de page en bandeau) |
| `PageHeader` | Index du territoire, titre, chapeau, coordonnées |
| `ProjectIndex` | Liste éditoriale filtrable avec aperçu qui suit le curseur |
| `ProjectCover` | Relief SVG généré au build |
| `Timeline` | Parcours chronologique filtrable, ligne de progression, repères d'années |
| `SkillTable` | Compétences ↔ projets qui les utilisent (calculé) |
| `Constellation` | Liens réels entre centres d'intérêt et réalisations |
| `ErasmusMap` | Carte SVG des 14 villes |
| `PhoneMock`, `TerminalMock`, `Pipeline` | Illustrations HTML/CSS des projets (marquées comme illustrations) |

## 9. Écriture

- Phrases courtes, factuelles, à la première personne.
- Pas de superlatifs, pas de « passionné », pas de « solutions innovantes ».
- Chaque chiffre a une source (README, site existant).
- Une information manquante est signalée par un `TODO` dans les fichiers de contenu (visible seulement en mode développement), jamais comblée par une supposition.
