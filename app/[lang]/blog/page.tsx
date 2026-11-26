import type { Metadata } from 'next';
import Header from '@/app/components/Header/Header';
import MainContainer from '@/app/components/Containers/MainContainer';
import Footer from '@/app/components/Footer/Footer';
import Section from '@/app/components/Sections/Section';
import PostsList from '@/app/components/Blog/PostsList';
import { getPageContext } from '@/lib/getPageContext';
import type { LangParams } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const { dict } = await getPageContext(params);
  return { title: dict.nav.blog, description: dict.blog.allPosts.description };
}

export default async function BlogPage({ params }: { params: LangParams }) {
  const { lang, dict } = await getPageContext(params);

  return (
    <>
      <Header lang={lang} nav={dict.nav} contactLabel={dict.contactMe} activeLink="blog" />
      <MainContainer>
        <Section index="//" title={dict.blog.allPosts.title} description={dict.blog.allPosts.description}>
          <PostsList lang={lang} readMoreLabel={dict.blog.readMore} emptyLabel={dict.blog.empty} />
        </Section>
      </MainContainer>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
