import { routing } from '@/i18n/routing';

/**
 * Utility to check if internationalization (i18n) is enabled
 * Enabled when more than one locale is configured
 */
export const isI18nEnabled = (): boolean => {
  return routing.locales.length > 1;
};
