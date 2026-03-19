import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const i18nEnabled = process.env.NEXT_PUBLIC_ENABLE_I18N === 'true';

const withNextIntl = i18nEnabled
  ? createNextIntlPlugin('./src/i18n/request.ts')
  : (config: NextConfig) => config;

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  typescript: {
    // Ignore type checking during build for dependency compatibility
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(withMDX(nextConfig));
