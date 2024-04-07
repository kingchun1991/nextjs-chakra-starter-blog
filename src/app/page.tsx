import Home from '~/lib/pages/home';
import type { IPosts } from '~/lib/types/custom-types';
import { getAllFilesFrontMatter } from '~/lib/utils/mdx';

async function getData() {
  const posts: IPosts[] = await getAllFilesFrontMatter('blog');
  return posts;
}

export default async function index() {
  const posts = (await getData()) as IPosts[];
  return <Home posts={posts} />;
}
