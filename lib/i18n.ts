/** Lingue supportate dal sito, nell'ordine in cui vengono generate le pagine statiche. */
export const LOCALES = ['it', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
/** Lingua usata quando il browser non ne indica una supportata. */
export const DEFAULT_LOCALE: Locale = 'it';

/**
 * Type guard che verifica se una stringa è una lingua supportata.
 *
 * @param value - Valore da controllare (es. il segmento `[lang]` della route).
 * @returns `true` se `value` è contenuto in {@link LOCALES}; in tal caso TypeScript lo restringe a {@link Locale}.
 * @example
 * isLocale('it'); // true
 * isLocale('fr'); // false
 */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Parametri di route condivisi dalle pagine sotto /[lang] */
export type LangParams = Promise<{ lang: string }>;
