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
    <ProductSimple imgsrc={imgsrc} price={price} title={title} url={url} />
  );
};

interface RepoCardWrapperProps {
  repo: GitHubRepo;
  readme: string;
  error?: string;
}

const RepoCardWrapper = (props: RepoCardWrapperProps) => {
  const { repo, readme, error } = props;
  return <RepoCard error={error} readme={readme} repo={repo} />;
};

interface CustomImageProps {
  width: number;
  height: number;
  src: string;
  alt: string;
}

const CustomImage = (props: CustomImageProps) => {
  const { width, height, src, alt } = props;
  return <Image alt={alt} height={height} src={src} width={width} />;
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
        _dark={{ color: 'blue.500' }}
        color="blue.500"
        href={href}
        {...rest}
      />
    );
  }

  return (
    <Link
      _dark={{ color: 'blue.500' }}
      color="blue.500"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
    />
  );
};

const Quote = (props: React.ComponentPropsWithoutRef<typeof Box>) => {
  return (
    <Box
      as="blockquote"
      borderColor="blue.500"
      borderLeft="4px solid"
      color="gray.600"
      fontStyle="italic"
      mb={4}
      mt={4}
      pl={4}
      py={2}
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
      _dark={{ borderColor: 'gray.600' }}
      borderColor="gray.200"
      my={4}
      w="100%"
    />
  );
};

const MDXTable = (props: React.ComponentPropsWithoutRef<typeof Table.Root>) => (
  <Table.ScrollArea borderWidth="1px" maxW="l">
    <Table.Root
      _dark={{ bg: 'gray.800' }}
      bg="white"
      borderRadius="md"
      colorScheme="gray"
      shadow="sm"
      size="md"
      variant="outline"
      width="100%"
      {...props}
    />
  </Table.ScrollArea>
);

const TableHead = (props: any) => (
  <Table.Header _dark={{ bg: 'gray.700' }} bg="gray.50" {...props} />
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
      _dark={{ borderColor: 'gray.600' }}
      borderColor="gray.200"
      fontSize="sm"
      px={4}
      py={3}
      textAlign={textAlign}
      verticalAlign="top"
      {...rest}
    />
  );
};

const TableHeader = (props: any) => {
  const { style, ...rest } = props;
  const textAlign = style?.textAlign || props.align || 'left';

  return (
    <Table.ColumnHeader
      _dark={{
        color: 'gray.200',
        borderColor: 'gray.600',
      }}
      borderColor="gray.200"
      color="gray.700"
      fontSize="sm"
      fontWeight="semibold"
      px={4}
      py={3}
      textAlign={textAlign}
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
  p: (props: any) => <Text as="p" lineHeight="tall" mt={0} {...props} />,
  ul: (props: any) => <List.Root as="ul" ml={2} pl={4} pt={2} {...props} />,
  ol: (props: any) => <List.Root as="ol" ml={2} pl={4} pt={2} {...props} />,
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
