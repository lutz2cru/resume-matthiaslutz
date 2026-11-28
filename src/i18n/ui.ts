/**
 * Textes d'interface (navigation, libellés, actions). Le contenu éditorial vit dans src/content/.
 */
import type { Lang } from './routes';

const fr = {
  'skip': 'Aller au contenu',
  'nav.label': 'Rubriques',
  'lang.switch': 'English',
  'lang.switch.label': 'Read this page in English',
  'external': '(nouvel onglet)',

  'desc.home': 'Matthias Lutz, apprenti ingénieur Data & IA à l\'ARNia BFC et élève ingénieur à l\'UTBM : expériences, formations, compétences et handball.',

  'section.experience': 'Expériences',
  'section.education': 'Formations',
  'section.skills': 'Compétences',
  'section.handball': 'Handball',

  'contact.email': 'E-mail',
  'contact.cv': 'CV en ligne',
  'contact.title': 'Contact',

  'journey.now': 'En cours',

  'skills.legend': 'Légende',
  'skills.level.solid': 'Pratiqué',
  'skills.level.learning': 'En apprentissage',
  'skills.languages': 'Langues',
  'group.data': 'Data & IA',
  'group.languages': 'Langages',
  'group.web': 'Web & données',
  'group.systems': 'Systèmes & outils',
  'group.iot': 'IoT & embarqué',
  'group.communication': 'Communication',

  'handball.club': 'Club',
  'handball.level': 'Niveau',
  'handball.position': 'Poste',
  'handball.background': 'Parcours',
  'handball.press': 'Dans la presse',

  'footer.updated': 'Mis à jour en',
  'footer.top': 'Haut de page',

  'notfound.title': 'Page introuvable',
  'notfound.text': 'Cette adresse n\'existe pas ou plus. Tout le contenu tient désormais sur une seule page.',
  'notfound.back': 'Retour à l\'accueil',
};

type Key = keyof typeof fr;

const en: Record<Key, string> = {
  'skip': 'Skip to content',
  'nav.label': 'Sections',
  'lang.switch': 'Français',
  'lang.switch.label': 'Lire cette page en français',
  'external': '(opens in a new tab)',

  'desc.home': 'Matthias Lutz, Data & AI engineering apprentice at ARNia BFC and engineering student at UTBM: experience, education, skills and handball.',

  'section.experience': 'Experience',
  'section.education': 'Education',
  'section.skills': 'Skills',
  'section.handball': 'Handball',

  'contact.email': 'Email',
  'contact.cv': 'Online CV',
  'contact.title': 'Contact',

  'journey.now': 'Current',

  'skills.legend': 'Key',
  'skills.level.solid': 'Practised',
  'skills.level.learning': 'Learning',
  'skills.languages': 'Languages',
  'group.data': 'Data & AI',
  'group.languages': 'Programming languages',
  'group.web': 'Web & data',
  'group.systems': 'Systems & tools',
  'group.iot': 'IoT & embedded',
  'group.communication': 'Communication',

  'handball.club': 'Club',
  'handball.level': 'Level',
  'handball.position': 'Position',
  'handball.background': 'Background',
  'handball.press': 'In the press',

  'footer.updated': 'Updated',
  'footer.top': 'Back to top',

  'notfound.title': 'Page not found',
  'notfound.text': 'This address does not exist, or no longer does. Everything now fits on a single page.',
  'notfound.back': 'Back to the home page',
};

const dict: Record<Lang, Record<Key, string>> = { fr, en };

export function t(lang: Lang, key: Key): string {
  return dict[lang][key];
}
