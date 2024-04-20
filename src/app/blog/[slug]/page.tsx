/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import BlogLayout from 'lib/components/blog';
import { baseUrl } from 'lib/constants/baseUrl';
import type { IPosts } from 'lib/types/custom-types';
import { getFiles, getFileBySlug } from 'lib/utils/mdx';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts = await getFiles('blog');

  return posts.map((post) => ({
    slug: post.replace(/\.mdx/, ''),
  }));
}

async function getPost(slug: any) {
  return getFileBySlug('blog', slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const {
    metaInformation,
  }: {
    metaInformation: IPosts;
  } = await getPost(slug);

  return {
    title: metaInformation.title,
    description: `${metaInformation.summary} for Dynamic Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata`,
    openGraph: {
      type: 'website',
      locale: 'en',
      url: `${baseUrl}/${metaInformation.slug}`,
      title: `${metaInformation.title}`,
      description: `${metaInformation.summary}`,
      images: [
        {
          url: `${baseUrl}/api/og/cover?heading=${encodeURIComponent(
            metaInformation.title
          )}&text=${encodeURIComponent(
            metaInformation.summary
          )}&template=plain&center=true`,
          alt: 'nextjs-chakra-starter-blog og-image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaInformation.title,
      description: metaInformation.summary,
      images: [
        `${baseUrl}/api/og/cover?heading=${encodeURIComponent(
          metaInformation.title
        )}&text=${encodeURIComponent(
          metaInformation.summary
        )}&template=plain&center=true`,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const {
    metaInformation,
    mdxSource,
  }: {
    metaInformation: IPosts;
    mdxSource: MDXRemoteSerializeResult;
  } = await getPost(slug);

  return <BlogLayout post={metaInformation} mdxSource={mdxSource} />;
}
