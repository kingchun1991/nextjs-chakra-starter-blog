import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import type { IPosts } from '../lib/types/custom-types';

const root = process.cwd();

export async function getFiles(type: string) {
  return fs.readdirSync(path.join(root, 'data', type));
}

export async function getAllFilesFrontMatter(type: string) {
  const files = fs.readdirSync(path.join(root, 'data', type));

  return files.reduce((allPosts: IPosts[], postSlug: string) => {
    const source = fs.readFileSync(
      path.join(root, 'data', type, postSlug),
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
      category: data.category,
    };

    return [...allPosts, newPost];
  }, [] as IPosts[]);
}

export async function getFileBySlug(type: string, slug: string) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'data', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'data', `${type}.mdx`), 'utf8');
  const { data, content } = matter(source);

  const newPost: IPosts = {
    publishedAt: data.publishedAt,
    modifiedAt: data.modifiedAt,
    slug,
    summary: data.summary,
    title: data.title,
    image: data.image,
    category: data.category,
  };

  return {
    mdx: content,
    metaInformation: newPost,
  };
}
