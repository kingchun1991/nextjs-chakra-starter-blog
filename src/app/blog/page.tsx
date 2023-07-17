import { getAllFilesFrontMatter } from '../../data/mdx';
import type { IPosts } from '../../lib/types/custom-types';
import BlogPostLayout from '~/lib/layout/BlogPostLayout';

async function getData() {
  const posts: IPosts[] = await getAllFilesFrontMatter('blog');
  return posts;
}

export default async function index() {
  const posts = (await getData()) as IPosts[];
  return <BlogPostLayout posts={posts} />;
}
