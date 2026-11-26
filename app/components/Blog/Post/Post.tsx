import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import type { Locale } from '@/lib/i18n';
import type { Category, Post as PostType } from '@/types';
import { formatDate } from '@/utils/dateUtils';
import ReadingProgress from './ReadingProgress';
import styles from './Post.module.css';

type PostProps = {
  lang: Locale;
  post: PostType;
  category?: Category;
  labels: { back: string; readingTime: string };
};

export default function Post({ lang, post, category, labels }: PostProps) {
  return (
    <>
      <ReadingProgress />
      <article className={styles.post}>
        <div className={styles.toolbar}>
          <Link href={`/${lang}/blog`} className={styles.back}>
            <FontAwesomeIcon icon={faArrowLeft} /> {labels.back}
          </Link>
          <div className={`${styles.info} mono`}>
            {category && <span className={styles.category}>{category.title}</span>}
            <span className={styles.text}>
              <FontAwesomeIcon icon={faCalendar} /> {formatDate(post.date, lang)}
            </span>
            <span className={styles.text}>
              <FontAwesomeIcon icon={faClock} /> {post.readingTime} {labels.readingTime}
            </span>
          </div>
        </div>

        <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </>
  );
}
