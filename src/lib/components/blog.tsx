'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useColorMode,
  Heading,
  Flex,
  Stack,
  Avatar,
  Box,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import type { IPosts } from '../types/custom-types';
import MDXComponents from '~/lib/components/MDXComponents';
// import { useRouter } from "next/router";

// import type { IPosts } from '../types/custom-types';

import Container from './Container';

export default function BlogLayout({
  mdxSource,
  post,
}: {
  mdxSource: MDXRemoteSerializeResult;
  post: IPosts;
}) {
  const { colorMode } = useColorMode();
  const textColor = {
    light: 'gray.700',
    dark: 'gray.400',
  };
  const dateFormat = 'MMMM dd, yyyy';
  const parseDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), dateFormat);
    } catch (error) {
      return '';
    }
  };
  return (
    <Container>
      <Stack
        as="article"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="900px"
        w="100%"
        px={2}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="900px"
          w="100%"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            {post.title}
          </Heading>
          <Flex
            justify="space-between"
            align={['initial', 'center']}
            direction={['column', 'row']}
            mt={2}
            w="100%"
            mb={4}
          >
            <Flex align="center">
              <Avatar
                size="xs"
                name="Frank"
                src="../images/portrait.jpeg"
                mr={2}
              />
              <Box fontSize="sm" color={textColor[colorMode]}>
                {'Frank / '}
                {parseDate(post.publishedAt)}
              </Box>
            </Flex>
            {/* <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
              {post.metaInformation.readingTime}
            </Text> */}
          </Flex>
        </Flex>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </Stack>
    </Container>
  );
}
