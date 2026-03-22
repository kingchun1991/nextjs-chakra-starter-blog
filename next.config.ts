import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import { defaultLocale, locales } from './src/i18n/locales';

const i18nEnabled = locales.length > 1;
const escapedDefaultLocale = defaultLocale.replace(
  /[.*+?^${}()|[\]\\]/g,
  '\\$&'
);

const withNextIntl = i18nEnabled
  ? createNextIntlPlugin('./src/i18n/request.ts')
  : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  typescript: {
    // Ignore type checking during build for dependency compatibility
    ignoreBuildErrors: true,
  },
  // When i18n is disabled, rewrite clean URLs to include the configured default locale internally
  async rewrites() {
    if (i18nEnabled) {
      return [];
    }

    return [
      {
        source: '/',
        destination: `/${defaultLocale}`,
      },
      {
        source: `/:path((?!${escapedDefaultLocale}(?:/|$)).*)`,
        destination: `/${defaultLocale}/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
