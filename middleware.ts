import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from '@/lib/i18n';

/**
 * Ricava la lingua preferita dell'utente tra quelle supportate, leggendo l'header `Accept-Language`.
 * Le lingue vengono considerate nell'ordine inviato dal browser, ignorando regione e peso (`en-US;q=0.8` → `en`).
 *
 * @param request - Richiesta in arrivo.
 * @returns La prima lingua supportata trovata, altrimenti {@link DEFAULT_LOCALE}.
 */
function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const preferred = acceptLanguage
    .split(',')
    .map((entry) => entry.split(';')[0].trim().toLowerCase().split('-')[0])
    .find(isLocale);

  return preferred ?? DEFAULT_LOCALE;
}

/**
 * Middleware di Next.js: garantisce che ogni URL abbia il prefisso della lingua.
 * Se manca, reindirizza alla lingua preferita del browser (es. `/projects` → `/it/projects`).
 *
 * @param request - Richiesta in arrivo.
 * @returns `NextResponse.next()` se la lingua è già presente, altrimenti un redirect.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return NextResponse.next();

  // Reindirizza se non c'è nessuna lingua (es. /projects -> /it/projects)
  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Esclude risorse interne, API e file statici (qualsiasi path con estensione)
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
