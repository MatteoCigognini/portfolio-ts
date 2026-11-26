import type { Metadata } from 'next';
import Header from '@/app/components/Header/Header';
import MainContainer from '@/app/components/Containers/MainContainer';
import Footer from '@/app/components/Footer/Footer';
import Section from '@/app/components/Sections/Section';
import ProjectCard from '@/app/components/Cards/ProjectCard';
import Reveal from '@/app/components/Reveal/Reveal';
import { getPageContext } from '@/lib/getPageContext';
import type { LangParams } from '@/lib/i18n';
import { PROJECTS } from '@/data/projects';
import styles from './page.module.css';

/**
 * Titolo della pagina dei progetti.
 *
 * @param params - Parametri di route con la lingua.
 * @returns I metadati della pagina nella lingua richiesta.
 */
export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const { dict } = await getPageContext(params);
  return { title: dict.nav.projects };
}

export default async function ProjectsPage({ params }: { params: LangParams }) {
  const { lang, dict } = await getPageContext(params);

  return (
    <>
      <Header lang={lang} nav={dict.nav} contactLabel={dict.contactMe} activeLink="projects" />
      <MainContainer>
        <Section index="//" title={dict.projects.title} description={dict.projects.description}>
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
      </MainContainer>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
