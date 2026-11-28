/**
 * Le site tient sur une page par langue : français (par défaut, sans préfixe) et anglais (/en/).
 * Les rubriques sont des ancres localisées de cette page.
 */
export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const HOME = { fr: '/', en: '/en/' } as const satisfies Record<Lang, string>;

/** Rubriques de la page, dans l'ordre de lecture. */
export const SECTIONS = ['experience', 'education', 'skills', 'handball'] as const;
export type Section = (typeof SECTIONS)[number];

/** Identifiants d'ancre par langue (repris dans les redirections d'astro.config.mjs). */
export const ANCHORS = {
  experience: { fr: 'experiences', en: 'experience' },
  education: { fr: 'formations', en: 'education' },
  skills: { fr: 'competences', en: 'skills' },
  handball: { fr: 'handball', en: 'handball' },
} as const satisfies Record<Section, Record<Lang, string>>;

export function anchor(lang: Lang, section: Section): string {
  return ANCHORS[section][lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}
