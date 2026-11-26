import { getSortedPostsData } from '@/lib/posts';
import type { Locale } from '@/lib/i18n';
import PostCard from '../Cards/PostCard';
import Reveal from '../Reveal/Reveal';
import styles from './PostsList.module.css';

type PostsListProps = {
  lang: Locale;
  readMoreLabel: string;
  emptyLabel: string;
  category?: string;
  limit?: number;
  search?: string;
};

export default function PostsList({ lang, readMoreLabel, emptyLabel, category, limit, search }: PostsListProps) {
  let posts = getSortedPostsData().filter((p) => !category || p.category === category);

  if (search) {
    const query = search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  if (limit) posts = posts.slice(0, limit);

  if (posts.length === 0) return <p className={styles.empty}>{emptyLabel}</p>;

  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <Reveal key={post.id} delay={index * 90}>
          <PostCard lang={lang} post={post} readMoreLabel={readMoreLabel} />
        </Reveal>
      ))}
    </div>
  );
}
