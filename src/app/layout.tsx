import type { Metadata, Viewport } from 'next';

import Providers from '~/app/providers';
import Layout from '~/lib/layout';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'nextjs-chakra-starter-blog';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | nextjs-chakra-starter-blog' },
  description: 'Next.js + chakra-ui + TypeScript + mdx template',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://nextjs-chakra-starter-blog.vercel.app',
    title: 'nextjs-chakra-starter-blog',
    description: 'Next.js + chakra-ui + TypeScript + MDX template',
    images: {
      url: 'https://nextjs-chakra-starter-blog.vercel.app/api/og/cover?heading=nextjs-chakra-starter-blog&template=plain&center=true',
      alt: 'nextjs-chakra-starter-blog og-image',
    },
  },
  twitter: {
    creator: '@sozonome',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
