import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import rehypeSlug from 'rehype-slug';

import type { IPosts } from '../types/custom-types';

const root = process.cwd();

export async function getFiles(type: string) {
  return fs.readdirSync(path.join(root, 'content', type));
}

export async function getAllFilesFrontMatter(type: string) {
  const files = fs.readdirSync(path.join(root, 'content', type));

  return files.reduce((allPosts: IPosts[], postSlug: string) => {
    const source = fs.readFileSync(
      path.join(root, 'content', type, postSlug),
      'utf8'
    );

    const { data } = matter(source);

    const newPost: IPosts = {
      publishedAt: data.publishedAt,
      modifiedAt: data.modifiedAt,
      slug: postSlug.replace('.mdx', ''),
      summary: data.summary,
      title: data.title,
      image: data.image,
      categories: data.categories,
      draft: data.draft,
      author: data.author,
      tags: data.tags,
    };

    return [...allPosts, newPost];
  }, [] as IPosts[]);
}

export async function getFileBySlug(type: string, slug: string) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'content', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'content', `${type}.mdx`), 'utf8');
  const { data, content } = matter(source);

  const newPost: IPosts = {
    publishedAt: data.publishedAt,
    modifiedAt: data.modifiedAt,
    slug,
    summary: data.summary,
    title: data.title,
    image: data.image,
    categories: data.categories,
    draft: data.draft,
    author: data.author,
    tags: data.tags,
  };

  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  };

  const mdxSource = await serialize(content, options);

  return {
    mdxSource,
    metaInformation: newPost,
  };
}
