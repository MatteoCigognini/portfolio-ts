import type { Locale } from '@/lib/i18n';

const INTL_LOCALES: Record<Locale, string> = { it: 'it-IT', en: 'en-GB' };

/** Formatta una data 'YYYY-MM-DD' in 'DD MMM YYYY' nella lingua indicata. */
export function formatDate(inputDate: string, locale: Locale = 'it'): string {
  return new Date(inputDate).toLocaleDateString(INTL_LOCALES[locale], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
