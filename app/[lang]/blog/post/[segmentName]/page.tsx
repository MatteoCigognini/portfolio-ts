import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import 'highlight.js/styles/github-dark.css';
import Breakpoint from '@/app/components/Breakpoint/Breakpoint';
import Header from '@/app/components/Header/Header';
import MainContainer from '@/app/components/Containers/MainContainer';
import Footer from '@/app/components/Footer/Footer';
import Post from '@/app/components/Blog/Post/Post';
import { getPageContext } from '@/lib/getPageContext';
import { findPostByID, getPostData, getSortedPostsData } from '@/lib/posts';
import { LOCALES } from '@/lib/i18n';
import { AUTHORS } from '@/data/authors';
import { CATEGORIES } from '@/data/categories';

type PostPageProps = {
  params: Promise<{ lang: string; segmentName: string }>;
};

export function generateStaticParams() {
  const posts = getSortedPostsData();
  return LOCALES.flatMap((lang) => posts.map((post) => ({ lang, segmentName: post.id })));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { segmentName } = await params;
  if (!findPostByID(segmentName)) notFound();

  const post = await getPostData(segmentName);
  const author = AUTHORS.find((a) => a.nickname === post.author);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: author ? [{ name: author.name }] : undefined,
    creator: 'Matteo Cigognini',
    publisher: author?.name,
    referrer: 'origin-when-cross-origin',
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { lang, dict } = await getPageContext(params);
  const { segmentName } = await params;
  if (!findPostByID(segmentName)) notFound();

  const post = await getPostData(segmentName);
  const category = CATEGORIES.find((c) => c.slug === post.category);

  return (
    <>
      <Header lang={lang} nav={dict.nav} contactLabel={dict.contactMe} activeLink="blog" />
      <MainContainer>
        <Breakpoint>
          <Post
            lang={lang}
            post={post}
            category={category}
            labels={{ back: dict.blog.back, readingTime: dict.blog.readingTime }}
          />
        </Breakpoint>
      </MainContainer>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
