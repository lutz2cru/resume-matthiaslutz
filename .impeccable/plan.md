# Plan d'amélioration — tulz.fr

Source : critique du 2026-10-29 (`.impeccable/critique/2026-10-29T13-53-08Z__index-html.md`), score 22/32.
Choix : priorité au premier écran · garder l'univers actuel et l'affiner · les 5 problèmes · contenus à fournir (photo hand, dates, année de diplôme), emplacements en attendant.
Règle : chaque étape est appliquée à `index.html` ET `en/index.html`.

## Étape 0 — Contenus à fournir (Matthias)
- [ ] Photo de vous dans les cages (→ `sources/`)
- [ ] Dates exactes du Service Civique (chevauche l'Erasmus févr.–juin 2026 ?) et durée réelle de l'Erasmus (« 6 mois » ?)
- [x] Année de fin de FISA : 2029 (rythme d'alternance non fourni)
- [ ] 2–3 phrases concrètes sur ce que vous faites à l'ARNia (CmonIA, Data BFC)

## Étape 1 ✅ — `/impeccable clarify` premier écran et textes d'identité
- Eyebrow et titre du hero alignés sur le rôle actuel (Data & IA · ARNia BFC), plus le slogan IoT
- Expliquer FISA (« en apprentissage »), N3 (« Nationale 3 »), LP25/LO21, ARNia
- Remplacer « Voir les projets / Me contacter » par une sortie neutre
- Meta description + schema.org avec ARNia

## Étape 2 ✅ — `/impeccable layout` hiérarchie du premier écran et ordre des sections
- Nom + rôle deviennent l'élément le plus fort ; portrait dans le hero ; année de diplôme visible
- Nouvel ordre : Accueil → Expérience → Projets → Hors code (Handball, Photographie, Erasmus) → Formation → Compétences → Contact
- Sommaire, numérotation et scrollspy mis à jour

## Étape 3 ✅ (partielle) — `/impeccable bolder` Handball et Photographie
- Fait : cage de hand à l'échelle (poteaux rayés 20 cm, filet 10 cm) avec la citation ; emplacement `goal-photo` prêt dans le HTML
- Reste : photo dans les cages + une image de hand sur la planche-contact (Photomatt'on ne contient qu'un album rugby)
- Section Handball avec un vrai visuel (photo dans les cages), dans l'esprit de la planche-contact
- Au moins une image de hand sur la planche-contact
- Rester dans l'univers actuel : on renforce, on ne refait pas

## Étape 4 ✅ (partielle) — `/impeccable distill` redites
- Fait : section Profil retirée (sa phrase propre passe en intro de Projets), liste des villes réservée aux lecteurs d'écran, compétences sans numéros ni points, groupe Création retiré, 5 étiquettes en moins
- Reste : étoffer l'entrée ARNia (attend vos 2–3 phrases)
- Fusionner Profil et « En ce moment » dans l'accueil
- Retirer la liste des villes en double avec la carte
- Réduire le mur de compétences, enlever les notes en points
- Étoffer l'entrée ARNia avec le contenu de l'étape 0

## Étape 5 ✅ — `/impeccable audit` puis `/impeccable harden` accessibilité
- `--ink-3` à ≥ 4,5:1 en clair et sombre ; texte ≥ 11px (badge « En cours »)
- « (nouvel onglet) » en texte masqué, ou moins de `target=_blank`
- Planche-contact en un seul lien, alt variés ; `aria-hidden` sur ↗ et numéros des titres
- Icônes sociales 44px ; couleur `#f4c542` passée en variable

## Étape 6 ✅ — `/impeccable adapt` mobile
- Navigation mobile (barre de sections ou « Sommaire » dépliable) + retour en haut
- Maquette Caisse Noire réduite, étiquettes de la carte lisibles, planche en 2 colonnes

## Étape 7 ✅ — `/impeccable polish` passe finale
- Vérification FR/EN, bureau/mobile, clair/sombre ; puis relancer `/impeccable critique`

---

# Tour 2 — après la critique du 2026-10-29 (23/32)

Choix : priorité à l'ordre + Projets allégé · cage plus large en attendant la photo · périmètre = les 3 P1 (+ la cage).

## 2.1 ✅ — `/impeccable layout` ordre des sections
- Expérience → Handball → Photographie → Erasmus → Projets → Formation → Compétences → Contact
- Sommaire bureau + menu mobile + numéros mis à jour (FR et EN)
- Cage : format plus large tant que `goal-photo` est absent, 3:2 dès que la photo arrive

## 2.2 ✅ — `/impeccable distill` Projets
- Caisse Noire + 3 cartes ; le reste passe dans « Aussi »
- Liste de fonctionnalités Caisse Noire ramenée à 3 puces ; description ≤ 80 caractères par ligne

## 2.3 ✅ (partielle) — `/impeccable clarify` chiffres clés et preuves Data & IA
- Chiffres clés : ARNia BFC · Data & IA depuis sept. 2026 · UTBM (année de diplôme) · Nationale 3 · Erasmus
- Groupe de compétences « Data & IA » + entrée ARNia détaillée (CmonIA, Data BFC) — attend vos outils et 2–3 phrases

## 2.4 — `/impeccable polish` puis `/impeccable critique`
