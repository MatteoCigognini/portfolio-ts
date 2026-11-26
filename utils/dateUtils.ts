import type { Locale } from '@/lib/i18n';

const INTL_LOCALES: Record<Locale, string> = { it: 'it-IT', en: 'en-GB' };

/**
 * Formatta una data `YYYY-MM-DD` in giorno, mese abbreviato e anno nella lingua indicata.
 *
 * @param inputDate - Data in formato ISO, es. `'2025-02-16'`.
 * @param locale - Lingua del sito; di default `'it'`.
 * @returns La data formattata, es. `'16 feb 2025'` (it) o `'16 Feb 2025'` (en).
 */
export function formatDate(inputDate: string, locale: Locale = 'it'): string {
  return new Date(inputDate).toLocaleDateString(INTL_LOCALES[locale], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
