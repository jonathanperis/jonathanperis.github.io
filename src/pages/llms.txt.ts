import type { APIRoute } from 'astro';
import { AVAILABILITY, CURRENT_ROLE, EXPERIENCES, PROFILE, SKILLS, SOCIALS } from '../lib/data';

/**
 * Plain-text summary for language-model crawlers (https://llmstxt.org). It is generated from the same
 * shared data as the pages and the JSON-LD, so it cannot drift from what the site shows.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = new URL('/', site).href.replace(/\/$/, '');
  const current = CURRENT_ROLE ? `${CURRENT_ROLE.title} at ${CURRENT_ROLE.company}` : PROFILE.title;

  const lines = [
    `# ${PROFILE.name}`,
    '',
    `> ${PROFILE.headline}`,
    '',
    PROFILE.summary,
    '',
    `Current role: ${current}. ${AVAILABILITY.full}`,
    `Location: ${PROFILE.location}.`,
    '',
    '## Pages',
    '',
    `- [Portfolio](${origin}/): career map, projects, engineering principles and contact details`,
    `- [Resume](${origin}/resume/): print-friendly resume`,
    `- [Resume PDF](${origin}/cv_jonathan_peris.pdf): downloadable two-page PDF`,
    '',
    '## Experience',
    '',
    ...EXPERIENCES.map((exp) => `- ${exp.period}: ${exp.title}, ${exp.company} (${exp.location})`),
    '',
    '## Skills',
    '',
    ...Object.entries(SKILLS).map(([group, values]) => `- ${group}: ${values.join(', ')}`),
    '',
    '## Elsewhere',
    '',
    ...SOCIALS.map((social) => `- [${social.label}](${social.href})`),
    '',
    '## Contact',
    '',
    `- Email: ${PROFILE.email}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
