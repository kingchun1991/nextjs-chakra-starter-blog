/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';

import { BlogLayout } from '@/lib/layout/blog-layout';
import type { IPosts } from '@/lib/types/custom-types';
import { getFileBySlug, getFiles } from '@/lib/utils/mdx';
import { siteConfig } from '@/site.config';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

const MDX_EXTENSION_REGEX = /\.mdx/u;

export function generateStaticParams() {
  const locales = ['en', 'zh-TW'];

  return locales.flatMap((locale) =>
    getFiles('blog', locale).map((post) => ({
      locale,
      slug: post.replace(MDX_EXTENSION_REGEX, ''),
    }))
  );
}

function getPost(slug: string, locale: string) {
  return getFileBySlug('blog', slug, locale);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug, locale } = await params;

  // fetch data
  const {
    metaInformation,
  }: {
    metaInformation: IPosts;
  } = await getPost(slug, locale);

  return {
    title: metaInformation.title,
    description: `${metaInformation.summary} for Dynamic Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata`,
    openGraph: {
      type: 'article',
      locale,
      url: `${siteConfig.url}/${metaInformation.slug}`,
      title: `${metaInformation.title}`,
      description: `${metaInformation.summary}`,
      images: [
        {
          url: `${siteConfig.url}/api/og/cover?heading=${encodeURIComponent(
            metaInformation.title || ''
          )}&text=${encodeURIComponent(
            metaInformation.summary || ''
          )}&template=plain&center=true`,
          alt: `${metaInformation.title} og-image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaInformation.title,
      description: metaInformation.summary,
      images: [
        `${siteConfig.url}/api/og/cover?heading=${encodeURIComponent(
          metaInformation.title || ''
        )}&text=${encodeURIComponent(
          metaInformation.summary || ''
        )}&template=plain&center=true`,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  const { metaInformation, Content, content } = await getPost(slug, locale);

  return (
    <BlogLayout content={content} post={metaInformation}>
      <Content />
    </BlogLayout>
  );
}
