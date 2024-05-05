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
  Divider,
  useColorMode,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

import ProductSimple from './MDXComponents/Card';
import { CodeBlock } from './MDXComponents/CodeBlock';
import { CustomAlert } from './MDXComponents/CustomAlert';
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
  const { colorMode } = useColorMode();
  const color = {
    light: 'blue.500',
    dark: 'blue.500',
  };

  // const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color={color[colorMode]} {...props} />
      </NextLink>
    );
  }

  return <Link color={color[colorMode]} isExternal {...props} />;
};

const Quote = (props: any) => {
  useColorMode();

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

const CustomCallout = (props: any) => {
  return (
    <Alert status="success" {...props}>
      <Box as="span" mr="2">
        {props.icon}
      </Box>
      {props.children}
    </Alert>
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
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray.200',
    dark: 'gray.600',
  };

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
};

const MDXTable = (props: any) => <Table {...props} />;
const TableHead = (props: any) => <Thead {...props} />;
const TableRow = (props: any) => <Tr {...props} />;
const TableData = (props: any) => <Td {...props} />;
const TableHeader = (props: any) => <Th {...props} />;
const TableBody = (props: any) => <Tbody {...props} />;

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
  ul: (props: any) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props: any) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
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
  CustomCallout,
  ProductCard: (props: any) => ProductCard(props),
  TableOfContents,
  CustomAlert,
};

export { CustomLink };

export default MDXComponents;
