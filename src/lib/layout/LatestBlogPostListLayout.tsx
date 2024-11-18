/* eslint-disable import/no-duplicates */

'use client';

import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import type { IPosts } from '@/lib/types/custom-types';

const BlogPostCard = dynamic(() => import('@/lib/layout/BlogPostCard'));

export default function BlogPostListLayout({ posts }: { posts: IPosts[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  const filteredBlogPosts = posts
    .filter((post: IPosts) => !post.draft)
    .sort((a: IPosts, b: IPosts) =>
      a.modifiedAt && b.modifiedAt
        ? Number(new Date(b.modifiedAt)) - Number(new Date(a.modifiedAt))
        : 0
    )
    .slice(0, 5);

  if (!isClient) {
    return <div>Loading..</div>;
  }

  return (
    <Box>
      <Grid templateAreas={`"nav main"`} p="2" m="0 auto 4rem auto">
        <GridItem area="main" colSpan={5}>
          <Flex flexDirection="column" height="100%" px={4}>
            {!filteredBlogPosts.length && 'No posts found :('}
            {filteredBlogPosts.map((post: IPosts) => (
              <BlogPostCard key={post.title || ''} {...post} />
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}
