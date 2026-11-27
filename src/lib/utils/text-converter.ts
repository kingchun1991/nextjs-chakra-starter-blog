/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { slug } from 'github-slugger';
import { marked } from 'marked';

// slugify
export const slugify = (content: string) => slug(content);

// // markdownify
export const markdownify = (content: string, div?: boolean) => {
  const markdownContent: string | Promise<string> = div
    ? marked.parse(content)
    : marked.parseInline(content);
  return { __html: markdownContent };
};

const FIRST_LETTER_REGEX = /^[a-z]/u;

// humanize
export const humanize = (content: string) =>
  content
    .replace(/^[\s_]+|[\s_]+$/gu, '')
    .replace(/[_\s]+/gu, ' ')
    .replace(FIRST_LETTER_REGEX, (m) => m.toUpperCase());

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string): string => {
  const entityList: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
  };
  const htmlWithoutEntities: string = htmlWithEntities.replace(
    /&amp;|&lt;|&gt;|&quot;|&#39;/gu,
    (entity: string): string => entityList[entity]
  );
  return htmlWithoutEntities;
};

// plainify
export const plainify = (content: string) => {
  const parseMarkdown: string | Promise<string> = marked.parse(content);
  const filterBrackets = parseMarkdown
    .toString()
    .replace(/<\/?[^>]+(?:>|$)/gmu, '');
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gmu, '');
  return htmlEntityDecoder(filterSpaces);
};
