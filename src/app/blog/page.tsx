import type { Metadata } from 'next';

import { getAllFilesFrontMatter } from '../../data/mdx';
import type { IPosts } from '../../lib/types/custom-types';
import BlogPostLayout from '~/lib/layout/BlogPostLayout';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'The is the description of blog from Static Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#default-fields',
  openGraph: {
    url: 'https://nextjs-chakra-mdx.vercel.app/blog',
    title: 'Blog | nextjs-chakra-mdx',
    description:
      'The is the description of blog from Static Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#default-fields',
    images: {
      url: 'https://og-image.sznm.dev/Blog.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg',
      alt: 'nextjs-chakra-mdx og-image',
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
