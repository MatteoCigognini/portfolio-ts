import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from '@/lib/i18n';

// Restituisce la lingua preferita dell'utente tra quelle supportate
function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const preferred = acceptLanguage
    .split(',')
    .map((entry) => entry.split(';')[0].trim().toLowerCase().split('-')[0])
    .find(isLocale);

  return preferred ?? DEFAULT_LOCALE;
}

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
