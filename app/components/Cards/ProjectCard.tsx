import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { Project } from '@/types';
import SpotlightCard from './SpotlightCard';
import CardLink from './CardLink';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
  project: Project;
  lang: string;
  description: string;
  openLabel: string;
  statusLabels: Record<Project['status'], string>;
};

/**
 * Card di un progetto personale. Se il progetto non ha link (es. in sviluppo)
 * la card non è cliccabile e non mostra gli effetti hover da link.
 */
export default function ProjectCard({ project, lang, description, openLabel, statusLabels }: ProjectCardProps) {
  const icon = `/images/projects/${project.slug}.webp`;
  const isInternal = project.link?.startsWith('/') ?? false;
  const href = project.link && isInternal ? `/${lang}${project.link}` : project.link;
  const clickable = Boolean(href);

  return (
    <SpotlightCard interactive={clickable}>
      <CardLink
        href={href}
        external={!isInternal}
        className={`${styles.card} ${clickable ? styles.clickable : ''}`}
        label={`${openLabel} ${project.name}`}
      >
        <div className={styles.header}>
          <div className={styles.icon}>
            {/* Alone sfocato generato dall'icona stessa */}
            <Image src={icon} alt="" width={64} height={64} className={styles.iconGlow} aria-hidden="true" />
            <Image src={icon} alt={project.name} width={64} height={64} className={styles.iconImg} />
          </div>
          <div className={styles.meta}>
            <span className={`${styles.category} mono`}>{project.category}</span>
            <span className={`${styles.status} ${styles[project.status]} mono`}>
              <span className={styles.statusDot} aria-hidden="true" />
              {statusLabels[project.status]}
            </span>
          </div>
        </div>

        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <ul className={styles.skills}>
            {project.skills.map((skill) => (
              <li key={skill} className={styles.skill}>
                {skill}
              </li>
            ))}
          </ul>
          {clickable && (
            <span className={styles.open}>
              {openLabel} <FontAwesomeIcon icon={faArrowRight} className={styles.openIcon} />
            </span>
          )}
        </div>
      </CardLink>
    </SpotlightCard>
  );
}
