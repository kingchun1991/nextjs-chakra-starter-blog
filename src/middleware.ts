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
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/(zh-TW|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
