import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { JetBrains_Mono, Mona_Sans } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../globals.css';
import { isLocale, LOCALES } from '@/lib/i18n';
import { getDictionary } from './dictionaries';

// Il CSS di FontAwesome è già importato sopra: evita l'iniezione a runtime (niente icone giganti al primo paint)
config.autoAddCss = false;

const sans = Mona_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' });

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Omit<LayoutProps, 'children'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL('https://matteocigognini.it'),
    title: { default: dict.meta.title, template: '%s | Matteo Cigognini' },
    description: dict.meta.description,
    alternates: { languages: { it: '/it', en: '/en' } },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/images/profile.webp'],
      locale: lang,
      type: 'website',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#08080a',
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable}`}>
      <body id="top">
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important;filter:none!important}'}</style>
        </noscript>
        <div className="backdrop" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="grid" />
          <div className="noise" />
        </div>
        {children}
      </body>
    </html>
  );
}
