import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Breakpoint from '../components/Breakpoint/Breakpoint';
import MainContainer from '../components/Containers/MainContainer';
import Header from '../components/Header/Header';
import Section from '../components/Sections/Section';
import Footer from '../components/Footer/Footer';
import Tag from '../components/Tags/Tag';
import Marquee from '../components/Marquee/Marquee';
import Reveal from '../components/Reveal/Reveal';
import Button from '../components/Buttons/Button';
import WorkCard from '../components/Cards/WorkCard';
import ProjectCard from '../components/Cards/ProjectCard';
import PostsList from '../components/Blog/PostsList';
import formatText from '@/utils/textUtils';
import { getPageContext } from '@/lib/getPageContext';
import type { LangParams } from '@/lib/i18n';
import { TECHNOLOGIES, TOOLS } from '@/data/technologies';
import { WORKS } from '@/data/works';
import { PROJECTS } from '@/data/projects';
import { CONTACT_EMAIL } from '@/data/socials';
import styles from './page.module.css';

const PROFILE_IMAGES = ['/images/profile.webp', '/images/profile-2.webp', '/images/profile-3.webp'];

export default async function HomePage({ params }: { params: LangParams }) {
  const { lang, dict } = await getPageContext(params);

  const stack = [...TECHNOLOGIES.filter((t) => !t.learning), ...TOOLS];
  const learning = TECHNOLOGIES.filter((t) => t.learning);

  return (
    <>
      <Header lang={lang} nav={dict.nav} contactLabel={dict.contactMe} activeLink="home" />
      <MainContainer>
        <Breakpoint>
          {/* Banner */}
          <section className={styles.hero}>
            <div className={styles.container}>
              <span className={styles.badge}>
                <span className={styles.badgeDot} />
                {dict.badge}
              </span>

              <p className={styles.hello}>
                {dict.hello} <span className={styles.wave}>👋</span>
              </p>
              <h1 className={styles.title}>{formatText(dict.intro)}</h1>
              <p className={styles.role}>{dict.role}</p>
              <p className={styles.caption}>{dict.roleCaption}</p>

              <div className={styles.ctas}>
                <Button href="#works" size="lg">
                  {dict.viewWorks} <FontAwesomeIcon icon={faArrowRight} />
                </Button>
                <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary" size="lg">
                  {dict.contactMe}
                </Button>
              </div>

              <dl className={styles.stats}>
                {dict.stats.map((stat) => (
                  <div key={stat.label} className={styles.stat}>
                    <dt className={styles.statLabel}>{stat.label}</dt>
                    <dd className={styles.statValue}>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.gallery}>
              {PROFILE_IMAGES.map((src, i) => (
                <div key={src} className={styles.image} style={{ animationDelay: `${200 + i * 120}ms` }}>
                  <Image
                    src={src}
                    alt="Matteo Cigognini"
                    fill
                    priority={i === 0}
                    sizes="(max-width: 768px) 25vw, 220px"
                    className={styles.img}
                  />
                </div>
              ))}

              {/* Quarta tessera: un piccolo "biglietto da visita" in codice */}
              <div className={`${styles.image} ${styles.codeTile} mono`} style={{ animationDelay: '560ms' }}>
                <div className={styles.codeDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <pre className={styles.code}>
                  <span className={styles.tkKeyword}>const</span> <span className={styles.tkVar}>me</span> = {'{'}
                  {'\n  '}role: <span className={styles.tkString}>&apos;Full Stack&apos;</span>,
                  {'\n  '}fuel: <span className={styles.tkString}>&apos;☕☕☕&apos;</span>,
                  {'\n  '}sleep: <span className={styles.tkNumber}>null</span>,
                  {'\n'}
                  {'}'}
                  <span className={styles.caret} />
                </pre>
              </div>
            </div>

            <a href="#works" className={`${styles.scroll} mono`} aria-label={dict.scroll}>
              <FontAwesomeIcon icon={faArrowDown} /> {dict.scroll}
            </a>
          </section>
        </Breakpoint>

        {/* Stack tecnologico */}
        <div className={styles.technologies}>
          <Marquee duration={45}>
            {stack.map((t) => (
              <Tag key={t.slug} image={{ url: `/images/technologies/${t.slug}.webp`, alt: t.name }} text={t.name} />
            ))}
          </Marquee>

          <Breakpoint>
            <div className={styles.learning}>
              <span className={`${styles.learningLabel} mono`}>{dict.techStack.learning}</span>
              {learning.map((t) => (
                <Tag key={t.slug} variant="small" text={t.name} />
              ))}
            </div>
          </Breakpoint>
        </div>

        {/* Lavori */}
        <Section id="works" index="01" title={dict.works.title} description={dict.works.description}>
          <div className={styles.works}>
            {WORKS.map((w, i) => (
              <Reveal key={w.slug} delay={i * 100} className={i === 0 ? 'col-span-full' : ''}>
                <WorkCard
                  work={w}
                  featured={i === 0}
                  description={dict.works.items[w.slug as keyof typeof dict.works.items].description}
                  visitLabel={dict.visit}
                  internalLabel={dict.internal}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Progetti */}
        <Section
          id="projects"
          index="02"
          title={dict.projects.title}
          description={dict.projects.description}
          action={
            <Button href={`/${lang}/projects`} variant="secondary" size="sm">
              {dict.open} <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          }
        >
          <div className={styles.projects}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProjectCard
                  project={p}
                  description={dict.projects.items[p.slug as keyof typeof dict.projects.items].description}
                  openLabel={dict.open}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Ultimi articoli */}
        <Section
          id="blog"
          index="03"
          title={dict.blog.lastPosts.title}
          description={dict.blog.lastPosts.description}
          action={
            <Button href={`/${lang}/blog`} variant="secondary" size="sm">
              Blog <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          }
        >
          <PostsList lang={lang} limit={3} readMoreLabel={dict.blog.readMore} emptyLabel={dict.blog.empty} />
        </Section>
      </MainContainer>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
