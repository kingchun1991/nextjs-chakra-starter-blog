'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Flex, Stack, Avatar } from '@chakra-ui/react';
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
    <Container>
      <Stack
        as="article"
        spacing={8}
        justifyContent="center"
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
          <Flex
            justify="space-between"
            align={['initial', 'center']}
            direction={['column', 'row']}
            mt={2}
            w="100%"
            mb={4}
          >
            <Flex align="center">
              <Avatar size="2xl" name={post.author} src={post.image} mr={2} />
            </Flex>
          </Flex>
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            {post.title}
          </Heading>
        </Flex>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </Stack>
    </Container>
  );
}
