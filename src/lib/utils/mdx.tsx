import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { defaultLocale } from '@/i18n/locales';
import type { IPosts } from '@/lib/types/custom-types';

const MDX_EXT_REGEX = /\.mdx$/;
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

  return files.reduce(
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
    [] as Array<IPosts>
  );
}

export async function getFileBySlug(
  type: string,
  slug: string,
  locale = defaultLocale
) {
  const localePath = path.join(root, 'content', type, locale);
  const fallbackPath = path.join(root, 'content', type, defaultLocale);
  const basePath = path.join(root, 'content', type);

  let source: string;

  if (slug) {
    // Try locale-specific path first
    const localeFilePath = path.join(localePath, `${slug}.mdx`);
    // Then try fallback locale (en)
    const fallbackFilePath = path.join(fallbackPath, `${slug}.mdx`);
    // Finally try base path (for files not in locale subdirectories)
    const baseFilePath = path.join(basePath, `${slug}.mdx`);

    if (fs.existsSync(localeFilePath)) {
      source = fs.readFileSync(localeFilePath, 'utf8');
    } else if (fs.existsSync(fallbackFilePath)) {
      source = fs.readFileSync(fallbackFilePath, 'utf8');
    } else if (fs.existsSync(baseFilePath)) {
      source = fs.readFileSync(baseFilePath, 'utf8');
    } else {
      throw new Error(
        `MDX file not found for type: ${type}, slug: ${slug}, locale: ${locale}`
      );
    }
  } else {
    source = fs.readFileSync(path.join(root, 'content', `${type}.mdx`), 'utf8');
  }
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
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
      format: 'mdx' as const,
    },
    scope: {},
  };

  const mdxSource = await serialize(content, options);

  return {
    mdxSource,
    metaInformation: newPost,
    content, // Add the raw content for reading duration calculation
  };
}

// Directory content utilities
export async function getDirectoryItems() {
  const contentPath = path.join(process.cwd(), 'content', 'directory');

  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const files = fs
    .readdirSync(contentPath)
    .filter((file) => file.endsWith('.mdx'));

  const items = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(MDX_EXT_REGEX, '');
      const item = await getDirectoryItemBySlug(slug);
      return item.metaInformation;
    })
  );

  return items.filter((item) => !item?.draft);
}

export async function getDirectoryItemBySlug(slug: string) {
  const contentPath = path.join(process.cwd(), 'content', 'directory');
  const filePath = path.join(contentPath, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Directory item not found: ${slug}`);
  }

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(source);

  // Process wiki-links in content
  const WIKI_LINK_REGEX = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const NORMALIZE_REGEX = /[_\s]+/g;
  const processedContent = content.replace(
    WIKI_LINK_REGEX,
    (_match, target, displayText) => {
      const normalized = target
        .trim()
        .toLowerCase()
        .replace(NORMALIZE_REGEX, '-');
      const display = displayText ? displayText.trim() : target.trim();
      return `<WikiLink slug="${normalized}">${display}</WikiLink>`;
    }
  );

  const mdxSource = await serialize(processedContent, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
      development: false,
    },
  });

  const metaInformation: IPosts = {
    ...data,
    slug,
    title: data.title,
    description: data.description,
    tags: data.tags,
    publishedAt: data.publishedAt,
    draft: data.draft,
  };

  return {
    metaInformation,
    mdxSource,
    content: processedContent,
  };
}

const MDX_FILE_REGEX = /\.mdx$/;

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
