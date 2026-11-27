import type { SystemStyleObject } from '@chakra-ui/react';
import {
  Blockquote,
  Code,
  Heading,
  Image,
  List,
  Separator,
  Table,
  Text,
} from '@chakra-ui/react';
import type { MDXComponents } from 'mdx/types';
import NextImage from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import { isValidElement } from 'react';

import RepoCard from '@/components/repo/repo-card';
import { Alert } from '@/components/ui/alert';
import { Link } from '@/components/ui/link';
import { WikiLink } from '@/lib/components/directory/wiki-link';

import { ProductSimple } from './mdx-components/card';
import { CodeBlock } from './mdx-components/code-block';
import { EnhancedTable } from './mdx-components/enhanced-table';
import { Mermaid } from './mdx-components/mermaid';
import { TableOfContents } from './mdx-components/table-of-contents';
import { Timeline, TimelineItem } from './mdx-components/timeline';

/*
 * Maps the HTML elements MDX generates to Chakra UI components.
 *
 * This module has no 'use client' directive: the map is used by
 * `src/mdx-components.tsx` while MDX renders on the server. Chakra components
 * and the custom components below are client components already.
 */

const HEADING_SIZES = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
  h5: 'sm',
  h6: 'xs',
} as const;

type HeadingLevel = keyof typeof HEADING_SIZES;

const HEADING_ANCHOR_HOVER: SystemStyleObject = {
  _before: {
    content: '"#"',
    position: 'relative',
    marginLeft: '-1.2ch',
    paddingRight: '0.2ch',
  },
};

type MdxHeadingProps = ComponentProps<'h1'> & { level: HeadingLevel };

// Chakra v3 `Heading` defaults to size "xl" whatever `as` is, so each level
// needs an explicit size.
const MdxHeading = ({ level, id, children }: MdxHeadingProps) => (
  <Heading
    _hover={id ? HEADING_ANCHOR_HOVER : undefined}
    as={level}
    id={id}
    size={HEADING_SIZES[level]}
  >
    {children}
  </Heading>
);

const MdxLink = ({ href = '', children }: ComponentProps<'a'>) => {
  const isInternalLink = href.startsWith('/') || href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link color="blue.500" href={href}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      color="blue.500"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </Link>
  );
};

// Markdown images carry no width/height, which `next/image` requires, so they
// render as a responsive, lazy-loaded Chakra `Image`. Authors who know the
// dimensions can use the JSX `<Image>` component (next/image) instead.
const MdxImage = ({ src, alt = '', title }: ComponentProps<'img'>) => (
  <Image
    alt={alt}
    borderRadius="md"
    decoding="async"
    loading="lazy"
    maxW="full"
    src={typeof src === 'string' ? src : undefined}
    title={title}
  />
);

const LANGUAGE_CLASS_REGEX = /language-(?<language>\S+)/u;

// The language class sits on the inner <code>, not on <pre>.
const MdxPre = ({ children }: ComponentProps<'pre'>) => {
  if (!isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    return <pre>{children}</pre>;
  }

  const { className = '', children: codeChildren } = children.props;
  const language =
    LANGUAGE_CLASS_REGEX.exec(className)?.groups?.language ?? 'text';
  const code = typeof codeChildren === 'string' ? codeChildren.trim() : '';

  if (language === 'mermaid') {
    return <Mermaid code={code} />;
  }

  return <CodeBlock code={code} language={language} />;
};

const MdxBlockquote = ({ children }: ComponentProps<'blockquote'>) => (
  <Blockquote.Root colorPalette="blue" my={4} variant="solid">
    <Blockquote.Content color="fg.muted" fontStyle="italic">
      {children}
    </Blockquote.Content>
  </Blockquote.Root>
);

const MdxTable = ({ children }: ComponentProps<'table'>) => (
  <Table.ScrollArea borderRadius="md" borderWidth="1px" w="full">
    <Table.Root bg="bg.panel" interactive size="md" variant="outline">
      {children}
    </Table.Root>
  </Table.ScrollArea>
);

type CellProps = ComponentProps<'td'>;

// MDX turns GFM column alignment into `style.textAlign`; older output used
// the `align` attribute.
const getCellAlign = ({ align, style }: CellProps) => {
  const value = style?.textAlign ?? align;
  return value === 'char' ? undefined : value;
};

const MdxTableCell = (props: CellProps) => (
  <Table.Cell
    fontSize="sm"
    px={4}
    py={3}
    textAlign={getCellAlign(props) ?? 'start'}
    verticalAlign="top"
  >
    {props.children}
  </Table.Cell>
);

const MdxTableHeader = (props: ComponentProps<'th'>) => (
  <Table.ColumnHeader
    fontSize="sm"
    fontWeight="semibold"
    px={4}
    py={3}
    textAlign={getCellAlign(props) ?? 'start'}
  >
    {props.children}
  </Table.ColumnHeader>
);

interface MdxNextImageProps {
  alt: string;
  height: number;
  src: string;
  width: number;
}

// For JSX `<Image src alt width height />` in MDX when the size is known.
const MdxNextImage = ({ src, alt, width, height }: MdxNextImageProps) => (
  <NextImage alt={alt} height={height} src={src} width={width} />
);

export const mdxComponents: MDXComponents = {
  h1: (props) => <MdxHeading level="h1" {...props} />,
  h2: (props) => <MdxHeading level="h2" {...props} />,
  h3: (props) => <MdxHeading level="h3" {...props} />,
  h4: (props) => <MdxHeading level="h4" {...props} />,
  h5: (props) => <MdxHeading level="h5" {...props} />,
  h6: (props) => <MdxHeading level="h6" {...props} />,
  p: ({ children }) => (
    <Text lineHeight="tall" mt={0}>
      {children}
    </Text>
  ),
  a: MdxLink,
  code: ({ children }) => <Code>{children}</Code>,
  pre: MdxPre,
  img: MdxImage,
  blockquote: MdxBlockquote,
  hr: () => <Separator my={4} w="full" />,
  ul: ({ children, className }) => (
    <List.Root className={className} ml={2} pl={4} pt={2}>
      {children}
    </List.Root>
  ),
  ol: ({ children, className }) => (
    <List.Root as="ol" className={className} ml={2} pl={4} pt={2}>
      {children}
    </List.Root>
  ),
  li: ({ children, className }) => (
    <List.Item className={className} pb={1}>
      {children}
    </List.Item>
  ),
  table: MdxTable,
  thead: ({ children }) => (
    <Table.Header bg="bg.muted">{children}</Table.Header>
  ),
  tbody: ({ children }) => <Table.Body>{children}</Table.Body>,
  tr: ({ children }) => <Table.Row>{children}</Table.Row>,
  th: MdxTableHeader,
  td: MdxTableCell,
  Alert,
  EnhancedTable,
  Image: MdxNextImage,
  ProductCard: ProductSimple,
  RepoCard,
  TableOfContents,
  Timeline,
  TimelineItem,
  WikiLink,
};
