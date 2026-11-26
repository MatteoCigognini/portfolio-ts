import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  className?: string;
  style?: CSSProperties;
};

type ButtonAsLink = CommonProps & { href: string; external?: boolean; onClick?: never; disabled?: never };
type ButtonAsButton = CommonProps & { href?: never; external?: never; onClick?: () => void; disabled?: boolean };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Bottone polimorfico: con `href` diventa un link, altrimenti un <button>. */
export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', title, className = '', style } = props;
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        className={classes}
        title={title}
        style={style}
        {...(props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className={styles.label}>{children}</span>
      </Link>
    );
  }

  return (
    <button type="button" className={classes} title={title} style={style} onClick={props.onClick} disabled={props.disabled}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
