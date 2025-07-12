import { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm as any],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['src'],
  },
  typescript: {
    // Ignore type checking during build for dependency compatibility
    ignoreBuildErrors: true,
  },
};

export default withMDX(nextConfig);
