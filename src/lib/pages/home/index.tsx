import { Box, Flex, Heading, Separator, Text } from '@chakra-ui/react';

import { Link } from '@/components/ui/link';
import { LatestBlogPostListLayout } from '@/lib/layout/latest-blog-post-list-layout';
import type { IPosts } from '@/lib/types/custom-types';

export function Home({ posts }: { posts: Array<IPosts> }) {
  return (
    <Box>
      <Heading as="h1" letterSpacing="tight" mb={4} size="3xl">
        Latest
      </Heading>
      <Text fontSize="l">A blog created with Next.js and Chakra UI</Text>
      <Separator />
      <Flex
        alignItems="center"
        direction="column"
        gap={4}
        justifyContent="center"
        mb={8}
        minHeight="70vh"
        w="full"
      >
        <LatestBlogPostListLayout posts={posts} />
        <Link href="/blog" ml="auto">
          <Text color="teal.500" fontSize="sm" p="2">
            All Posts &rarr;
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}
