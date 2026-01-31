/* eslint-disable import/no-duplicates */

'use client';

import { Box, Flex, Heading, Separator, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Link } from '@/components/ui/link';
import type { IPosts } from '@/lib/types/custom-types';
import { slugify } from '@/lib/utils/text-converter';

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
        : 0
    );

  const tagCounts: { [key: string]: number } = {};
  for (const post of filteredBlogPosts) {
    if (post?.tags) {
      for (const tag of post.tags) {
        if (tagCounts[tag]) {
          tagCounts[tag] += 1;
        } else {
          tagCounts[tag] = 1;
        }
      }
    }
  }

  if (!isClient) {
    return <div>Loading..</div>;
  }

  return (
    <Box>
      {/* <Hero title="Blog" /> */}
      <Heading as="h1" letterSpacing="tight" mb={4} size="2xl">
        Tags
      </Heading>

      <Separator />
      <Flex
        alignItems="center"
        as="main"
        flexDirection="column"
        justifyContent="center"
        m="0 auto 4rem auto"
        maxWidth="auto"
        p="2"
      >
        <Stack
          alignItems="flex-start"
          gap={8}
          justifyContent="center"
          maxWidth="auto"
        >
          <Flex
            alignItems="flex-start"
            flexDirection="column"
            height="100%"
            justifyContent="flex-start"
            maxWidth="auto"
            px={4}
          >
            {Object.entries(tagCounts).map(([tag, count]) => (
              <Link href={`/tags/${slugify(tag)}`} key={tag}>
                {tag} ({count})
              </Link>
            ))}
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
}
