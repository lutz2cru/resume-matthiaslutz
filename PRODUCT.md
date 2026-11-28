# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruteurs et entreprises** (RH, managers tech) qui évaluent le profil de Matthias Lutz, élève ingénieur en informatique par apprentissage (FISA) à l'UTBM.
- **Réseau et curieux** qui arrivent depuis LinkedIn, GitHub ou un échange en personne et veulent savoir rapidement qui il est.

Les deux publics lisent en français ou en anglais.

## Product Purpose

Portfolio personnel en ligne sur tulz.fr, réduit à l'essentiel (choix de l'utilisateur, 28 nov. 2026) : **une seule page** qui présente ses expériences professionnelles, ses formations, ses compétences et sa pratique du handball. Rien d'autre : pas de projets, pas de photographie, pas de voyages, pas de centres d'intérêt. C'est réussi quand un recruteur a compris en quelques secondes où il travaille, ce qu'il étudie et ce qu'il sait faire.

## Positioning

- **De l'expérience réelle en entreprise** : apprenti ingénieur Data & IA à l'ARNia BFC (Dijon, secteur public régional), plus un service civique en communication et des emplois chez Stellantis et Mister Auto.
- **Un parcours de formation clair** : UTBM (cycle préparatoire puis cycle ingénieur par apprentissage), un semestre Erasmus à Cracovie.
- **Le handball** : gardien de but au CS Vesoul en Nationale 3, au club qui l'a formé.

## Operating Context

- Site Astro statique (voir `ARCHITECTURE.md`) : le contenu vit dans `src/content/*.yaml`, FR et EN côte à côte. Build : `npm run build` ; aperçu : `npm run dev`.
- Domaine personnalisé `tulz.fr` via `public/CNAME`, déployé par GitHub Actions (`.github/workflows/deploy.yml`).
- Une page par langue (`/` et `/en/`), quatre rubriques dans l'ordre de lecture d'un recruteur : Expériences, Formations, Compétences, Handball. Contact (e-mail, LinkedIn, GitHub, CV en ligne) en haut et en bas de page.
- Parti pris visuel : minimalisme suisse, encre sur papier blanc, un seul bleu, thème sombre automatique. Pas de portrait. Voir `DESIGN_SYSTEM.md`.
- Les anciennes adresses (pages et fiches projet) redirigent vers la rubrique correspondante.
- Données structurées schema.org `Person`.

## Capabilities and Constraints

- Les deux versions linguistiques doivent rester alignées : tout changement est reporté dans l'autre langue.
- Le contenu est factuel et suit l'actualité du parcours (dates, postes, villes). Il est mis à jour au fil du temps.
- Tout se fait en HTML/CSS avec le minimum de JavaScript, sans dépendance à garder à jour.

## Evidence on Hand

- Rapports de stage / de service civique accessibles depuis la rubrique Expériences.
- Portrait de L'Est Républicain (1er févr. 2026) dans la rubrique Handball.
- Absents : pas de témoignages, pas de recommandations, pas de chiffres. Ne pas en inventer.

## Product Principles

1. **Simple.** Quatre rubriques, une page, rien qui détourne de l'essentiel.
2. **Se situer vite.** Entreprise, formation et club sont lisibles sous le nom, avant tout défilement.
3. **Que du vrai.** Tous les chiffres, dates et liens sont exacts et vérifiables. Rien d'inventé, rien d'enjolivé.
4. **Bilingue pour de bon.** La version anglaise est complète, pas un résumé de la version française.
