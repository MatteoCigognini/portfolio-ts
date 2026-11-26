import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import type { Post, PostMeta } from '@/types';

const postsDirectory = path.join(process.cwd(), 'posts');
const WORDS_PER_MINUTE = 250;

function getPostIds(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

function readPostFile(id: string) {
  const fileContents = fs.readFileSync(path.join(postsDirectory, `${id}.md`), 'utf8');
  const { data, content } = matter(fileContents);
  const meta = data as Omit<PostMeta, 'id'>;

  // Le immagini del sito stesso vengono servite da /public, così funzionano anche in locale
  if (meta.image) meta.image = meta.image.replace(/^https?:\/\/(www\.)?matteocigognini\.it/, '');

  return { meta, content };
}

export function findPostByID(id: string): boolean {
  return getPostIds().includes(id);
}

export function getSortedPostsData(): PostMeta[] {
  return getPostIds()
    .map((id) => ({ id, ...readPostFile(id).meta }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string): Promise<Post> {
  const { meta, content } = readPostFile(id);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const words = content.replace(/[#*_`~>\-+\\|!\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;

  return {
    id,
    contentHtml: processed.toString(),
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    ...meta,
  };
}
