/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */

'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Code,
  Heading,
  Link,
  Text,
  Separator,
  Table,
  List,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

import { Alert } from '@/components/ui/alert';

import ProductSimple from './MDXComponents/Card';
import { CodeBlock } from './MDXComponents/CodeBlock';
import { TableOfContents } from './MDXComponents/TableOfContents';

const ProductCard = (props: any) => {
  const { imgsrc, title, price, url } = props;
  return (
    <ProductSimple imgsrc={imgsrc} title={title} price={price} url={url} />
  );
};

const CustomImage = (props: any) => {
  const { width, height, src, alt } = props;
  return <Image width={width} height={height} src={src} alt={alt} />;
};

const CustomLink = (props: any) => {
  const { href } = props;

  // const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color="blue.500" _dark={{ color: 'blue.500' }} {...props} />
      </NextLink>
    );
  }

  return (
    <Link
      color="blue.500"
      _dark={{ color: 'blue.500' }}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
};

const Quote = (props: any) => {
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
type CustomHeadingProps = {
  as: React.ElementType;
  id?: string; // Make id optional since it's not always required
  [key: string]: any; // This allows for any other props
};

const CustomHeading: React.FC<CustomHeadingProps> = ({ as, id, ...props }) => {
  if (id) {
    return (
      <Link href={`#${id}`}>
        <NextLink href={`#${id}`}>
          <Heading
            as={as}
            display="inline"
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
        </NextLink>
      </Link>
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

const MDXTable = (props: any) => <Table.Root {...props} />;
const TableHead = (props: any) => <Table.Header {...props} />;
const TableRow = (props: any) => <Table.Row {...props} />;
const TableData = (props: any) => <Table.Cell {...props} />;
const TableHeader = (props: any) => <Table.Header {...props} />;
const TableBody = (props: any) => <Table.Body {...props} />;

const MDXComponents = {
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
    return <CodeBlock {...props} />;
  },
  table: MDXTable,
  th: TableHead,
  tr: TableRow,
  td: TableData,
  thead: TableHeader,
  tbody: TableBody,
  Alert,
  ProductCard: (props: any) => ProductCard(props),
  TableOfContents,
};

export { CustomLink };

export default MDXComponents;
