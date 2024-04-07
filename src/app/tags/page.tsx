import type { Metadata } from 'next';

import TagsLayout from 'lib/layout/TagsLayout';
import type { IPosts } from 'lib/types/custom-types';
import { getAllFilesFrontMatter } from 'lib/utils/mdx';

export const metadata: Metadata = {
  title: 'Tags',
  description:
    'The is the description of Blog from Static Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#default-fields',
  openGraph: {
    url: 'https://nextjs-chakra-starter-blog.vercel.app/tags',
    title: 'Tags | nextjs-chakra-starter-blog',
    description:
      'The is the description of Blog from Static Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#default-fields',
    images: {
      url: 'https://nextjs-chakra-starter-blog.vercel.app/api/og/cover?heading=Tags%20|%20nextjs-chakra-starter-blog&template=plain&center=true',
      alt: 'Tags | nextjs-chakra-starter-blog og-image',
    },
  },
};

async function getData() {
  const posts: IPosts[] = await getAllFilesFrontMatter('blog');
  return posts;
}

export default async function index() {
  const posts = (await getData()) as IPosts[];
  return <TagsLayout posts={posts} />;
}
