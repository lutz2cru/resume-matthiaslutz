import type { Lang } from '~/i18n/routes';
import { PAGES } from '~/i18n/routes';
import type { getProfile } from './content';

type Profile = Awaited<ReturnType<typeof getProfile>>;

/** Données structurées schema.org Person. */
export function personJsonLd(lang: Lang, profile: Profile): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `https://tulz.fr${PAGES.home[lang]}`,
    image: 'https://tulz.fr/og.png',
    email: `mailto:${profile.email}`,
    jobTitle: profile.role[lang],
    worksFor: { '@type': 'Organization', name: 'ARNia BFC' },
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Université de Technologie de Belfort-Montbéliard (UTBM)' },
    knowsLanguage: ['fr', 'en', 'de'],
    sameAs: [profile.links.linkedin, profile.links.github],
  };
}
