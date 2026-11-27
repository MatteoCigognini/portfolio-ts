import type { Project } from '@/types';

/** Progetti personali: i `live` per primi, quelli in sviluppo senza link finché non sono pronti. */
export const PROJECTS: Project[] = [
  {
    name: 'Techigo',
    slug: 'techigo',
    category: 'blog',
    status: 'live',
    skills: ['Next.js', 'React', 'MySQL', 'HTML', 'CSS'],
    link: '/blog',
    showImage: false,
  },
  {
    name: 'Reasy Gen',
    slug: 'reasy',
    category: 'web-app',
    status: 'wip',
    skills: ['Next.js', 'React', 'MySQL', 'HTML', 'CSS'],
    showImage: false,
  },
  {
    name: 'Quizzly',
    slug: 'quizzly',
    category: 'web-app',
    status: 'wip',
    skills: ['Next.js', 'React', 'MySQL', 'HTML', 'CSS', 'OpenAI'],
    showImage: false,
  },
];
