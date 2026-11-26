'use client';

import type { MouseEvent, ReactNode } from 'react';
import styles from './SpotlightCard.module.css';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/** Card con alone luminoso che segue il cursore (bordo + riflesso interno). */
export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <div className={`${styles.spotlight} ${className}`} onMouseMove={handleMouseMove}>
      {children}
    </div>
  );
}
