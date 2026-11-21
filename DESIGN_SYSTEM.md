# TULZ — Design system

> Remplace `DESIGN.md` (direction « pages produit » du 10/11/2026, conservée pour l'historique).
> Passe de finition du 21/11/2026 : palette bleu nuit / violet / bleu / cyan à la place de l'accent citron (voir § 2).

## 1. Idée directrice : une carte, pas une vitrine

TULZ est présenté comme **une carte topographique personnelle**. Chaque partie du site est un territoire (le code, le parcours, le handball, la photo, les voyages) et le visiteur l'explore comme une carte : courbes de niveau, coordonnées, index numérotés, légende.

Ce parti pris vient du contenu réel :

- le parcours est fait de **lieux** (Vesoul, Belfort-Montbéliard, Dijon, Cracovie) ;
- l'Erasmus est déjà raconté par une carte ;
- les projets sont des **terrains** distincts, chacun avec sa propre forme générée.

Les courbes de niveau sont le seul motif décoratif du site. Tout le reste est typographie, filets et espace.

**Ce qu'on s'interdit** : néons et halos sur chaque composant, dégradés partout, verre dépoli décoratif, faux terminal comme navigation, cartes arrondies en série, fausses captures d'écran, effets sans rapport avec le contenu, phrases marketing.

## 2. Couleurs

Toutes les couleurs vivent dans `src/styles/tokens.css`. Les composants n'utilisent que les **rôles** (`--c-…`), jamais la palette brute (`--p-…`) ni une valeur écrite en dur. Seules exceptions documentées : la maquette `PhoneMock` (couleurs de l'application Caisse Noire elle-même) et les couvertures SVG générées au build (`src/lib/terrain.ts`, qui reprend les valeurs des jetons faute d'accès aux variables CSS).

### Palette

| Jeton brut | Valeur | Rôle principal |
|---|---|---|
| `--p-night-800` | `#0D1020` | Fond (`--c-bg`) |
| `--p-night-900` | `#090B17` | Fond profond (`--c-bg-deep`) |
| `--p-night-600` | `#191D32` | Surface (`--c-surface`) |
| `--p-night-500` | `#222740` | Surface survolée (`--c-surface-2`) |
| `--p-night-400` / `-700` / `-300` | `#2E3454` / `#141830` / `#3A4166` | Filets, filets discrets, bordures de contrôles |
| `--p-violet-500` | `#8B5CF6` | Identité (`--c-brand`) : aplats, tracés, grands éléments |
| `--p-violet-400` | `#A78BFA` | Texte et filets identitaires (`--c-accent`) |
| `--p-violet-300` | `#C4B5FD` | Texte accentué sur surface (`--c-accent-strong`) |
| `--p-violet-600` / `-700` | `#7655EE` / `#6A48E0` | Bouton principal et son survol (`--c-action`) |
| `--p-blue-400` | `#60A5FA` | Navigation, détails techniques (`--c-tech`) |
| `--p-cyan-300` | `#67E8F9` | Indicateurs, animations (`--c-signal`) |

Texte : `--c-text` `#F1F5F9`, `--c-text-2` `#A6B0C3`, `--c-text-3` `#8590A8`.

### Contrastes vérifiés (sur `--c-bg`)

| Couleur | Ratio | Usage autorisé |
|---|---|---|
| `--c-text` | 17,2:1 | Tout texte |
| `--c-text-2` | 8,7:1 | Texte secondaire |
| `--c-text-3` | 5,9:1 (4,6:1 sur `--c-surface-2`) | Métadonnées, légendes |
| `--c-accent` (violet 400) | 6,9:1 | Texte actif, survol, rôle |
| `--c-brand` (violet 500) | 4,5:1 | Aplats et tracés seulement, pas de petit texte |
| `--c-tech` (bleu) | 7,4:1 | Index, piles techniques, liens de navigation |
| `--c-signal` (cyan) | 13:1 | Pastilles, petits repères |
| Blanc sur `--c-action` | 4,9:1 (5,6:1 au survol) | Bouton principal |

### Règles d'usage

- **Violet = identité.** Titres mis en avant (rôle sur l'accueil), état actif, survol des liens importants, bouton principal, focus, sélection de texte, point du wordmark `TULZ.`.
- **Bleu = navigation et technique.** Numéros de territoires, piles d'outils, puces des listes de détails, survol des filtres et des étiquettes.
- **Cyan = signal.** Pastille « en cours », statut « en ligne », trajets animés de la carte Erasmus, repère de sommet des reliefs.
- **Dégradé violet → bleu** (`--grad-brand`, `--grad-brand-v`) réservé à trois éléments : le filet du lien actif de l'en-tête, la ligne du parcours, la courbe la plus haute du relief. Nulle part ailleurs ; jamais sur du texte.
- Pas de halo lumineux, sauf l'ombre portée violette du bouton principal au survol.
- Les photos gardent leurs couleurs naturelles (aucun filtre).
- Statuts de projet (`.pstatus`) : en ligne = cyan, en cours = violet, terminé = bleu, expérimental = gris à point creux, archivé = gris. La couleur double toujours un libellé texte.
- Types d'étapes du parcours (`--c-type-*`) : travail violet, études bleu, international cyan, engagement orchidée, sport gris.

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
| `--fs-display` | 52 → 96 px | Nom en ouverture de l'accueil (plafond 6rem) |
| `--fs-h1` | 36 → 88 px | Titre de page (« Gestionnaire » tient sur une ligne à 320 px) |
| `--fs-h2` | 32 → 56 px | Titre de section |
| `--fs-h3` | 20 → 24 px | Titre de bloc |
| `--fs-lead` | 20 → 26 px | Chapeau |
| `--fs-body` | 17 px | Texte |
| `--fs-small` | 15 px | Texte dense |
| `--fs-mono` | 11–12 px | Étiquettes |

Mesure de lecture : 66 caractères maximum (`--measure: 66ch`).

## 4. Espace et grille

- Base 4 px. Échelle : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192.
- Conteneur : 1440 px max, gouttières `clamp(16px, 4vw, 48px)`.
- Grille éditoriale de 12 colonnes (gap 24 px) sur ordinateur, 4 colonnes sur mobile.
- Les sections respirent : `--space-section: clamp(80px, 10vw, 152px)`.
- Détails techniques discrets : repères `+` aux angles des en-têtes de page, coordonnées en mono, numérotation `01–06` des territoires (navigation et planche `NN / 06` dans l'angle des en-têtes). Pas de numéro au-dessus des titres de section.
- Zone tactile minimale : `--tap` (44 px) pour les boutons, filtres et contrôles de l'en-tête.

## 5. Formes

- **Angles droits partout.** Pas de carte arrondie. Les blocs se séparent par des filets de 1 px ou par l'espace.
- Seule exception : les points (pastilles d'état, nœuds de la constellation) sont ronds.
- Bordures `1px solid var(--c-line)`. Focus : contour violet (`--c-accent`) 2 px, décalé de 3 px.
- Pas de barre colorée de plus de 1 px sur le bord d'un bloc : un élément ciblé (`:target`) reçoit un fond de surface et un contour violet de 1 px.
- Icônes : composant `Icon` (SVG en trait, 16 × 16, `currentColor`), jamais de caractères ↗ → ✓ comme icône.

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
- Une seule courbe, la plus haute, est tracée en dégradé violet → bleu ; les autres sont blanches à faible opacité.
- Le relief est dessiné immobile au chargement et ne s'anime qu'à la première interaction (souris, défilement, clavier, toucher) : la page reste légère pour le premier affichage.
- Pause quand le canvas sort de l'écran ou que l'onglet est caché ; 30 images/s maximum ; résolution plafonnée à 1,5×.
- Repli : sans JavaScript ou sans canvas, une grille de points en CSS ; en mouvement réduit, une image fixe.
- Le **même algorithme** génère, au build, la couverture SVG de chaque projet (graine = identifiant du projet) : chaque projet a son propre relief, cohérent avec le reste du site. Le sommet y est marqué d'un repère cyan.

## 8. Composants

| Composant | Rôle |
|---|---|
| `SiteHeader` | Wordmark, 6 territoires numérotés, langue, bouton ⌘K, menu mobile |
| `MobileMenu` | Plein écran, grands liens étendus, fermeture Échap / clic |
| `CommandPalette` | Ctrl/⌘ K ou `/` : pages, projets, actions (copier l'e-mail, langue, animations) |
| `SiteFooter` | Contact, raccourcis, interrupteur d'animations, langue |
| `Terrain` | Canvas génératif (accueil en plein écran, en-têtes de page en bandeau) |
| `PageHeader` | Planche `NN / 06`, fil d'Ariane (fiches projet), titre, chapeau, sommaire éventuel |
| `ProjectThumb` | Vignette toujours vraie : capture réelle, sinon photo réelle, sinon relief généré |
| Liste des projets | Liste éditoriale filtrable : vignette, statut, résumé, outils |
| Fiche projet | Statut et liens en tête, capture réelle datée, illustration étiquetée « données fictives », fiche (année, contexte, équipe, domaines, outils, liens) |
| `ProjectCover` | Relief SVG généré au build |
| Parcours | Trois parties (Expérience, Formation, Engagements & sport), colonne de dates, ligne en dégradé |
| `.section-nav` | Sommaire des pages longues (parcours, hors-code) |
| `SkillTable` | Compétences ↔ projets qui les utilisent (calculé) |
| `Constellation` | Liens réels entre centres d'intérêt et réalisations |
| `ErasmusMap` | Carte SVG des 14 villes |
| `PhoneMock`, `TerminalMock`, `Pipeline` | Illustrations HTML/CSS des projets, toujours légendées « Illustration · données fictives » ou « Schéma d'après le README » |

## 9. Écriture

- Phrases courtes, factuelles, à la première personne.
- Pas de superlatifs, pas de « passionné », pas de « solutions innovantes ».
- Chaque chiffre a une source (README, site existant).
- Une information manquante est signalée par un `TODO` dans les fichiers de contenu (visible seulement en mode développement), jamais comblée par une supposition.
- Captures d'écran : uniquement ce que l'application en ligne affiche réellement, avec la date de capture (`shot.date`). Jamais de fausse capture.
