/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */

'use client';

import {
  Box,
  Code,
  Heading,
  List,
  Separator,
  Table,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';

import RepoCard from '@/components/repo/repo-card';
import { Alert } from '@/components/ui/alert';
import { Link } from '@/components/ui/link';
import type { GitHubRepo } from '@/lib/types/github';

import { ProductSimple } from './mdx-components/card';
import { CodeBlock } from './mdx-components/code-block';
import { EnhancedTable } from './mdx-components/enhanced-table';
import { Mermaid } from './mdx-components/mermaid';
import { TableOfContents } from './mdx-components/table-of-contents';
import { Timeline, TimelineItem } from './mdx-components/timeline';

interface ProductCardProps {
  imgsrc: string;
  title: string;
  price: string;
  url: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { imgsrc, title, price, url } = props;
  return (
    <ProductSimple imgsrc={imgsrc} title={title} price={price} url={url} />
  );
};

interface RepoCardWrapperProps {
  repo: GitHubRepo;
  readme: string;
  error?: string;
}

const RepoCardWrapper = (props: RepoCardWrapperProps) => {
  const { repo, readme, error } = props;
  return <RepoCard repo={repo} readme={readme} error={error} />;
};

interface CustomImageProps {
  width: number;
  height: number;
  src: string;
  alt: string;
}

const CustomImage = (props: CustomImageProps) => {
  const { width, height, src, alt } = props;
  return <Image width={width} height={height} src={src} alt={alt} />;
};

interface CustomLinkProps {
  href: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const CustomLink = (props: CustomLinkProps) => {
  const { href, ...rest } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link
        href={href}
        color="blue.500"
        _dark={{ color: 'blue.500' }}
        {...rest}
      />
    );
  }

  return (
    <Link
      href={href}
      color="blue.500"
      _dark={{ color: 'blue.500' }}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    />
  );
};

const Quote = (props: React.ComponentPropsWithoutRef<typeof Box>) => {
  return (
    <Box
      as="blockquote"
      pl={4}
      py={2}
      borderLeft="4px solid"
      borderColor="blue.500"
      color="gray.600"
      fontStyle="italic"
      mt={4}
      mb={4}
      {...props}
    />
  );
};
// Define a type for the props
type CustomHeadingProps = React.ComponentPropsWithoutRef<typeof Heading> & {
  as: React.ElementType;
  id?: string; // Make id optional since it's not always required
};

const CustomHeading: React.FC<CustomHeadingProps> = ({ as, id, ...props }) => {
  if (id) {
    return (
      <Heading
        as={as}
        id={id}
        lineHeight="1em"
        {...props}
        _hover={{
          _before: {
            content: '"#"',
            position: 'relative',
            marginLeft: '-1.2ch',
            paddingRight: '0.2ch',
          },
        }}
      />
    );
  }
  return <Heading as={as} {...props} />;
};

const Hr = () => {
  return (
    <Separator
      borderColor="gray.200"
      _dark={{ borderColor: 'gray.600' }}
      my={4}
      w="100%"
    />
  );
};

const MDXTable = (props: React.ComponentPropsWithoutRef<typeof Table.Root>) => (
  <Table.ScrollArea borderWidth="1px" maxW="l">
    <Table.Root
      variant="outline"
      size="md"
      colorScheme="gray"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      borderRadius="md"
      shadow="sm"
      width="100%"
      {...props}
    />
  </Table.ScrollArea>
);

const TableHead = (props: any) => (
  <Table.Header bg="gray.50" _dark={{ bg: 'gray.700' }} {...props} />
);

const TableRow = (props: any) => (
  <Table.Row
    _hover={{
      bg: 'gray.50',
      _dark: { bg: 'gray.700' },
    }}
    transition="background-color 0.2s"
    {...props}
  />
);

const TableData = (props: any) => {
  const { style, ...rest } = props;
  const textAlign = style?.textAlign || props.align || 'left';

  return (
    <Table.Cell
      px={4}
      py={3}
      borderColor="gray.200"
      _dark={{ borderColor: 'gray.600' }}
      fontSize="sm"
      verticalAlign="top"
      textAlign={textAlign}
      {...rest}
    />
  );
};

const TableHeader = (props: any) => {
  const { style, ...rest } = props;
  const textAlign = style?.textAlign || props.align || 'left';

  return (
    <Table.ColumnHeader
      px={4}
      py={3}
      fontWeight="semibold"
      fontSize="sm"
      color="gray.700"
      borderColor="gray.200"
      textAlign={textAlign}
      _dark={{
        color: 'gray.200',
        borderColor: 'gray.600',
      }}
      {...rest}
    />
  );
};

const TableBody = (props: any) => <Table.Body {...props} />;

export const MDXComponents = {
  h1: (props: any) => <CustomHeading as="h1" {...props} />,
  h2: (props: any) => <CustomHeading as="h2" {...props} />,
  h3: (props: any) => <CustomHeading as="h3" {...props} />,
  h4: (props: any) => <CustomHeading as="h4" {...props} />,
  h5: (props: any) => <CustomHeading as="h5" {...props} />,
  h6: (props: any) => <CustomHeading as="h6" {...props} />,
  inlineCode: (props: any) => <Code {...props} />,
  br: (props: any) => <Box height="24px" {...props} />,
  p: (props: any) => <Text as="p" mt={0} lineHeight="tall" {...props} />,
  ul: (props: any) => <List.Root as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props: any) => <List.Root as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props: any) => <Box as="li" pb={1} {...props} />,
  blockquote: Quote,
  image: CustomImage,
  hr: Hr,
  a: CustomLink,
  pre: (props: any) => {
    const { children } = props;
    if (children?.props?.className?.includes('language-mermaid')) {
      return <Mermaid code={children.props.children.trim()} />;
    }
    return <CodeBlock {...props} />;
  },
  table: MDXTable,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableData,
  Alert,
  ProductCard: (props: any) => ProductCard(props),
  RepoCard: (props: any) => RepoCardWrapper(props),
  TableOfContents,
  Timeline,
  TimelineItem,
  EnhancedTable,
};

export { CustomLink };
