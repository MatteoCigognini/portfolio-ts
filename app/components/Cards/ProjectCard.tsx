import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { Project } from '@/types';
import SpotlightCard from './SpotlightCard';
import CardLink from './CardLink';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
  project: Project;
  description: string;
  openLabel: string;
};

export default function ProjectCard({ project, description, openLabel }: ProjectCardProps) {
  const icon = `/images/projects/${project.slug}.webp`;

  return (
    <SpotlightCard>
      <CardLink href={project.link} external className={styles.card} label={`${openLabel} ${project.name}`}>
        <div className={styles.header}>
          <div className={styles.icon}>
            {/* Alone sfocato generato dall'icona stessa */}
            <Image src={icon} alt="" width={64} height={64} className={styles.iconGlow} aria-hidden="true" />
            <Image src={icon} alt={project.name} width={64} height={64} className={styles.iconImg} />
          </div>
          <span className={`${styles.category} mono`}>{project.category}</span>
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
          {project.link && (
            <span className={styles.open}>
              {openLabel} <FontAwesomeIcon icon={faArrowRight} className={styles.openIcon} />
            </span>
          )}
        </div>
      </CardLink>
    </SpotlightCard>
  );
}
