import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    name: 'Reasy Gen',
    slug: 'reasy',
    category: 'web-app',
    skills: ['Next.js', 'React', 'MySQL', 'HTML', 'CSS'],
    link: 'https://reasy.vercel.app/it',
    showImage: false,
  },
  {
    name: 'Quizzly',
    slug: 'quizzly',
    category: 'web-app',
    skills: ['Next.js', 'React', 'MySQL', 'HTML', 'CSS', 'OpenAI'],
    link: 'https://quizzly-azure.vercel.app/it',
    showImage: false,
  },
  {
    name: 'Techigo',
    slug: 'techigo',
    category: 'blog',
    skills: ['Next.js', 'React', 'MySQL', 'HTML', 'CSS'],
    link: 'https://blog.matteocigognini.it',
    showImage: false,
  },
];
