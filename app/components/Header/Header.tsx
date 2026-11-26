'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CONTACT_EMAIL, SOCIALS } from '@/data/socials';
import { LOCALES, type Locale } from '@/lib/i18n';
import type { ActiveLink } from '@/types';
import type { Dictionary } from '@/app/[lang]/dictionaries';
import Button from '../Buttons/Button';
import styles from './Header.module.css';

type HeaderProps = {
  lang: Locale;
  nav: Dictionary['nav'];
  contactLabel: string;
  activeLink?: ActiveLink;
};

export default function Header({ lang, nav, contactLabel, activeLink = 'home' }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links: { key: ActiveLink; href: string; label: string }[] = [
    { key: 'home', href: `/${lang}`, label: nav.home },
    { key: 'projects', href: `/${lang}/projects`, label: nav.projects },
    { key: 'blog', href: `/${lang}/blog`, label: nav.blog },
  ];

  // Stesso percorso nell'altra lingua: /it/blog -> /en/blog
  const localizedPath = (locale: Locale) => (pathname ?? `/${lang}`).replace(/^\/(it|en)(?=\/|$)/, `/${locale}`);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blocca lo scroll della pagina e abilita la chiusura con ESC quando il menu è aperto
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isMenuOpen]);

  const languageSwitch = (
    <div className={styles.langSwitch} role="group" aria-label={nav.language}>
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={localizedPath(locale)}
          className={`${styles.langOption} ${locale === lang ? styles.langActive : ''}`}
          aria-current={locale === lang ? 'true' : undefined}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.bar}>
          <Link href={`/${lang}`} className={`${styles.logo} mono`} aria-label="Home">
            <span className={styles.bracket}>&lt;</span>
            <strong>Cigo</strong>
            <span className={styles.bracket}>/&gt;</span>
          </Link>

          <nav className={styles.nav}>
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`${styles.link} ${activeLink === link.key ? styles.active : ''}`}
                aria-current={activeLink === link.key ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <div className={styles.socials}>
              {SOCIALS.slice(0, 2).map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label={social.name}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
            {languageSwitch}
            <Button href={`mailto:${CONTACT_EMAIL}`} size="sm" className={styles.cta}>
              {contactLabel}
            </Button>
            <button
              type="button"
              className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={nav.menu}
              aria-expanded={isMenuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Il menu va nel body: il backdrop-filter dell'header creerebbe un nuovo contesto per position: fixed */}
      {isMenuOpen &&
        createPortal(
          <div className={styles.mobileMenu} onClick={() => setIsMenuOpen(false)}>
            <nav className={styles.mobileNav}>
              {links.map((link, i) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`${styles.mobileLink} ${activeLink === link.key ? styles.active : ''}`}
                  style={{ animationDelay: `${80 + i * 70}ms` }}
                >
                  <span className={`${styles.mobileIndex} mono`}>0{i + 1}</span>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={styles.mobileFooter} onClick={(e) => e.stopPropagation()}>
              <Button href={`mailto:${CONTACT_EMAIL}`} size="lg">
                {contactLabel} <FontAwesomeIcon icon={faArrowRight} />
              </Button>
              <div className={styles.mobileRow}>
                <div className={styles.socials}>
                  {SOCIALS.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialIcon}
                      aria-label={social.name}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
                {languageSwitch}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
