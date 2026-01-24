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
    {
      title: 'Blog',
      url: '/blog',
    },
    { title: 'Tags', url: '/tags' },
    { title: 'About', url: '/about' },
  ],
  directory: {
    enabled: false,
    type: 'generic',
    singular: 'Item',
    plural: 'Items',
    fields: {},
    graph: {
      maxNodes: 1000,
      itemDepth: 2,
      globalDepth: 3,
      minEdgeWeight: 1,
    },
  },
};

export const giscusConfig: GiscusConfig = {
  repo: 'kingchun1991/nextjs-chakra-starter-blog',
  repo_id: 'R_kgDOJ2sHHw',
};

interface GiscusConfig {
  repo: string;
  repo_id: string;
}

interface SitesConfig {
  title: string;
  titleTemplate: string;
  description: string;
  language: string;
  url: string;
  repoUrl: string;
  donationUrl: string;
  navigation: Array<NavItem>;
  repoBranch: string;
  directory?: {
    enabled: boolean;
    type: string;
    singular: string;
    plural: string;
    fields: Record<
      string,
      {
        type: 'string' | 'number' | 'boolean' | 'date' | 'array';
        required: boolean;
        label: string;
        validation?: unknown;
      }
    >;
    graph: {
      maxNodes: number;
      itemDepth: number;
      globalDepth: number;
      minEdgeWeight: number;
    };
  };
}

export interface NavItem {
  title: string;
  url?: string;
  external?: boolean;
  status?: string;
  children?: Array<NavItem>;
}
