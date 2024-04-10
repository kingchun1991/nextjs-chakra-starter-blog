import { Box, Divider, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import SomeImage from '~/lib/components/samples/SomeImage';
import LatestBlogPostListLayout from '~/lib/layout/LatestBlogPostListLayout';
import type { IPosts } from '~/lib/types/custom-types';

const Home = ({ posts }: { posts: IPosts[] }) => {
  return (
    <Box>
      <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
        Latest
      </Heading>
      <Text fontSize="s">A blog created with Next.js and Chakra UI</Text>
      <SomeImage />
      <Divider />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        gap={4}
        mb={8}
        w="full"
      >
        <LatestBlogPostListLayout posts={posts} />
        <Link as={NextLink} href="/blog" ml="auto">
          <Text color="teal.500" fontSize="sm" align="right" p="2">
            All Posts &rarr;
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Home;
