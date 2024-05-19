/* eslint-disable import/no-duplicates */

'use client';

import { Box, Divider, Flex, Heading, Stack, Link } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';

// import Hero from '../components/Hero';
import type { IPosts } from '../types/custom-types';
import { slugify } from '../utils/textConverter';

const Container = dynamic(() => import('~/lib/components/Container'));

export default function TagsLayout({ posts }: { posts: IPosts[] }) {
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

  const tagCounts: { [key: string]: number } = {};
  filteredBlogPosts.forEach((post: IPosts) => {
    post?.tags?.forEach((tag: string) => {
      if (tagCounts[tag]) {
        tagCounts[tag] += 1;
      } else {
        tagCounts[tag] = 1;
      }
    });
  });

  if (!isClient) {
    return <div>Loading..</div>;
  }

  return (
    <Box>
      {/* <Hero title="Blog" /> */}
      <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
        Tags
      </Heading>
      <Container>
        <Divider />
        <Flex
          as="main"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p="2"
          m="0 auto 4rem auto"
          maxWidth="auto"
        >
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
              {Object.entries(tagCounts).map(([tag, count]) => (
                <Link as={NextLink} key={tag} href={`/tags/${slugify(tag)}`}>
                  {tag} ({count})
                </Link>
              ))}
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
