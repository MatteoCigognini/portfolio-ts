import Link from 'next/link';
import type { ReactNode } from 'react';

type CardLinkProps = {
  href?: string;
  external?: boolean;
  className?: string;
  label?: string;
  children: ReactNode;
};

/** Rende l'intera card cliccabile solo se c'è un link, altrimenti usa un semplice <div>. */
export default function CardLink({ href, external = false, className, label, children }: CardLinkProps) {
  if (!href) return <div className={className}>{children}</div>;

  return (
    <Link
      href={href}
      className={className}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </Link>
  );
}
