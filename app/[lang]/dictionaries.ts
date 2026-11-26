import 'server-only';
import type { Locale } from '@/lib/i18n';
import type it from './dictionaries/it.json';

/** La struttura del dizionario italiano è la fonte di verità per tutte le lingue. */
export type Dictionary = typeof it;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  it: () => import('./dictionaries/it.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default satisfies Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
