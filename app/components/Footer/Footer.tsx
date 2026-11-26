import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import formatText from '@/utils/textUtils';
import { CONTACT_EMAIL, SOCIALS } from '@/data/socials';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/app/[lang]/dictionaries';
import Breakpoint from '../Breakpoint/Breakpoint';
import Reveal from '../Reveal/Reveal';
import CopyEmailButton from './CopyEmailButton';
import styles from './Footer.module.css';

type FooterProps = {
  lang: Locale;
  dict: Dictionary;
};

export default function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contacts">
      <Breakpoint>
        <Reveal className={styles.idea}>
          <div className={styles.glow} aria-hidden="true" />
          <span className={`${styles.eyebrow} mono`}>
            <span className={styles.dot} /> {dict.contacts}
          </span>
          <h2 className={styles.title}>{formatText(dict.haveAnIdea.title)}</h2>
          <p className={styles.description}>{dict.haveAnIdea.description}</p>

          <div className={styles.mailRow}>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.mailLink}>
              <span>{CONTACT_EMAIL}</span>
              <span className={styles.mailArrow}>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>
            <CopyEmailButton email={CONTACT_EMAIL} copyLabel={dict.footer.copy} copiedLabel={dict.footer.copied} />
          </div>

          <div className={styles.socials}>
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <FontAwesomeIcon icon={social.icon} />
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <div className={styles.bottom}>
          <Link href={`/${lang}`} className={`${styles.logo} mono`}>
            &lt;<strong>Cigo</strong>/&gt;
          </Link>
          <p className={styles.copyright}>
            © {year} Matteo Cigognini. {dict.footer.rights}
            <span className={styles.made}> · {dict.footer.madeWith} ☕</span>
          </p>
          <a href="#top" className={styles.toTop}>
            {dict.footer.backToTop} <FontAwesomeIcon icon={faArrowUp} />
          </a>
        </div>
      </Breakpoint>

      <div className={`${styles.watermark}`} aria-hidden="true">
        CIGOGNINI
      </div>
    </footer>
  );
}
