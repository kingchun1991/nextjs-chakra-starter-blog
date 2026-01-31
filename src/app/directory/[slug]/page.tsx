import type { Metadata } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { DirectoryItem } from '@/lib/pages/directory-item';
import type { IPosts } from '@/lib/types/custom-types';
import { getDirectoryItemBySlug, getDirectoryItemSlugs } from '@/lib/utils/mdx';
import { siteConfig } from '@/site.config';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const slugs = getDirectoryItemSlugs();
  return slugs.map((slug) => ({ slug }));
}

function getData(slug: string) {
  return getDirectoryItemBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metaInformation } = await getData(slug);

  return {
    title: metaInformation.title,
    description: metaInformation.description || metaInformation.title,
    openGraph: {
      type: 'article',
      locale: 'en',
      url: `${siteConfig.url}/directory/${slug}`,
      title: metaInformation.title,
      description: metaInformation.description || metaInformation.title,
      images: [
        {
          url: `${siteConfig.url}/api/og/cover?heading=${encodeURIComponent(
            metaInformation.title || slug
          )}&text=${encodeURIComponent(
            metaInformation.description || ''
          )}&template=plain&center=true`,
          alt: `${metaInformation.title} og-image`,
        },
      ],
    },
  };
}

export default async function DirectoryItemPage({ params }: Props) {
  const { slug } = await params;
  const {
    metaInformation,
    mdxSource,
  }: {
    metaInformation: IPosts;
    mdxSource: MDXRemoteSerializeResult;
  } = await getData(slug);

  return <DirectoryItem item={metaInformation} mdxSource={mdxSource} />;
}
