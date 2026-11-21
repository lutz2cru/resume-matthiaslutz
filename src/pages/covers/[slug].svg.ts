/**
 * Couverture SVG de chaque projet, générée au build à partir de son identifiant (src/lib/terrain.ts).
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderCoverSVG } from '~/lib/terrain';

export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  return projects.map((p) => ({ params: { slug: p.id } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) =>
  new Response(renderCoverSVG(params.slug ?? 'tulz'), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
