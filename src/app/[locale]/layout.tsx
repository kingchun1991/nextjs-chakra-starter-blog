import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { Provider } from '@/components/ui/provider';
import { routing } from '@/i18n/routing';
import { Layout } from '@/lib/layout';
import { siteConfig } from '@/site.config';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const APP_NAME = siteConfig.title;

export const metadata: Metadata = {
  title: { default: APP_NAME, template: siteConfig.titleTemplate },
  description: siteConfig.description,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: {
      url: `${siteConfig.url}/api/og/cover?heading=${siteConfig.title}&template=plain&center=true`,
      alt: `${siteConfig.title} og-image`,
    },
  },
  twitter: {
    creator: '@sozonome',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'zh-TW')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <Layout>{children}</Layout>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
