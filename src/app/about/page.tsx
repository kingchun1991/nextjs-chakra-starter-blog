import type { Metadata } from 'next';

// import { getAllFilesFrontMatter } from '../../lib/utils/mdx';
// import BlogPostLayout from 'lib/layout/BlogPostLayout';
// import type { IPosts } from 'lib/types/custom-types';
import About from '~/lib/pages/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The is the description of About from Static Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#default-fields',
  openGraph: {
    url: 'https://nextjs-chakra-starter-blog.vercel.app/About',
    title: 'About | nextjs-chakra-starter-blog',
    description:
      'The is the description of About from Static Metadata: https://nextjs.org/docs/app/building-your-application/optimizing/metadata#default-fields',
    images: {
      url: 'https://nextjs-chakra-starter-blog.vercel.app/api/og/cover?heading=About%20|%20nextjs-chakra-starter-blog&template=plain&center=true',
      alt: 'About | nextjs-chakra-starter-blog og-image',
    },
  },
};

// async function getData() {
//   const posts: IPosts[] = await getAllFilesFrontMatter('About');
//   return posts;
// }

export default async function index() {
  // const posts = (await getData()) as IPosts[];
  return <About />;
}
