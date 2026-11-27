import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { MDXContent } from 'mdx/types';

import { defaultLocale } from '@/i18n/locales';
import type { IPosts } from '@/lib/types/custom-types';

const MDX_EXT_REGEX = /\.mdx$/u;
const root = process.cwd();

export function getFiles(type: string, locale = defaultLocale) {
  const localePath = path.join(root, 'content', type, locale);
  if (fs.existsSync(localePath)) {
    return fs.readdirSync(localePath);
  }
  // Fallback to configured default locale if locale-specific content doesn't exist
  return fs.readdirSync(path.join(root, 'content', type, defaultLocale));
}

export function getAllFilesFrontMatter(type: string, locale = defaultLocale) {
  const localePath = path.join(root, 'content', type, locale);
  const contentPath = fs.existsSync(localePath)
    ? localePath
    : path.join(root, 'content', type, defaultLocale);

  const files = fs.readdirSync(contentPath);

  return files.reduce<Array<IPosts>>(
    (allPosts: Array<IPosts>, postSlug: string) => {
      const source = fs.readFileSync(path.join(contentPath, postSlug), 'utf8');

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

      allPosts.push(newPost);
      return allPosts;
    },
    []
  );
}

/**
 * Imports a compiled MDX file from `content/` (path without the extension).
 * @next/mdx compiles it at build time; markdown elements render through
 * `src/mdx-components.tsx`.
 */
async function importMdx(relativePath: string): Promise<MDXContent> {
  const mdxModule: { default: MDXContent } = await import(
    `../../../content/${relativePath}.mdx`
  );
  return mdxModule.default;
}

const contentFileExists = (relativePath: string) =>
  fs.existsSync(path.join(root, 'content', `${relativePath}.mdx`));

function resolveContentPath(type: string, slug: string, locale: string) {
  if (!slug) {
    return type;
  }

  // Locale-specific file first, then the default locale, then files that
  // are not in a locale folder.
  const candidates = [
    path.posix.join(type, locale, slug),
    path.posix.join(type, defaultLocale, slug),
    path.posix.join(type, slug),
  ];
  const match = candidates.find(contentFileExists);

  if (!match) {
    throw new Error(
      `MDX file not found for type: ${type}, slug: ${slug}, locale: ${locale}`
    );
  }
  return match;
}

export async function getFileBySlug(
  type: string,
  slug: string,
  locale = defaultLocale
) {
  const relativePath = resolveContentPath(type, slug, locale);
  const source = fs.readFileSync(
    path.join(root, 'content', `${relativePath}.mdx`),
    'utf8'
  );
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

  return {
    Content: await importMdx(relativePath),
    metaInformation: newPost,
    content, // Raw content for the reading duration
  };
}

// Directory content utilities
export function getDirectoryItems() {
  const contentPath = path.join(process.cwd(), 'content', 'directory');

  if (!fs.existsSync(contentPath)) {
    return [];
  }

  return fs
    .readdirSync(contentPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => getDirectoryItemMeta(file.replace(MDX_EXT_REGEX, '')))
    .filter((item) => !item.draft);
}

function getDirectoryItemMeta(slug: string): IPosts {
  const filePath = path.join(
    process.cwd(),
    'content',
    'directory',
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Directory item not found: ${slug}`);
  }

  const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

  return {
    ...data,
    slug,
    title: data.title,
    description: data.description,
    tags: data.tags,
    publishedAt: data.publishedAt,
    draft: data.draft,
  };
}

// `[[wiki-links]]` are turned into <WikiLink> elements at compile time by
// src/lib/mdx/remark-wiki-link.mjs.
export async function getDirectoryItemBySlug(slug: string) {
  return {
    metaInformation: getDirectoryItemMeta(slug),
    Content: await importMdx(`directory/${slug}`),
  };
}

const MDX_FILE_REGEX = /\.mdx$/u;

export function getDirectoryItemSlugs() {
  const contentPath = path.join(process.cwd(), 'content', 'directory');

  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const files = fs
    .readdirSync(contentPath)
    .filter((file) => file.endsWith('.mdx'));
  return files.map((file) => file.replace(MDX_FILE_REGEX, ''));
}
