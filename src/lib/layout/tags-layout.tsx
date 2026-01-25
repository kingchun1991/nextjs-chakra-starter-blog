/* eslint-disable import/no-duplicates */

'use client';

import { Box, Flex, Heading, Separator, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Link } from '@/components/ui/link';
import type { IPosts } from '@/lib/types/custom-types';
import { slugify } from '@/lib/utils/textConverter';

export function TagsLayout({ posts }: { posts: Array<IPosts> }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  const filteredBlogPosts = posts
    .filter((post: IPosts) => !post.draft)
    .sort((a: IPosts, b: IPosts) =>
      a.publishedAt && b.publishedAt
        ? Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        : 0,
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

      <Separator />
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
          gap={8}
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
              <Link key={tag} href={`/tags/${slugify(tag)}`}>
                {tag} ({count})
              </Link>
            ))}
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
}
