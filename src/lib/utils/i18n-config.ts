/**
 * Utility to check if internationalization (i18n) is enabled
 * Controlled by NEXT_PUBLIC_ENABLE_I18N environment variable
 */
export const isI18nEnabled = (): boolean => {
  return process.env.NEXT_PUBLIC_ENABLE_I18N === 'true';
};
