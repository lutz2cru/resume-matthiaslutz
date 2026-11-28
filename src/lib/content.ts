/**
 * Accès typé au contenu. Les vues n'appellent jamais getCollection directement.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Lang } from '~/i18n/routes';

export type L10n = { fr: string; en: string };
export type JourneyEntry = CollectionEntry<'journey'>;
export type Skill = CollectionEntry<'skills'>;
export type SkillGroup = Skill['data']['group'];

export function pick(lang: Lang, value: L10n): string;
export function pick(lang: Lang, value: L10n | undefined): string | undefined;
export function pick(lang: Lang, value: L10n | undefined): string | undefined {
  return value ? value[lang] : undefined;
}

export async function getProfile() {
  const entry = await getEntry('profile', 'main');
  if (!entry) throw new Error('src/content/profile.yaml : entrée « main » introuvable.');
  return entry.data;
}

/** Ordre d'affichage des groupes de compétences. */
export const SKILL_GROUPS = ['data', 'languages', 'web', 'systems', 'iot', 'communication'] as const satisfies readonly SkillGroup[];

const LEVEL_RANK = { solid: 0, learning: 1 } as const;

/**
 * Compétences regroupées dans l'ordre de SKILL_GROUPS. Dans chaque groupe : pratiquées, puis en
 * apprentissage, puis sans niveau précisé, chacune par ordre alphabétique dans la langue de la page.
 */
export async function getSkillGroups(lang: Lang): Promise<{ group: SkillGroup; skills: Skill[] }[]> {
  const skills = (await getCollection('skills')).sort((a, b) => {
    const rank = (s: Skill) => (s.data.level ? LEVEL_RANK[s.data.level] : 2);
    return rank(a) - rank(b) || a.data.label[lang].localeCompare(b.data.label[lang], lang);
  });
  return SKILL_GROUPS.map((group) => ({ group, skills: skills.filter((s) => s.data.group === group) })).filter((g) => g.skills.length);
}

/** Le parcours en deux listes, chacune du plus récent au plus ancien (l'entrée en cours d'abord). */
export async function getJourney(): Promise<{ experience: JourneyEntry[]; education: JourneyEntry[] }> {
  const entries = (await getCollection('journey')).sort((a, b) => {
    if (a.data.current !== b.data.current) return a.data.current ? -1 : 1;
    return b.data.start.localeCompare(a.data.start);
  });
  return {
    experience: entries.filter((e) => e.data.type === 'work' || e.data.type === 'engagement'),
    education: entries.filter((e) => e.data.type === 'education' || e.data.type === 'international'),
  };
}

/** Nom affiché des lieux (places.yaml). */
export async function getPlaceNames(): Promise<Map<string, L10n>> {
  const places = await getCollection('places');
  return new Map(places.map((p) => [p.id, p.data.name]));
}

/** Un repère TODO n'est rendu qu'en développement. */
export const SHOW_TODO = import.meta.env.DEV;
