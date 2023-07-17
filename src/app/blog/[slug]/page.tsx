/* eslint-disable @typescript-eslint/no-explicit-any */

import { serialize } from 'next-mdx-remote/serialize';

import { getFiles, getFileBySlug } from '~/data/mdx';
import BlogLayout from '~/lib/components/blog';
import type { IPosts } from '~/lib/types/custom-types';

export async function generateStaticParams() {
  const posts = await getFiles('blog');

  return posts.map((post) => ({
    slug: post.replace(/\.mdx/, ''),
  }));
}

async function getPost(slug: any) {
  return getFileBySlug('blog', slug);
}

export default async function Page({ params }: { params: any }) {
  const { slug } = params;
  const {
    metaInformation,
    mdx,
  }: {
    metaInformation: IPosts;
    mdx: string;
  } = await getPost(slug);
  const mdxSource = await serialize(mdx);
  return <BlogLayout post={metaInformation} mdxSource={mdxSource} />;
}
