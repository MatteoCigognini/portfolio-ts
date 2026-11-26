import type { ReactNode } from 'react';
import styles from './MainContainer.module.css';

export default function MainContainer({ children }: { children: ReactNode }) {
  return <main className={styles.container}>{children}</main>;
}
