import type { Metadata } from 'next';

import { getAllFilesFrontMatter } from '../../lib/utils/mdx';
import BlogPostLayout from 'lib/layout/BlogPostLayout';
import type { IPosts } from 'lib/types/custom-types';

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

async function getData() {
  const posts: IPosts[] = await getAllFilesFrontMatter('blog');
  return posts;
}

export default async function index() {
  const posts = (await getData()) as IPosts[];
  return <BlogPostLayout posts={posts} />;
}
