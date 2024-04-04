/* eslint-disable import/no-duplicates */

'use client';

import { Flex, Stack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import Hero from '../components/Hero';
import type { IPosts } from '../types/custom-types';

const Container = dynamic(() => import('~/lib/components/Container'));
const BlogPost = dynamic(() => import('~/lib/layout/BlogPost'));

export default function BlogPostLayout({ posts }: { posts: IPosts[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  const filteredBlogPosts = posts
    .filter((post: IPosts) => !post.draft)
    .sort((a: IPosts, b: IPosts) =>
      a.publishedAt && b.publishedAt
        ? Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        : 0
    );

  if (!isClient) {
    return <div>Loading..</div>;
  }

  return (
    <Container>
      <Flex
        as="main"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m="0 auto 4rem auto"
        maxWidth="auto"
      >
        <Hero title="Blog" />
        <Stack
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          maxWidth="auto"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="auto"
            height="100%"
            px={4}
          >
            {!filteredBlogPosts.length && 'No posts found :('}
            {filteredBlogPosts.map((post: IPosts) => (
              <BlogPost key={post.title || ''} {...post} />
            ))}
          </Flex>
        </Stack>
      </Flex>
    </Container>
  );
}
