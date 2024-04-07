/* eslint-disable import/no-duplicates */

'use client';

import {
  Box,
  Divider,
  Flex,
  Heading,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

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
      <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
        Blog ({filteredBlogPosts.length} posts)
      </Heading>
      <Container>
        <Divider />
        <Grid
          templateAreas={`"nav main"`}
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          p="2"
          m="0 auto 4rem auto"
        >
          <GridItem area="nav" colSpan={{ base: 1, md: 0 }}>
            <Text size="md">All</Text>
            <Box>
              {Object.keys(tagCounts).map((tag: string) => (
                <Box key={tag} flexDirection="row">
                  <Text size="md">
                    {tag} ({tagCounts[tag]})
                  </Text>
                </Box>
              ))}
            </Box>
          </GridItem>
          <GridItem area="main" colSpan={{ base: 5, md: 4 }}>
            <Flex flexDirection="column" height="100%" px={4}>
              {!filteredBlogPosts.length && 'No posts found :('}
              {filteredBlogPosts.map((post: IPosts) => (
                <BlogPost key={post.title || ''} {...post} />
              ))}
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
