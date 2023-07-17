/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import { serialize } from 'next-mdx-remote/serialize';

import { getFiles, getFileBySlug } from '~/data/mdx';
import BlogLayout from '~/lib/components/blog';
import type { IPosts } from '~/lib/types/custom-types';

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
      url: `https://nextjs-chakra-mdx.vercel.app/blog/${metaInformation.slug}`,
      title: `${metaInformation.title}`,
      description: `${metaInformation.summary}`,
      images: [
        {
          url: `https://og.sznm.dev/api/generate?heading=${encodeURIComponent(
            metaInformation.title
          )}&text=${encodeURIComponent(
            metaInformation.summary
          )}&template=plain&center=true`,
          alt: 'nextjs-chakra-mdx og-image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaInformation.title,
      description: metaInformation.summary,
      images: [
        `https://og.sznm.dev/api/generate?heading=${encodeURIComponent(
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
    mdx,
  }: {
    metaInformation: IPosts;
    mdx: string;
  } = await getPost(slug);
  const mdxSource = await serialize(mdx);
  return <BlogLayout post={metaInformation} mdxSource={mdxSource} />;
}
