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

const DocsHeading = (props: any) => (
  <Heading
    css={{
      scrollMarginTop: '100px',
      scrollSnapMargin: '100px', // Safari
      '&[id]': {
        pointerEvents: 'none',
      },
      '&[id]:before': {
        display: 'block',
        height: ' 6rem',
        marginTop: '-6rem',
        visibility: 'hidden',
        content: `""`,
      },
      '&[id]:hover a': { opacity: 1 },
    }}
    {...props}
    mb="1em"
    mt="2em"
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <Box
          aria-label="anchor"
          as="a"
          color="blue.500"
          fontWeight="normal"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: 'outline',
          }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </Box>
      )}
    </Box>
  </Heading>
);

const Hr = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: 'gray.200',
    dark: 'gray.600',
  };

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
};

const PreformattedCode = (props: any) => {
  return (
    <pre style={{ overflowX: 'scroll' }}>
      <Code {...props} />
    </pre>
  );
};

const MDXTable = (props: any) => <Table {...props} />;
const TableHead = (props: any) => <Thead {...props} />;
const TableRow = (props: any) => <Tr {...props} />;
const TableData = (props: any) => <Td {...props} />;
const TableHeader = (props: any) => <Th {...props} />;
const TableBody = (props: any) => <Tbody {...props} />;

const MDXComponents = {
  h1: (props: any) => <Heading as="h1" size="xl" my={4} {...props} />,
  h2: (props: any) => (
    <DocsHeading as="h2" size="lg" fontWeight="bold" {...props} />
  ),
  h3: (props: any) => (
    <DocsHeading as="h3" size="md" fontWeight="bold" {...props} />
  ),
  h4: (props: any) => (
    <DocsHeading as="h4" size="sm" fontWeight="bold" {...props} />
  ),
  h5: (props: any) => (
    <DocsHeading as="h5" size="sm" fontWeight="bold" {...props} />
  ),
  h6: (props: any) => (
    <DocsHeading as="h6" size="xs" fontWeight="bold" {...props} />
  ),
  inlineCode: (props: any) => (
    <Code colorScheme="yellow" fontSize="0.84em" {...props} />
  ),
  br: (props: any) => <Box height="24px" {...props} />,
  p: (props: any) => <Text as="p" mt={0} lineHeight="tall" {...props} />,
  ul: (props: any) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props: any) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props: any) => <Box as="li" pb={1} {...props} />,
  blockquote: Quote,
  image: CustomImage,
  hr: Hr,
  a: CustomLink,
  pre: PreformattedCode,
  table: MDXTable,
  th: TableHead,
  tr: TableRow,
  td: TableData,
  thead: TableHeader,
  tbody: TableBody,
  CustomCallout,
};

export { CustomLink };

export default MDXComponents;
