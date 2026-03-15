import type { Metadata } from 'next';

import { BlogList } from '@/lib/pages/blogList';
import type { IPosts } from '@/lib/types/custom-types';
import { getAllFilesFrontMatter } from '@/lib/utils/mdx';

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'The is the description of blog from Static Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#default-fields',
  openGraph: {
    url: 'https://nextjs-chakra-starter-blog.vercel.app/blog',
    title: 'Blog | nextjs-chakra-starter-blog',
    description:
      'The is the description of blog from Static Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#default-fields',
    images: {
      url: 'https://nextjs-chakra-starter-blog.vercel.app/api/og/cover?heading=Blog%20|%20nextjs-chakra-starter-blog&template=plain&center=true',
      alt: 'Blog | nextjs-chakra-starter-blog og-image',
    },
  },
};

async function getData(locale: string) {
  const posts: Array<IPosts> = await getAllFilesFrontMatter('blog', locale);
  return posts;
}

export default async function index({ params }: Props) {
  const { locale } = await params;
  const posts = (await getData(locale)) as Array<IPosts>;
  return <BlogList posts={posts} tagSelected="All" />;
}
