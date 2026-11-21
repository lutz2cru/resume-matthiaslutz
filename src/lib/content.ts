/**
 * Accès typé au contenu. Les vues n'appellent jamais getCollection directement.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Lang } from '~/i18n/routes';

export type L10n = { fr: string; en: string };
export type Project = CollectionEntry<'projects'>;
export type JourneyEntry = CollectionEntry<'journey'>;
export type Skill = CollectionEntry<'skills'>;
export type Interest = CollectionEntry<'interests'>;
export type Place = CollectionEntry<'places'>;

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

export async function getSkills(): Promise<Skill[]> {
  return getCollection('skills');
}

export async function getProjects(): Promise<Project[]> {
  const [projects, skills] = await Promise.all([getCollection('projects'), getSkills()]);
  const known = new Set(skills.map((s) => s.id));
  for (const p of projects) {
    const unknown = p.data.stack.filter((id) => !known.has(id));
    if (unknown.length) {
      throw new Error(`Projet « ${p.id} » : compétences inconnues dans stack (${unknown.join(', ')}). Ajoute-les à skills.yaml.`);
    }
  }
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getCases(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.kind === 'case');
}

export async function getNotes(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.kind === 'note');
}

/** Pour chaque compétence, les projets qui l'utilisent (calculé, jamais saisi). */
export async function getSkillUsage(): Promise<Map<string, Project[]>> {
  const usage = new Map<string, Project[]>();
  for (const p of await getProjects()) {
    for (const id of p.data.stack) {
      const list = usage.get(id) ?? [];
      list.push(p);
      usage.set(id, list);
    }
  }
  return usage;
}

export async function getJourney(): Promise<JourneyEntry[]> {
  const entries = await getCollection('journey');
  return entries.sort((a, b) => {
    if (a.data.current !== b.data.current) return a.data.current ? -1 : 1;
    return b.data.start.localeCompare(a.data.start);
  });
}

export async function getPlaces(): Promise<Map<string, Place['data']>> {
  const places = await getCollection('places');
  return new Map(places.map((p) => [p.id, p.data]));
}

export async function getInterests(): Promise<Interest[]> {
  return getCollection('interests');
}

/** Un repère TODO n'est rendu qu'en développement. */
export const SHOW_TODO = import.meta.env.DEV;
