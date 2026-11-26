'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import styles from './Footer.module.css';

type CopyEmailButtonProps = {
  email: string;
  copyLabel: string;
  copiedLabel: string;
};

export default function CopyEmailButton({ email, copyLabel, copiedLabel }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={handleCopy} aria-live="polite">
      <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
      <span>{copied ? copiedLabel : copyLabel}</span>
    </button>
  );
}
