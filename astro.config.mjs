// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Anciennes adresses (site en plusieurs pages, jusqu'en novembre 2026) → rubrique de la page unique.
 * Les ancres reprennent ANCHORS dans src/i18n/routes.ts.
 */
const OLD_PROJECTS = [
  'caisse-noire', 'csv70-matches', 'entrepot-bd70', 'expert-system', 'java-revisions', 'nas', 'photomatton',
  'process-manager', 'shortcut-keyboard', 'sp-bot', 'the-wall', 'vocabulary', 'weather-station', 'word-game',
];

const redirects = {
  '/parcours': '/#experiences',
  '/competences': '/#competences',
  '/hors-code': '/#handball',
  '/a-propos': '/',
  '/contact': '/',
  '/projets': '/',
  '/en/journey': '/en/#experience',
  '/en/skills': '/en/#skills',
  '/en/beyond': '/en/#handball',
  '/en/about': '/en/',
  '/en/contact': '/en/',
  '/en/projects': '/en/',
  ...Object.fromEntries(OLD_PROJECTS.flatMap((id) => [[`/projets/${id}`, '/'], [`/en/projects/${id}`, '/en/']])),
};

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://tulz.fr',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  redirects,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  devToolbar: { enabled: false },
});
