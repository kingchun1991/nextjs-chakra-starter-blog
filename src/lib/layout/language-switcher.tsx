'use client';

import { IconButton } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { LuLanguages } from 'react-icons/lu';

const isI18nEnabled =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_ENABLE_I18N === 'true'
    : false;

export function LanguageSwitcher() {
  if (!isI18nEnabled) {
    return null;
  }

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'zh-TW' : 'en';
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <IconButton
      _dark={{ color: 'gray.400' }}
      _hover={{
        color: 'gray.800',
        _dark: { color: 'white' },
      }}
      aria-label={locale === 'en' ? 'Switch to 繁體中文' : 'Switch to English'}
      bg="transparent"
      color="gray.600"
      onClick={switchLocale}
      size="sm"
      title={locale === 'en' ? '繁體中文' : 'English'}
    >
      <LuLanguages />
    </IconButton>
  );
}
