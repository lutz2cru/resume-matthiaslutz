/**
 * Schémas du contenu du site.
 * Tout le texte affiché vit dans src/content/ (YAML) ; ce fichier vérifie sa forme au build.
 * Un texte traduit s'écrit { fr: "…", en: "…" }.
 */
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/** Texte disponible en français et en anglais. */
const l10n = z.object({ fr: z.string(), en: z.string() });

/** Repère « à compléter » : visible en développement seulement. */
const todo = z.string().optional();

const link = z.object({
  label: l10n,
  href: z.url(),
});

const journey = defineCollection({
  loader: file('./src/content/journey.yaml'),
  schema: z.object({
    /** work et engagement : Expériences ; education et international : Formations. */
    type: z.enum(['work', 'education', 'international', 'engagement']),
    /** Dates ISO partielles (AAAA ou AAAA-MM) pour le tri et l'affichage. */
    start: z.string(),
    end: z.string().optional(),
    current: z.boolean().default(false),
    /** Libellé de période quand les dates ISO ne suffisent pas (ex. « été & hiver 2025 »). */
    period: l10n.optional(),
    title: l10n,
    org: z.string(),
    place: z.string().optional(),
    description: l10n,
    points: z.array(l10n).optional(),
    tags: z.array(l10n).default([]),
    links: z.array(link).default([]),
    todo,
  }),
});

const places = defineCollection({
  loader: file('./src/content/places.yaml'),
  schema: z.object({
    name: l10n,
    lat: z.number(),
    lon: z.number(),
  }),
});

const skills = defineCollection({
  loader: file('./src/content/skills.yaml'),
  schema: z.object({
    group: z.enum(['data', 'languages', 'web', 'systems', 'iot', 'communication']),
    label: l10n,
    /** solid = « pratiqué », learning = « en apprentissage », selon le profil GitHub. Absent = non précisé. */
    level: z.enum(['solid', 'learning']).optional(),
    /** Contexte d'usage (ex. travail, service civique). */
    usedAt: z.array(l10n).default([]),
  }),
});

const profile = defineCollection({
  loader: file('./src/content/profile.yaml'),
  schema: z.object({
    name: z.string(),
    email: z.email(),
    role: l10n,
    tagline: l10n,
    updated: z.string(),
    links: z.object({
      linkedin: z.url(),
      github: z.url(),
      cv: l10n,
    }),
    /** Repères affichés sous le nom : l'essentiel en quelques secondes. */
    facts: z.array(z.object({ label: l10n, value: l10n, detail: l10n.optional() })),
    languages: z.array(z.object({ label: l10n, level: l10n })),
    handball: z.object({
      club: z.string(),
      level: z.string(),
      position: l10n,
      background: l10n,
      division: l10n,
      quote: l10n,
      text: z.array(l10n),
      press: link,
      pressDate: z.string(),
      todo,
    }),
  }),
});

export const collections = { journey, places, skills, profile };
