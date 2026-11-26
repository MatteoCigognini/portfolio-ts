import 'server-only';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { isLocale } from './i18n';

/** Valida la lingua della route e carica il dizionario corrispondente. */
export async function getPageContext(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { lang, dict };
}
