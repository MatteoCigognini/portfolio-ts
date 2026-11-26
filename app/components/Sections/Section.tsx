import type { ReactNode } from 'react';
import formatText from '@/utils/textUtils';
import Breakpoint from '../Breakpoint/Breakpoint';
import Reveal from '../Reveal/Reveal';
import styles from './Section.module.css';

type SectionProps = {
  title: string;
  description?: string;
  /** Etichetta numerica mostrata sopra al titolo (es. "01") */
  index?: string;
  id?: string;
  /** Contenuto opzionale allineato a destra del titolo (es. un link "vedi tutti") */
  action?: ReactNode;
  children: ReactNode;
};

export default function Section({ title, description, index, id, action, children }: SectionProps) {
  return (
    <section className={styles.section} id={id}>
      <Breakpoint>
        <Reveal className={styles.info}>
          <div className={styles.heading}>
            {index && (
              <span className={`${styles.index} mono`}>
                <span className={styles.indexNumber}>{index}</span>
                <span className={styles.indexLine} />
              </span>
            )}
            <h2 className={styles.title}>{formatText(title)}</h2>
            {description && <p className={styles.description}>{formatText(description)}</p>}
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </Reveal>
        <div className={styles.content}>{children}</div>
      </Breakpoint>
    </section>
  );
}
