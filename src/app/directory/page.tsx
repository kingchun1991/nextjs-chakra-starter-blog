import type { Metadata } from 'next';

import { DirectoryList } from '@/lib/pages/directory-list';
import type { IPosts } from '@/lib/types/custom-types';
import { getDirectoryItems } from '@/lib/utils/mdx';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: siteConfig.directory?.plural || 'Directory',
  description: `Browse ${siteConfig.directory?.plural || 'directory items'}`,
  openGraph: {
    url: `${siteConfig.url}/directory`,
    title: `${siteConfig.directory?.plural || 'Directory'} | ${siteConfig.title}`,
    description: `Browse ${siteConfig.directory?.plural || 'directory items'}`,
    images: {
      url: `${siteConfig.url}/api/og/cover?heading=${encodeURIComponent(
        siteConfig.directory?.plural || 'Directory'
      )}&template=plain&center=true`,
      alt: `${siteConfig.directory?.plural || 'Directory'} og-image`,
    },
  },
};

async function getData() {
  const items: Array<IPosts> = await getDirectoryItems();
  return items;
}

export default async function DirectoryPage() {
  const items = await getData();
  return <DirectoryList items={items} />;
}
