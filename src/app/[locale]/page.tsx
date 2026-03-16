import { Home } from '@/lib/pages/home';
import type { IPosts } from '@/lib/types/custom-types';
import { getAllFilesFrontMatter } from '@/lib/utils/mdx';

type Props = {
  params: Promise<{ locale: string }>;
};

async function getData(locale: string) {
  const posts: Array<IPosts> = await getAllFilesFrontMatter('blog', locale);
  return posts;
}

export default async function index({ params }: Props) {
  const { locale } = await params;
  const posts = (await getData(locale)) as Array<IPosts>;
  return <Home posts={posts} />;
}
