/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';

import { baseUrl } from 'lib/constants/baseUrl';
import type { IPosts } from 'lib/types/custom-types';
import { getAllFilesFrontMatter } from 'lib/utils/mdx';
import BlogList from '~/lib/pages/blogList';

type Props = {
  params: { slug: string };
};

async function getData() {
  const posts: IPosts[] = await getAllFilesFrontMatter('blog');
  return posts;
}

export async function generateStaticParams() {
  const posts = (await getData()) as IPosts[];

  const filteredBlogPosts = posts
    .filter((post: IPosts) => !post.draft)
    .sort((a: IPosts, b: IPosts) =>
      a.modifiedAt && b.modifiedAt
        ? Number(new Date(b.modifiedAt)) - Number(new Date(a.modifiedAt))
        : 0
    );

  const tagCounts: { [key: string]: number } = {};
  filteredBlogPosts.forEach((post: IPosts) => {
    post?.tags?.forEach((tag: string) => {
      if (tagCounts[tag]) {
        tagCounts[tag] += 1;
      } else {
        tagCounts[tag] = 1;
      }
    });
  });

  return Object.entries(tagCounts).map(([tag]) => ({
    slug: tag,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = params;

  return {
    title: slug,
    description: `${slug} for Dynamic Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata`,
    openGraph: {
      type: 'website',
      locale: 'en',
      url: `${baseUrl}/${slug}`,
      title: `${slug}`,
      description: `${slug}`,
      images: [
        {
          url: `${baseUrl}/api/og/cover?heading=${encodeURIComponent(
            slug
          )}&text=${encodeURIComponent(slug)}&template=plain&center=true`,
          alt: 'nextjs-chakra-starter-blog og-image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: slug,
      description: 'blog',
      images: [
        `${baseUrl}/api/og/cover?heading=${encodeURIComponent(
          slug
        )}&text=${encodeURIComponent('blog')}&template=plain&center=true`,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const posts = (await getData()) as IPosts[];

  return <BlogList posts={posts} tagSelected={slug} />;
}
