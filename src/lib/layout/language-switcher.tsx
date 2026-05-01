'use client';

import { IconButton } from '@chakra-ui/react';
import { useLocale } from 'next-intl';
import { LuLanguages } from 'react-icons/lu';

import { routing, usePathname, useRouter } from '@/i18n/routing';

const shouldShowLanguageSwitcher = routing.locales.length > 1;

const localeLabels: Record<string, string> = {
  en: 'English',
  'zh-TW': '繁體中文',
  es: 'Español',
};

const getNextLocale = (currentLocale: string): string => {
  const locales = routing.locales;
  const currentIndex = locales.indexOf(
    currentLocale as (typeof locales)[number]
  );
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % locales.length : 0;
  return locales[nextIndex] ?? routing.defaultLocale;
};

export function LanguageSwitcher() {
  if (!shouldShowLanguageSwitcher) {
    return null;
  }

  return <LanguageSwitcherButton />;
}

function LanguageSwitcherButton() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = getNextLocale(locale);
  const nextLocaleLabel = localeLabels[nextLocale] ?? nextLocale;

  const switchLocale = () => {
    router.push(pathname, {
      locale: nextLocale as (typeof routing.locales)[number],
    });
  };

  return (
    <IconButton
      _hover={{ color: 'rgba(255,255,255,0.7)' }}
      aria-label={`Switch language to ${nextLocaleLabel}`}
      bg="transparent"
      color="white"
      onClick={switchLocale}
      size="sm"
      title={nextLocaleLabel}
    >
      <LuLanguages />
    </IconButton>
  );
}
