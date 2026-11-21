---
name: tulz.fr — Matthias Lutz
description: Portfolio bilingue en tuiles pleine largeur, un seul bleu d'action, grands titres et grands visuels.
colors:
  bg: "#ffffff"
  bg-alt: "#f5f5f7"
  panel: "#ffffff"
  ink: "#1d1d1f"
  ink-2: "#4b4b50"
  ink-3: "#6a6a70"
  line: "#d2d2d7"
  accent: "#0066cc"
  accent-soft: "#e3effb"
  btn: "#0071e3"
  btn-hover: "#0062c4"
  btn-ink: "#ffffff"
  dark-bg: "#000000"
  dark-bg-alt: "#111113"
  dark-panel: "#1c1c1e"
  dark-ink: "#f5f5f7"
  dark-ink-2: "#b4b4ba"
  dark-ink-3: "#8e8e93"
  dark-line: "#333336"
  dark-accent: "#2997ff"
  dark-accent-soft: "#10263d"
  dark-tile-on-dark: "#161618"
  dark-panel-on-dark: "#232326"
  hero-bg: "#2a2129"
  hero-glow: "#4b3e47"
  hero-ink-2: "#cbc1c9"
  post-red: "#e0452e"
  post-white: "#f5f5f7"
  cn-gold: "#f4c542"
typography:
  display:
    fontFamily: "Geist, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(3rem, 9.5vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title-lg:
    fontFamily: "Geist, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Geist, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.1875rem, 2vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.34
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  nav:
    fontFamily: "Geist, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
  mono:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  r-lg: "28px"
  r-md: "20px"
  pill: "999px"
  sm: "6px"
spacing:
  tile-gap: "12px"
  gutter: "clamp(20px, 5vw, 40px)"
  section-y: "clamp(80px, 11vw, 144px)"
  head-gap: "clamp(36px, 5vw, 60px)"
  row-y: "32px"
  panel-pad: "clamp(28px, 5vw, 64px)"
  card-pad: "clamp(24px, 3vw, 32px)"
  nav-h: "52px"
components:
  button-primary:
    backgroundColor: "{colors.btn}"
    textColor: "{colors.btn-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.btn-hover}"
    textColor: "{colors.btn-ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
  link-more:
    textColor: "{colors.accent}"
    typography: "{typography.body}"
    height: "44px"
  badge:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  chip:
    backgroundColor: "{colors.bg-alt}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  card:
    backgroundColor: "{colors.bg-alt}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r-md}"
    padding: "{spacing.card-pad}"
  feature-panel:
    backgroundColor: "{colors.bg-alt}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r-lg}"
    padding: "{spacing.panel-pad}"
  nav-bar:
    backgroundColor: "rgb(255 255 255 / .78)"
    textColor: "{colors.ink-2}"
    typography: "{typography.nav}"
    height: "{spacing.nav-h}"
---

# Design System: tulz.fr — Matthias Lutz

## Overview

**Creative North Star: "La page produit d'une personne"**

Le portfolio attendu, joué sans ironie avec la finition d'une page produit : chaque facette de Matthias (le poste, le gardien, le photographe, le voyageur, les projets) occupe une tuile pleine largeur avec un grand titre et un grand visuel. Les tuiles alternent blanc, gris très clair et noir, et c'est ce changement de fond qui sépare les sujets, pas des cadres ni des filets de section.

Le système est calme et dense en air. Une seule couleur agit (le bleu), une seule famille de caractères parle (Geist), et les seules autres couleurs appartiennent à des objets représentés : les poteaux rouge et blanc de la cage, l'or de Caisse Noire, la palette du terminal. La profondeur vient des fonds, pas des ombres. Un seul mouvement signe la page : les grands panneaux se posent en entrant dans l'écran.

L'ancienne identité (fond crème, serif italique, colonne latérale numérotée) est abandonnée et ne doit pas revenir.

**Key Characteristics:**
- Tuiles pleine largeur alternées : blanc, gris très clair, noir, plus une tuile d'accueil prune tirée du fond du portrait.
- Un seul bleu d'action, décliné selon le fond (bouton, lien sur clair, lien sur sombre).
- Geist partout, en semi-gras serré pour les titres ; Geist Mono réservé au code et au terminal.
- Grands rayons (28 px et 20 px) et formes pilule ; aucun angle vif sur un panneau.
- Plat au repos : la hiérarchie vient du fond des tuiles, pas d'ombres portées.
- Thèmes clair et sombre automatiques, avec des tuiles « dark » qui restent sombres dans les deux.
- Un mouvement signature piloté par le défilement, coupé en mouvement réduit.

## Colors

Une palette de neutres froids sur laquelle un seul bleu porte toutes les actions ; les autres teintes sont des couleurs d'objets, jamais des accents d'interface.

### Primary
- **Bleu d'action** (`btn`, survol `btn-hover`) : fond des boutons pilule pleins et couleur de la sélection de texte. Identique en clair et en sombre, toujours avec le texte `btn-ink`.
- **Bleu de lien** (`accent` sur fond clair, `dark-accent` sur fond sombre) : liens, liens à chevron, contour et texte des boutons fantômes, anneau de focus, point et arc « domicile » de la carte. La version sombre est plus claire pour rester lisible sur noir.
- **Bleu voilé** (`accent-soft`, `dark-accent-soft`) : fond du badge « En cours », seul usage.

### Secondary
- **Prune du portrait** (`hero-bg`, halo `hero-glow`, texte secondaire `hero-ink-2`) : la tuile d'accueil uniquement. La teinte est tirée du fond de la photo pour que le portrait se fonde dans la tuile. Elle ne sert nulle part ailleurs.

### Tertiary
Couleurs d'objets, liées à ce qu'elles représentent :
- **Rouge et blanc des poteaux** (`post-red`, `post-white`) : les bandes de la cage de handball.
- **Or Caisse Noire** (`cn-gold`) : la maquette de téléphone et le halo du panneau Caisse Noire.
- **Palette du terminal** (fond `#0d1117`, barre `#161b22`, texte `#c9d1d9`, vert `#3fb950`, jaune `#d29922`, bleu `#79c0ff`, sélection `#1f6feb`) : la maquette de terminal uniquement.

### Neutral
- **Blanc** (`bg`) et **gris très clair** (`bg-alt`) : les deux fonds de tuile du thème clair. `bg-alt` sert aussi de fond aux cartes, puces et panneaux posés sur une tuile blanche.
- **Panneau** (`panel`) : surface posée sur une tuile grise (la carte des villes).
- **Encre** (`ink`), **encre secondaire** (`ink-2`), **encre tertiaire** (`ink-3`) : titres et texte courant ; paragraphes descriptifs et liens de navigation ; dates, métadonnées, légendes.
- **Filet** (`line`) : filets de 1 px entre les lignes d'une liste, maillage du filet de la cage, points de la carte.
- **Série sombre** (`dark-bg`, `dark-bg-alt`, `dark-panel`, `dark-ink`, `dark-ink-2`, `dark-ink-3`, `dark-line`) : mêmes rôles, pour les tuiles « dark » et pour tout le site en thème sombre.
- **Tuile sombre sur thème sombre** (`dark-tile-on-dark`, `dark-panel-on-dark`) : en thème sombre, les tuiles « dark » passent à un gris anthracite pour rester distinctes du fond noir.
- **Barre de navigation** : `rgb(255 255 255 / .78)` en clair, `rgb(0 0 0 / .72)` en sombre, sous un flou d'arrière-plan.

### Named Rules
**La règle du Bleu Unique.** Tout ce qui se clique est bleu ou devient bleu ; rien d'autre n'est bleu. Le bouton plein prend `btn`, le lien prend `accent`, et le fond décide de la nuance, jamais le goût.

**La règle de la Couleur d'Objet.** Rouge, or et couleurs de terminal restent à l'intérieur de l'objet qu'ils dessinent. Ils ne colorent jamais un titre, un bouton ou un fond de tuile.

**La règle du Fond qui Sépare.** Deux tuiles voisines n'ont jamais le même fond. L'ordre construit est : prune, blanc, gris, noir, blanc, gris, blanc, gris, blanc, noir, puis pied de page gris.

## Typography

**Display Font:** Geist (repli Helvetica Neue, Helvetica, Arial, sans-serif)
**Body Font:** Geist (même pile)
**Label/Mono Font:** Geist Mono (repli ui-monospace, SF Mono, Consolas), code et terminal uniquement

**Character:** Une seule grotesque géométrique, en semi-gras très serré pour les titres et en graisse normale pour le texte. Le contraste vient de l'échelle et de la couleur, pas d'un second caractère.

### Hierarchy
- **Display** (600, `clamp(3rem, 9.5vw, 6rem)`, 1.02, −0.04em) : le nom dans la tuile d'accueil et le « 404 ». Le titre de contact reprend cet interlettrage à `clamp(2.5rem, 7vw, 5rem)`.
- **Headline** (600, `clamp(2.5rem, 6vw, 4rem)`, 1.04, −0.035em) : titre de section, un seul mot ou presque. La citation de la cage utilise la même échelle.
- **Title large** (600, `clamp(2rem, 4vw, 3rem)`, 1.05, −0.035em) : titre d'un panneau de projet phare.
- **Title** (600, 1.5rem, 1.15, −0.025em) : titres de carte, de ligne d'expérience (`clamp(1.25rem, 2vw, 1.5rem)`), de groupe de compétences (1.3125rem).
- **Lead** (500, `clamp(1.1875rem, 2vw, 1.5rem)`, 1.34, −0.015em) : phrase d'introduction sous un titre de section, en `ink-2`, 30em maximum. Le rôle sous le nom et le chapeau d'introduction montent à 1.75rem.
- **Body** (400, 1.0625rem, 1.5 ; 1rem sous 760 px) : texte courant, 58 à 66ch maximum.
- **Label** (400, 0.9375rem, `ink-3`) : dates, métadonnées, technologies, légendes. Bas de casse, sans interlettrage. Les dates et les chiffres utilisent les chiffres tabulaires.
- **Nav** (0.8125rem) : liens de la barre et sélecteur de langue ; 600 pour l'élément courant.
- **Mono** (Geist Mono, 12.5px/1.65 dans le terminal, 0.875em pour le code en ligne).

### Named Rules
**La règle des Deux Tons.** Un titre en forme de phrase se coupe en deux : le début en `ink`, la fin en `ink-2`, par un `<em>` sans italique. Construit pour la phrase de rôle de l'accueil, la citation de la cage et le titre de contact. Les titres de section d'un seul mot restent d'un seul ton.

**La règle des Trois Graisses.** 400 pour lire, 500 pour introduire, 600 pour titrer. Le 700 n'existe que dans la maquette de téléphone, qui représente une autre application.

**La règle du Mono Rare.** Geist Mono signale du code réel : un chemin, une commande, le terminal. Jamais une date, une étiquette ou un titre.

## Layout

La page est une pile de tuiles pleine largeur. Le fond va d'un bord à l'autre de l'écran ; le contenu tient dans une colonne de 1120 px maximum, avec une gouttière de `clamp(20px, 5vw, 40px)`. Chaque section respire sur `clamp(80px, 11vw, 144px)` en haut et en bas, et son en-tête est suivi de `clamp(36px, 5vw, 60px)` de vide.

À l'intérieur d'une tuile, trois compositions reviennent : la liste en deux colonnes (date sur 220 px, contenu à droite) séparée par des filets ; la grille de panneaux arrondis espacés de 12 px (galerie, tuiles Erasmus, cartes de projet) ; le panneau de projet phare en deux colonnes, texte et maquette. Les blocs de tête et de contact sont centrés ; tout le reste est aligné à gauche.

La tuile d'accueil occupe la hauteur de l'écran moins la barre (`min(100svh − 52px, 1000px)`), et le portrait touche son bord inférieur.

Deux seuils. Sous 1024 px, les liens de la barre laissent place à un menu déroulant, les panneaux phares et la grille de projets passent sur une colonne, les compétences sur deux. Sous 761 px, tout passe sur une colonne, le corps descend à 1rem, la galerie devient une bande à défilement horizontal avec accroche, et les panneaux phares prennent le rayon de 20 px. Les cibles tactiles font 44 px de haut au minimum. Une feuille d'impression remet tout en noir sur blanc et masque les maquettes.

## Elevation & Depth

Le système est plat au repos. La profondeur vient de la superposition de fonds : tuile blanche, carte grise posée dessus ; tuile grise, panneau blanc posé dessus. Aucune carte ne porte d'ombre ou de bordure à l'état normal.

Les ombres existent dans trois cas précis, tous diffus et décalés vers le bas, jamais durs.

### Shadow Vocabulary
- **Survol de carte** (`box-shadow: 0 22px 40px -26px rgb(0 0 0 / .4)`, avec `translateY(-4px)`) : réponse au survol d'une carte de projet cliquable.
- **Menu mobile** (`box-shadow: 0 24px 40px -24px rgb(0 0 0 / .35)`) : le panneau déroulant qui passe au-dessus de la page.
- **Objets représentés** (terminal `0 30px 60px -30px rgb(0 0 0 / .55)` ; téléphone `0 0 0 1px #2b2b31, 0 44px 80px -34px rgb(0 0 0 / .8)`) : les maquettes sont des objets posés dans le panneau, elles ont une ombre d'objet.

La barre de navigation n'a pas d'ombre : elle se détache par sa translucidité (`backdrop-filter: saturate(180%) blur(20px)`) et un filet inférieur à 60 % de `line`.

Les dégradés servent de lumière ou de voile, jamais de décor : halo radial derrière le portrait, halo doré du panneau Caisse Noire, voile noir sous une légende posée sur une photo.

### Named Rules
**La règle du Plat au Repos.** Une surface ne porte une ombre que si elle répond à un geste (survol), passe au-dessus de la page (menu) ou représente un objet (téléphone, terminal).

## Shapes

Deux rayons font tout le travail : 28 px (`--r-lg`) pour les grands panneaux et les grandes images (panneau de projet phare, carte des villes, photo d'Erasmus, première photo de la galerie), 20 px (`--r-md`) pour les cartes et les petites photos, ainsi que pour les panneaux phares sur mobile. Tout ce qui est petit et cliquable ou étiqueté est une pilule (999 px) : boutons, badge, puces, sélecteur de langue. Le code en ligne et l'anneau de focus utilisent 6 px.

Les tuiles pleine largeur n'ont aucun rayon : elles vont d'un bord à l'autre. Les filets font 1 px en `line` et ne servent qu'à séparer les lignes d'une liste, jamais à encadrer un bloc. Les images sont recadrées dans leur panneau (`object-fit: cover`) ; seul le portrait n'a pas de bord, il se fond dans la tuile par un masque en dégradé.

Les icônes sont dessinées en CSS par masque (flèche externe, chevron, flèche haute), au trait de 1.6, à 0.62em, dans la couleur du texte qui les porte. Les maquettes gardent les rayons de leur objet (téléphone 42 px et 32 px, terminal 14 px).

## Components

### Buttons
Des pilules franches, une seule par groupe d'actions quand c'est possible.
- **Shape:** pilule (999 px), hauteur minimale 44 px, marge intérieure `0 22px`, texte en corps (1.0625rem, 1rem sur mobile), sans retour à la ligne.
- **Primary:** fond et bordure `btn`, texte `btn-ink`. Peut porter une icône de flèche externe à droite, à 9 px.
- **Hover / Focus:** fond `btn-hover`, transition de 0.2s, pas de soulignement. Focus visible : contour de 2 px en `accent`, décalé de 3 px.
- **Ghost:** fond transparent, bordure et texte `accent` ; au survol, fond `accent` et texte de la couleur de la tuile. Utilisé en groupe pour les liens de contact.

### Liens
- **Lien en ligne :** `accent`, sans soulignement, souligné au survol (décalage 3 px).
- **Lien à chevron ou à flèche externe :** texte en corps, icône à 7 px, hauteur 44 px. Le chevron annonce une action interne, la flèche diagonale un nouvel onglet (avec la mention « nouvel onglet » pour les lecteurs d'écran). Au survol l'icône glisse dans son sens (3 px à droite, ou 2 px en diagonale) en 0.25s.
- **Groupe d'actions :** un bouton plein suivi d'un lien, espacés de 28 px, qui passent à la ligne au besoin.

### Chips
- **Puce :** pilule sur `bg-alt`, `6px 14px`, 0.9375rem, non cliquable (compétences).
- **Badge :** pilule `accent-soft` / `accent`, `4px 10px`, 0.75rem en 600, pour un état (« En cours »).
- **Liste de technologies :** pas de pilules, des mots en `ink-3` séparés par un point médian.

### Cards / Containers
- **Tuile :** section pleine largeur, fond `bg`, `bg-alt` ou série sombre, sans rayon ni bordure.
- **Panneau phare :** rayon 28 px, fond `bg-alt`, marge intérieure `clamp(28px, 5vw, 64px)`, deux colonnes texte et visuel, 12 px entre deux panneaux. La variante sombre (Caisse Noire) est sur `#0b0b0f` avec un halo doré en haut à droite.
- **Carte de projet :** rayon 20 px, fond `bg-alt`, marge `clamp(24px, 3vw, 32px)`, entièrement cliquable par son titre. Au repos ni ombre ni bordure ; au survol elle monte de 4 px avec l'ombre de survol, en 0.5s.
- **Ligne de liste :** filet supérieur de 1 px, 32 px de marge verticale, date à gauche en label.
- **Photo :** panneau arrondi, recadré ; zoom de 1.04 en 0.8s au survol dans la galerie. Légende sous l'image en label, ou posée sur l'image en blanc sur voile noir.

### Navigation
Barre collante de 52 px, translucide et floutée, filet inférieur discret. Nom à gauche (1.0625rem, 600), liens de section au centre (0.8125rem, `ink-2`, `ink` au survol, 600 pour la section en cours), sélecteur FR/EN à droite en pastilles de 36 px. Sous 1024 px, les liens sont remplacés par un bouton à deux traits qui se croisent à l'ouverture ; le panneau déroulant occupe la largeur, liens en 1.5rem semi-gras séparés par des filets. Le menu se ferme après un choix, sur Échap ou au clic à l'extérieur.

### Tuile d'accueil
Fond prune avec un halo radial plus clair derrière le portrait. Tout est centré : le nom en display, la phrase de rôle en deux tons, un bouton plein et un lien, puis le portrait qui se fond dans la tuile par un masque et touche le bas de l'écran. À l'arrivée, le texte monte de 18 px en 1s avec un décalage de 0.08s par élément, et le portrait se révèle en 1.6s (léger flou et échelle 1.06 vers la netteté).

### Mouvement signature : « se poser »
Les grands panneaux visuels (cage, galerie, photo d'Erasmus, panneau Caisse Noire) passent d'une échelle de 0.92 et d'une opacité de 0.55 à leur état final pendant qu'ils entrent dans l'écran, pilotés par le défilement (`animation-timeline: view()`, plage `entry 0%` à `entry 80%`). Sans prise en charge du navigateur, le panneau est simplement en place. Les transitions d'état utilisent une seule courbe, `cubic-bezier(.16, 1, .3, 1)`. En mouvement réduit, toutes les animations et transitions sont coupées, ainsi que le défilement doux.

### Objets dessinés
Quatre visuels sont construits en code et font partie de l'identité :
- **La cage de handball**, à l'échelle (3 m sur 2 m, poteaux de 8 cm peints par bandes de 20 cm, maille de 10 cm), dimensionnée en unités de conteneur, avec la citation posée dans le filet.
- **La maquette de téléphone Caisse Noire**, avec l'interface de l'application dans ses propres couleurs et sa propre typographie d'étiquettes.
- **La maquette de terminal**, en Geist Mono, avec sa barre de titre.
- **La carte SVG des villes visitées**, points en `ink`, ville de séjour et trajet en `accent`, sur un panneau arrondi.

## Do's and Don'ts

### Do:
- **Do** alterner le fond à chaque nouvelle tuile (`bg`, `bg-alt`, série sombre) et laisser ce changement faire la séparation.
- **Do** réserver le bleu à ce qui se clique : `btn` pour le bouton plein, `accent` pour les liens sur clair, `dark-accent` sur sombre.
- **Do** composer tout le texte en Geist, titres en 600 avec un interlettrage de −0.02em à −0.04em selon la taille.
- **Do** donner à chaque tuile un grand titre et, quand le sujet s'y prête, un grand visuel arrondi à 28 px.
- **Do** utiliser les jetons `--ink`, `--ink-2`, `--ink-3`, `--bg`, `--bg-alt`, `--line`, `--accent` plutôt que des valeurs fixes, pour que les thèmes clair et sombre et les tuiles « dark » suivent sans réglage.
- **Do** dessiner les icônes par masque CSS dans la couleur du texte, et marquer tout lien externe par la flèche diagonale.
- **Do** garder 44 px de hauteur minimale aux cibles, un focus visible de 2 px en `accent`, et couper tout mouvement en mouvement réduit.
- **Do** reporter tout changement visuel sur les deux versions linguistiques.

### Don't:
- **Don't** revenir à l'ancienne identité : fond crème, serif italique, colonne latérale numérotée.
- **Don't** introduire une seconde couleur d'accent d'interface ; rouge, or et couleurs de terminal restent dans leur objet.
- **Don't** utiliser Geist Mono pour des étiquettes, des dates ou des titres.
- **Don't** poser d'ombre ou de bordure sur une carte au repos, ni encadrer un bloc avec un filet.
- **Don't** donner un rayon à une tuile pleine largeur, ni un angle vif à un panneau ou à une photo.
- **Don't** ajouter de sur-titre en petites capitales interlettrées au-dessus d'un titre ; les étiquettes en capitales n'existent que dans la maquette de téléphone, qui représente une autre application.
- **Don't** ajouter un second mouvement d'entrée aux sections ; seuls les grands panneaux visuels « se posent ».
- **Don't** utiliser de dégradé comme décor ou dans un texte ; un dégradé est une lumière derrière un objet ou un voile sous une légende.
