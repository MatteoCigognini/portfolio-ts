import type { ReactNode } from 'react';
import styles from './Breakpoint.module.css';

export default function Breakpoint({ children }: { children: ReactNode }) {
  return <div className={styles.breakpoint}>{children}</div>;
}
