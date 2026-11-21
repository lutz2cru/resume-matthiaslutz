/**
 * Correspondance des URL entre français (langue par défaut, sans préfixe) et anglais (/en/).
 * Toute URL interne du site passe par path() : un lien cassé devient une erreur de type.
 */
export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const PAGES = {
  home: { fr: '/', en: '/en/' },
  about: { fr: '/a-propos/', en: '/en/about/' },
  projects: { fr: '/projets/', en: '/en/projects/' },
  journey: { fr: '/parcours/', en: '/en/journey/' },
  skills: { fr: '/competences/', en: '/en/skills/' },
  beyond: { fr: '/hors-code/', en: '/en/beyond/' },
  contact: { fr: '/contact/', en: '/en/contact/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type PageKey = keyof typeof PAGES;

/** Les six territoires, dans l'ordre de la navigation. */
export const TERRITORIES = ['about', 'projects', 'journey', 'skills', 'beyond', 'contact'] as const satisfies readonly PageKey[];

export function path(lang: Lang, page: PageKey): string {
  return PAGES[page][lang];
}

export function projectPath(lang: Lang, id: string): string {
  return `${PAGES.projects[lang]}${id}/`;
}

/** Identifiants d'ancre localisés (sections de la page Hors-code). */
export const ANCHORS = {
  handball: { fr: 'handball', en: 'handball' },
  photographie: { fr: 'photographie', en: 'photography' },
  voyages: { fr: 'voyages', en: 'travel' },
} as const satisfies Record<string, Record<Lang, string>>;

export function anchor(lang: Lang, key: string): string {
  const entry = (ANCHORS as Record<string, Record<Lang, string>>)[key];
  return entry ? entry[lang] : key;
}

/** Résout une référence de contenu (project:id, page:clé#ancre, URL) en lien. */
export function resolveHref(lang: Lang, ref: string): { href: string; external: boolean } {
  if (ref.startsWith('project:')) return { href: projectPath(lang, ref.slice(8)), external: false };
  if (ref.startsWith('page:')) {
    const [key, hash] = ref.slice(5).split('#') as [PageKey, string | undefined];
    return { href: path(lang, key) + (hash ? `#${anchor(lang, hash)}` : ''), external: false };
  }
  return { href: ref, external: /^https?:/.test(ref) };
}

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}
