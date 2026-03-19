import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

const i18nEnabled = process.env.NEXT_PUBLIC_ENABLE_I18N === 'true';

const i18nMiddleware = i18nEnabled ? createMiddleware(routing) : null;

export default function middleware(request: NextRequest) {
  if (i18nMiddleware) {
    return i18nMiddleware(request);
  }

  // When i18n is disabled, redirect paths to /en prefix since all pages are under [locale]
  const { pathname } = request.nextUrl;

  // Don't redirect if already has locale prefix or is an API/asset route
  if (
    pathname.startsWith('/en') ||
    pathname.startsWith('/zh-TW') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    /\..+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Redirect to /en prefix
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/', '/(zh-TW|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
