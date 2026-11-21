# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruteurs et entreprises** (RH, managers tech) qui évaluent le profil de Matthias Lutz, élève ingénieur en informatique par apprentissage (FISA) à l'UTBM.
- **Réseau et curieux** qui arrivent depuis LinkedIn, GitHub ou un échange en personne et veulent savoir rapidement qui il est.

Les deux publics lisent en français ou en anglais.

## Product Purpose

Portfolio personnel en ligne sur tulz.fr. Il sert de carte de visite : le visiteur doit repartir en sachant qui est Matthias, ce qu'il étudie, où il travaille, ce qu'il a construit et ce qu'il fait en dehors du code. Le but n'est pas de pousser à une action précise (prise de contact, conversion). C'est réussi quand le visiteur a une image juste et complète de la personne.

## Positioning

Ce qui le distingue d'un autre portfolio d'élève ingénieur :

- **Un profil complet en dehors du code** : gardien de but en Nationale 3, photographe de sport le week-end, semestre Erasmus à Cracovie (14 villes, 11 pays), service civique en communication pour un club.
- **De l'expérience réelle en entreprise** : apprenti ingénieur Data & IA à l'ARNia BFC (Dijon, secteur public régional), plus des passages chez Stellantis et Mister Auto.

Les projets techniques (du C/Linux à l'ESP32 puis à React/Supabase) appuient ce portrait, mais ce n'est pas le message principal.

## Operating Context

- Site Astro statique (voir `ARCHITECTURE.md`) : le contenu vit dans `src/content/*.yaml`, FR et EN côte à côte. Build : `npm run build` ; aperçu : `npm run dev`.
- Domaine personnalisé `tulz.fr` via `public/CNAME`, déployé par GitHub Actions (`.github/workflows/deploy.yml`).
- Six territoires numérotés après l'accueil, dans l'ordre de ce qu'un recruteur cherche : Parcours (Expérience, Formation, Engagements & sport), Projets (liste + fiches), Compétences, Hors-code (Photographie, Handball, Erasmus & voyages), À propos, Contact. Navigation par une barre fixe, un menu mobile et une palette de commandes (Ctrl/⌘ K), au clavier comme à la souris.
- L'accueil montre d'emblée : nom, rôle (apprenti ingénieur Data & IA), entreprise (ARNia BFC), formation (UTBM, FISA) et centres d'intérêt (handball N3, photo, Erasmus).
- **Parti pris visuel (brief du 21 nov. 2026, remplace celui du 10 nov.)** : TULZ, « Personal Digital Universe » — minimalisme sombre, typographie expressive, le site traité comme une carte topographique personnelle. Voir `DESIGN_SYSTEM.md`.
- **Palette (passe de finition du 21 nov. 2026)** : bleu nuit, violet électrique (identité), bleu (navigation, technique), cyan (signaux). Remplace l'accent citron. Sobre : pas de néon, pas de dégradé hors de trois éléments graphiques.
- Données structurées schema.org `Person` sur l'accueil et À propos.

## Capabilities and Constraints

- Les deux versions linguistiques doivent rester alignées : tout changement sur une page est reporté sur l'autre.
- Le contenu est factuel et suit l'actualité du parcours (dates, postes, villes, chiffres). Il est mis à jour au fil du temps.
- Tout se fait en HTML/CSS/JS sans dépendance à garder à jour.

## Evidence on Hand

- Portrait : `sources/portrait-matthias.jpg`. Visuels : `sources/erasmus.png`, `sources/tulz.png`.
- Projets avec liens réels : Caisse Noire (projet phare, PWA React/Supabase), gestionnaire de processus Linux en C (LP25), Photomatt'on, SP-Bot, Matchs du week-end CSV70, station météo ESP32, NAS TrueNAS, système expert automobile (LO21).
- Rapports de stage / de service civique accessibles depuis la section Expérience.
- Carnet de voyage Polarsteps pour l'Erasmus.
- Captures réelles (21/11/2026) de Caisse Noire (page d'accueil publique), The Wall et Révisions Java, dans `src/assets/images/projects/`. Les autres projets gardent une illustration étiquetée ou leur relief généré.
- Absents : pas de témoignages, pas de recommandations, pas de chiffres d'usage des projets. Ne pas en inventer.

## Product Principles

1. **La personne avant la vitrine technique.** Le sport, la photo, l'Erasmus et le travail en entreprise sont aussi importants que les projets.
2. **Se situer vite.** Un recruteur pressé doit comprendre en quelques secondes : études, entreprise actuelle, profil.
3. **Que du vrai.** Tous les chiffres, dates et liens sont exacts et vérifiables. Rien d'inventé, rien d'enjolivé.
4. **Bilingue pour de bon.** La version anglaise est complète, pas un résumé de la version française.
