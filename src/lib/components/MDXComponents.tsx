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
} from '@chakra-ui/react';
// import { jsx } from "@emotion/react";
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
      {
        // eslint-disable-next-line
        props.children
      }
      {
        // eslint-disable-next-line
        props.id && (
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
            // eslint-disable-next-line
            href={`#${props.id}`}
          >
            #
          </Box>
        )
      }
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
  // eslint-disable-next-line
  h1: (props: any) => <Heading as="h1" size="xl" my={4} {...props} />,
  // eslint-disable-next-line
  h2: (props: any) => (
    <DocsHeading as="h2" size="lg" fontWeight="bold" {...props} />
  ),
  // eslint-disable-next-line
  h3: (props: any) => (
    <DocsHeading as="h3" size="md" fontWeight="bold" {...props} />
  ),
  // eslint-disable-next-line
  h4: (props: any) => (
    <DocsHeading as="h4" size="sm" fontWeight="bold" {...props} />
  ),
  // eslint-disable-next-line
  h5: (props: any) => (
    <DocsHeading as="h5" size="sm" fontWeight="bold" {...props} />
  ),
  // eslint-disable-next-line
  h6: (props: any) => (
    <DocsHeading as="h6" size="xs" fontWeight="bold" {...props} />
  ),
  // eslint-disable-next-line
  inlineCode: (props: any) => (
    <Code colorScheme="yellow" fontSize="0.84em" {...props} />
  ),
  // eslint-disable-next-line
  br: (props: any) => <Box height="24px" {...props} />,
  // eslint-disable-next-line
  p: (props: any) => <Text as="p" mt={0} lineHeight="tall" {...props} />,
  // eslint-disable-next-line
  ul: (props: any) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  // eslint-disable-next-line
  ol: (props: any) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  // eslint-disable-next-line
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
};

export { CustomLink };

export default MDXComponents;
