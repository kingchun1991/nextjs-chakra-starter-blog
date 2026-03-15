/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';

import { BlogList } from '@/lib/pages/blogList';
import type { IPosts } from '@/lib/types/custom-types';
import { getAllFilesFrontMatter } from '@/lib/utils/mdx';
import { slugify } from '@/lib/utils/text-converter';
import { siteConfig } from '@/site.config';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

async function getData(locale: string) {
  const posts: Array<IPosts> = await getAllFilesFrontMatter('blog', locale);
  return posts;
}

export async function generateStaticParams() {
  const locales = ['en', 'zh-TW'];
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    const posts = (await getData(locale)) as Array<IPosts>;

    const filteredBlogPosts = posts
      .filter((post: IPosts) => !post.draft)
      .sort((a: IPosts, b: IPosts) =>
        a.modifiedAt && b.modifiedAt
          ? Number(new Date(b.modifiedAt)) - Number(new Date(a.modifiedAt))
          : 0
      );

    const tagCounts: { [key: string]: number } = {};
    for (const post of filteredBlogPosts) {
      if (post?.tags) {
        for (const tag of post.tags) {
          if (tagCounts[tag]) {
            tagCounts[tag] += 1;
          } else {
            tagCounts[tag] = 1;
          }
        }
      }
    }

    for (const [tag] of Object.entries(tagCounts)) {
      params.push({
        locale,
        slug: slugify(tag),
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug, locale } = await params;

  return {
    title: slug,
    description: `${slug} for Dynamic Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata`,
    openGraph: {
      type: 'website',
      locale,
      url: `${siteConfig.url}/${slug}`,
      title: `${slug}`,
      description: `${slug}`,
      images: [
        {
          url: `${siteConfig.url}/api/og/cover?heading=${encodeURIComponent(
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
        `${siteConfig.url}/api/og/cover?heading=${encodeURIComponent(
          slug
        )}&text=${encodeURIComponent('blog')}&template=plain&center=true`,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  const posts = (await getData(locale)) as Array<IPosts>;

  return <BlogList posts={posts} tagSelected={slug} />;
}
