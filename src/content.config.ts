/**
 * Schémas du contenu de TULZ.
 * Tout le texte affiché vit dans src/content/ (YAML) ; ce fichier vérifie sa forme au build.
 * Un texte traduit s'écrit { fr: "…", en: "…" }.
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Texte disponible en français et en anglais. */
const l10n = z.object({ fr: z.string(), en: z.string() });

/** Repère « à compléter » : visible en développement seulement. */
const todo = z.string().optional();

const link = z.object({
  label: l10n,
  href: z.url(),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: z.object({
    /** Ordre d'affichage (1 = en premier). */
    order: z.number().int(),
    /** case : fiche détaillée ; note : entrée courte du carnet. */
    kind: z.enum(['case', 'note']),
    featured: z.boolean().default(false),
    title: l10n,
    /** Une phrase, affichée dans les listes. */
    summary: l10n,
    /** Paragraphe d'ouverture de la fiche. */
    intro: l10n.optional(),
    domains: z.array(z.enum(['web', 'systems', 'data', 'iot', 'infra'])).min(1),
    year: z.string().optional(),
    context: l10n.optional(),
    team: l10n.optional(),
    /** live : en ligne ; ongoing : en cours ; done : terminé ; experimental : essai ; archived : arrêté. Absent = non précisé. */
    status: z.enum(['live', 'ongoing', 'done', 'experimental', 'archived']).optional(),
    /** Identifiants de compétences (skills.yaml). */
    stack: z.array(z.string()).default([]),
    /** Outils cités mais absents de skills.yaml (ex. ntfy, /proc). */
    extra: z.array(z.string()).default([]),
    links: z
      .object({
        demo: z.url().optional(),
        code: z.url().optional(),
        other: z.array(link).default([]),
      })
      .default({ other: [] }),
    /** Illustration spécifique (composant), sinon la couverture générée. */
    visual: z.enum(['phone', 'terminal', 'pipeline', 'gallery', 'cover']).default('cover'),
    /**
     * Capture réelle de l'application en ligne (fichier dans src/assets/images/projects/).
     * Jamais de fausse capture : seulement ce que l'application affiche vraiment.
     */
    shot: z
      .object({
        file: z.string(),
        alt: l10n,
        /** Date de la capture (AAAA-MM-JJ). */
        date: z.string(),
      })
      .optional(),
    sections: z
      .array(
        z.object({
          title: l10n,
          body: l10n.optional(),
          points: z.array(l10n).optional(),
        }),
      )
      .default([]),
    sources: z.array(z.string()).default([]),
    todo,
  }),
});

const journey = defineCollection({
  loader: file('./src/content/journey.yaml'),
  schema: z.object({
    type: z.enum(['work', 'education', 'international', 'engagement', 'sport']),
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
    /** solid = « maîtrisé », learning = « en cours », selon le profil GitHub. Absent = non précisé. */
    level: z.enum(['solid', 'learning']).optional(),
    /** Contexte d'usage hors projets (ex. travail, service civique). */
    usedAt: z.array(l10n).default([]),
  }),
});

const interests = defineCollection({
  loader: file('./src/content/interests.yaml'),
  schema: z.object({
    kind: z.enum(['interest', 'item']),
    label: l10n,
    /** Position dans la constellation (repère 1000 × 620). */
    x: z.number(),
    y: z.number(),
    /** Intérêts reliés (pour un item). */
    links: z.array(z.string()).default([]),
    note: l10n,
    href: z.string().optional(),
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
      photomatton: z.url(),
      polarsteps: z.url(),
      repo: z.url(),
    }),
    bio: z.array(l10n),
    /** Repères affichés sous le nom sur l'accueil : l'essentiel en quelques secondes. */
    highlights: z.array(z.object({ label: l10n, value: l10n, detail: l10n.optional() })),
    now: z.array(z.object({ label: l10n, text: l10n })),
    facts: z.array(z.object({ label: l10n, value: l10n })),
    languages: z.array(z.object({ label: l10n, level: l10n })),
    handball: z.object({
      club: z.string(),
      level: z.string(),
      position: l10n,
      background: l10n,
      quote: l10n,
      text: z.array(l10n),
      press: link,
      pressDate: z.string(),
      todo,
    }),
    photography: z.object({
      lead: l10n,
      album: l10n,
      albumMeta: l10n,
      shots: z.array(z.object({ src: z.url(), alt: l10n })),
      todo,
    }),
    erasmus: z.object({
      lead: l10n,
      text: l10n,
      months: z.number(),
      cities: z.number(),
      countries: z.number(),
      period: l10n,
      todo,
    }),
  }),
});

export const collections = { projects, journey, places, skills, interests, profile };
