import type { ReactNode } from 'react';
import styles from './Marquee.module.css';

type MarqueeProps = {
  children: ReactNode;
  /** Durata di un giro completo in secondi */
  duration?: number;
  reverse?: boolean;
};

/** Scorrimento orizzontale infinito: il contenuto viene duplicato e traslato del 50%. */
export default function Marquee({ children, duration = 40, reverse = false }: MarqueeProps) {
  return (
    <div className={styles.marquee}>
      <div
        className={`${styles.track} ${reverse ? styles.reverse : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
