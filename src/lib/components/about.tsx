'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Flex, Stack, Avatar, Divider, Box } from '@chakra-ui/react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import type { IPosts } from '../types/custom-types';
import MDXComponents from '~/lib/components/MDXComponents';

import Container from './Container';

export default function AboutLayout({
  mdxSource,
  post,
}: {
  mdxSource: MDXRemoteSerializeResult;
  post: IPosts;
}) {
  // const { colorMode } = useColorMode();
  // const textColor = {
  //   light: 'gray.700',
  //   dark: 'gray.400',
  // };
  // const similarPosts = similerItems(post, posts, post.slug!);
  return (
    <Box>
      <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
        About
      </Heading>
      <Divider />

      <Container>
        <Stack
          as="article"
          spacing={8}
          justifyContent="center"
          alignItems="left"
          m="0 auto 4rem auto"
          w="100%"
          px={2}
        >
          <Flex align="left" justifyContent="left">
            <Avatar size="2xl" name={post.author} src={post.image} mr={2} />
          </Flex>
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            {post.title}
          </Heading>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </Stack>
      </Container>
    </Box>
  );
}
