import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { Locale } from '@/lib/i18n';
import type { PostMeta } from '@/types';
import { formatDate } from '@/utils/dateUtils';
import SpotlightCard from './SpotlightCard';
import CardLink from './CardLink';
import styles from './PostCard.module.css';

type PostCardProps = {
  lang: Locale;
  post: PostMeta;
  readMoreLabel: string;
};

export default function PostCard({ lang, post, readMoreLabel }: PostCardProps) {
  return (
    <SpotlightCard>
      <CardLink href={`/${lang}/blog/post/${post.id}`} className={styles.card}>
        <div className={styles.image}>
          {post.image && (
            <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 400px" className={styles.img} />
          )}
        </div>
        <div className={styles.content}>
          <time className={`${styles.date} mono`} dateTime={post.date}>
            {formatDate(post.date, lang)}
          </time>
          <h3 className={styles.title}>{post.title}</h3>
          {post.description && <p className={styles.description}>{post.description}</p>}
          <span className={styles.more}>
            {readMoreLabel} <FontAwesomeIcon icon={faArrowRight} className={styles.moreIcon} />
          </span>
        </div>
      </CardLink>
    </SpotlightCard>
  );
}
