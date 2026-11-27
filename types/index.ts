import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Technology {
  slug: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  learning?: boolean;
}

export interface Work {
  name: string;
  slug: string;
  category: 'e-commerce' | 'erp';
  skills: string[];
  link?: string;
  showImage: boolean;
}

export interface Project {
  name: string;
  slug: string;
  category: 'web-app' | 'blog';
  /** `live`: pubblicato e consultabile; `wip`: in sviluppo, la card non è cliccabile. */
  status: 'live' | 'wip';
  skills: string[];
  /** URL esterno, oppure percorso interno che inizia con `/` (viene prefissato con la lingua). */
  link?: string;
  showImage: boolean;
}

export interface Social {
  name: string;
  link: string;
  icon: IconDefinition;
}

export interface Author {
  name: string;
  nickname: string;
  avatar: string;
  role: string;
  socials: Social[];
}

export interface Category {
  title: string;
  slug: string;
  icon: IconDefinition;
  description: string;
}

export interface PostMeta {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  author: string;
  tags: string[];
  date: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
  readingTime: number;
}

export type ActiveLink = 'home' | 'projects' | 'blog';
