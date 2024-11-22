export const siteConfig: SitesConfig = {
  title: 'nextjs-chakra-starter-blog',
  titleTemplate: '%s | nextjs-chakra-starter-blog',
  description: 'Next.js + chakra-ui + TypeScript + MDX templat',
  language: 'en',
  url: 'https://nextjs-chakra-starter-blog.vercel.app',
  repoUrl: 'https://github.com/kingchun1991/nextjs-chakra-starter-blog',
  repoBranch: 'main',
  donationUrl: 'https://opencollective.com/chakra-ui',
  navigation: [
    { title: 'Playground', url: 'playground' },
    { title: 'Guides', url: 'guides' },
    { title: 'Blog', url: 'blog' },
  ],
};

interface SitesConfig {
  title: string;
  titleTemplate: string;
  description: string;
  language: string;
  url: string;
  repoUrl: string;
  donationUrl: string;
  navigation: NavItem[];
  repoBranch: string;
}

export interface NavItem {
  title: string;
  url?: string;
  external?: boolean;
  status?: string;
  items?: NavItem[];
}
