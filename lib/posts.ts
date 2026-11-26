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

/** Cartella che contiene gli articoli in Markdown. */
const postsDirectory = path.join(process.cwd(), 'posts');
/** Velocità media di lettura usata per stimare il tempo di lettura. */
const WORDS_PER_MINUTE = 250;

/**
 * Elenca gli id di tutti gli articoli disponibili.
 *
 * @returns I nomi dei file `.md` nella cartella `posts/`, senza estensione.
 */
function getPostIds(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * Legge un articolo dal disco e ne separa il front-matter dal corpo.
 * Gli URL assoluti delle immagini di `matteocigognini.it` vengono resi relativi,
 * così sono serviti da `/public` anche in locale.
 *
 * @param id - Id dell'articolo (nome del file senza `.md`).
 * @returns `meta`: i metadati del front-matter; `content`: il corpo Markdown grezzo.
 * @throws Se il file `posts/<id>.md` non esiste.
 */
function readPostFile(id: string) {
  const fileContents = fs.readFileSync(path.join(postsDirectory, `${id}.md`), 'utf8');
  const { data, content } = matter(fileContents);
  const meta = data as Omit<PostMeta, 'id'>;

  // Le immagini del sito stesso vengono servite da /public, così funzionano anche in locale
  if (meta.image) meta.image = meta.image.replace(/^https?:\/\/(www\.)?matteocigognini\.it/, '');

  return { meta, content };
}

/**
 * Verifica che esista un articolo con l'id indicato.
 *
 * @param id - Id dell'articolo (lo slug della URL).
 * @returns `true` se esiste `posts/<id>.md`.
 */
export function findPostByID(id: string): boolean {
  return getPostIds().includes(id);
}

/**
 * Restituisce i metadati di tutti gli articoli, dal più recente al più vecchio.
 * Non elabora il Markdown: è pensata per liste e anteprime.
 *
 * @returns I metadati di ogni articolo, ordinati per `date` decrescente.
 */
export function getSortedPostsData(): PostMeta[] {
  return getPostIds()
    .map((id) => ({ id, ...readPostFile(id).meta }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Carica un articolo completo e ne converte il corpo in HTML.
 * Il Markdown passa per remark (con GFM: tabelle, liste di attività...) e rehype,
 * con evidenziazione della sintassi dei blocchi di codice.
 *
 * @param id - Id dell'articolo (nome del file senza `.md`).
 * @returns I metadati, l'HTML del contenuto e il tempo di lettura stimato in minuti (minimo 1).
 * @throws Se il file `posts/<id>.md` non esiste: verificarlo prima con {@link findPostByID}.
 */
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
