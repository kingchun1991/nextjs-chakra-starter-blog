import type { Metadata } from 'next';

import { getAllFilesFrontMatter } from '../../data/mdx';
import type { IPosts } from '../../lib/types/custom-types';
import BlogPostLayout from '~/lib/layout/BlogPostLayout';

export const metadata: Metadata = {
  title: 'Blog',
};

async function getData() {
  const posts: IPosts[] = await getAllFilesFrontMatter('blog');
  return posts;
}

export default async function index() {
  const posts = (await getData()) as IPosts[];
  return <BlogPostLayout posts={posts} />;
}
