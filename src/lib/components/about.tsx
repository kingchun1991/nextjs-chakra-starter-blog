'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Flex, Stack, Avatar, Separator, Box } from '@chakra-ui/react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import MDXComponents from '@/lib/components/MDXComponents';
import type { IPosts } from '@/lib/types/custom-types';

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
      <Separator />

      <Box>
        <Stack
          as="article"
          gap={8}
          justifyContent="center"
          alignItems="left"
          m="0 auto 4rem auto"
          w="100%"
          px={2}
        >
          <Flex align="center" justifyContent="center">
            <Avatar.Root size="2xl">
              <Avatar.Image src={post.image} />
              <Avatar.Fallback>{post.author}</Avatar.Fallback>
            </Avatar.Root>
          </Flex>
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            {post.title}
          </Heading>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </Stack>
      </Box>
    </Box>
  );
}
