import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Provider } from '@/components/ui/provider';
import { routing } from '@/i18n/routing';
import { Layout } from '@/lib/layout';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const i18nEnabled = process.env.NEXT_PUBLIC_ENABLE_I18N === 'true';

export function generateStaticParams() {
  return i18nEnabled
    ? routing.locales.map((locale) => ({ locale }))
    : [{ locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    other: {
      'og:locale': locale,
    },
  };
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (i18nEnabled && !routing.locales.includes(locale as 'en' | 'zh-TW')) {
    notFound();
  }

  const messages = i18nEnabled ? await getMessages() : {};

  return i18nEnabled ? (
    <NextIntlClientProvider messages={messages}>
      <Provider>
        <Layout>{children}</Layout>
      </Provider>
    </NextIntlClientProvider>
  ) : (
    <Provider>
      <Layout>{children}</Layout>
    </Provider>
  );
};

export default LocaleLayout;
