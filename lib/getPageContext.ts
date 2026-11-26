import 'server-only';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { isLocale } from './i18n';

/**
 * Valida la lingua della route e carica il dizionario corrispondente.
 * Da chiamare all'inizio di ogni pagina sotto `/[lang]`.
 *
 * @param params - Parametri di route forniti da Next.js (promise, come da App Router).
 * @returns La lingua validata e il dizionario dei testi in quella lingua.
 * @throws Interrompe il rendering con `notFound()` (pagina 404) se la lingua non è supportata.
 */
export async function getPageContext(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return { lang, dict };
}
