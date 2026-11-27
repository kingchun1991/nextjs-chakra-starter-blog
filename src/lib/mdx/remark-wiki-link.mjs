import path from 'node:path';

/**
 * Remark plugin that turns `[[target]]` and `[[target|Label]]` into
 * `<WikiLink slug="target">Label</WikiLink>` elements.
 *
 * It only runs for files whose path contains `include` (the directory
 * content folder by default), so `[[` in blog posts is left alone. Text in
 * code spans, code blocks and existing links is never touched.
 *
 * Kept as plain `.mjs` so `@next/mdx` can load it by path under Turbopack.
 */

// Bounded quantifiers keep the pattern ReDoS-safe.
const WIKI_LINK_REGEX =
  /\[\[(?<target>[^\]|]{1,500})(?:\|(?<label>[^\]]{1,500}))?\]\]/gu;
const NORMALIZE_REGEX = /[_\s]+/gu;
const SKIPPED_PARENT_TYPES = new Set(['link', 'linkReference']);
const DEFAULT_INCLUDE = `${path.sep}content${path.sep}directory${path.sep}`;

const toWikiLinkNode = (target, label) => ({
  type: 'mdxJsxTextElement',
  name: 'WikiLink',
  attributes: [
    {
      type: 'mdxJsxAttribute',
      name: 'slug',
      value: target.trim().toLowerCase().replace(NORMALIZE_REGEX, '-'),
    },
  ],
  children: [{ type: 'text', value: (label ?? target).trim() }],
});

const splitText = (value) => {
  const nodes = [];
  let lastIndex = 0;

  for (const match of value.matchAll(WIKI_LINK_REGEX)) {
    if (match.index > lastIndex) {
      nodes.push({ type: 'text', value: value.slice(lastIndex, match.index) });
    }
    nodes.push(toWikiLinkNode(match.groups.target, match.groups.label));
    lastIndex = match.index + match[0].length;
  }

  if (nodes.length === 0) {
    return null;
  }
  if (lastIndex < value.length) {
    nodes.push({ type: 'text', value: value.slice(lastIndex) });
  }
  return nodes;
};

const transform = (node) => {
  if (!node.children || SKIPPED_PARENT_TYPES.has(node.type)) {
    return;
  }

  const children = [];
  for (const child of node.children) {
    const replacement = child.type === 'text' ? splitText(child.value) : null;
    if (replacement) {
      children.push(...replacement);
    } else {
      transform(child);
      children.push(child);
    }
  }
  node.children = children;
};

export default function remarkWikiLink(options = {}) {
  const include = options.include ?? DEFAULT_INCLUDE;

  return (tree, file) => {
    if (file.path?.includes(include)) {
      transform(tree);
    }
  };
}
