/* eslint-disable @typescript-eslint/no-explicit-any */
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';

import { getFiles, getFileBySlug } from '../../data/mdx';
import BlogLayout from '../../lib/components/blog';
import MDXComponents from '../../lib/components/MDXComponents';
// import type { IPosts } from '../../lib/types/custom-types';

export default function Blog({
  mdxSource,
  post,
}: {
  mdxSource: any;
  post: any;
}) {
  return (
    <>
      <NextSeo
        title={post.metaInformation.title}
        description=""
        openGraph={{
          type: 'website',
          locale: 'en',
          url: `https://nextjs-chakra-mdx.vercel.app/blog/${post.metaInformation.slug}`,
          title: `${post.metaInformation.title}`,
          description: '',
        }}
      />
      <BlogLayout post={post}>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </BlogLayout>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles('blog');
  return {
    paths: posts.map((p: string) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const post = await getFileBySlug('blog', params.slug);
  const mdxSource = await serialize(post.mdx);
  return { props: { post, mdxSource } };
}
