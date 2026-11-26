import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLock } from '@fortawesome/free-solid-svg-icons';
import type { Work } from '@/types';
import SpotlightCard from './SpotlightCard';
import CardLink from './CardLink';
import styles from './WorkCard.module.css';

type WorkCardProps = {
  work: Work;
  description: string;
  visitLabel: string;
  internalLabel: string;
  /** La card in evidenza occupa tutta la riga con layout orizzontale */
  featured?: boolean;
};

export default function WorkCard({ work, description, visitLabel, internalLabel, featured = false }: WorkCardProps) {
  const image = work.showImage ? `/images/works/full/${work.slug}.webp` : undefined;

  return (
    <SpotlightCard>
      <CardLink
        href={work.link}
        external
        label={`${work.name} — ${visitLabel}`}
        className={`${styles.card} ${featured ? styles.featured : ''}`}
      >
        <div className={styles.media}>
          {image && (
            <Image
              src={image}
              alt={work.name}
              fill
              sizes={featured ? '(max-width: 768px) 100vw, 640px' : '(max-width: 768px) 100vw, 560px'}
              className={styles.img}
            />
          )}
          <div className={styles.mediaShade} />
        </div>

        <div className={styles.content}>
          <div className={styles.top}>
            <span className={`${styles.category} mono`}>{work.category}</span>
            <span className={styles.status}>
              {work.link ? (
                <span className={styles.arrow}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              ) : (
                <span className={styles.private}>
                  <FontAwesomeIcon icon={faLock} /> {internalLabel}
                </span>
              )}
            </span>
          </div>

          <h3 className={styles.name}>{work.name}</h3>
          <p className={styles.description}>{description}</p>

          <ul className={styles.skills}>
            {work.skills.map((skill) => (
              <li key={skill} className={styles.skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </CardLink>
    </SpotlightCard>
  );
}
