'use client';

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Ritardo in ms, utile per creare effetti "a cascata" */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/** Mostra il contenuto con un fade + blur quando entra nel viewport. */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Già visibile al montaggio (o browser senza IntersectionObserver): mostra subito
    const rect = element.getBoundingClientRect();
    if (!('IntersectionObserver' in window) || (rect.top < window.innerHeight && rect.bottom > 0)) {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
