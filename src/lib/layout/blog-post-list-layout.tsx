/* eslint-disable import/no-duplicates */

'use client';

import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Separator,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Link } from '@/components/ui/link';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import type { IPosts } from '@/lib/types/custom-types';
import { slugify } from '@/lib/utils/text-converter';

import { BlogPostCard } from './blog-post-card';

export function BlogPostListLayout({
  posts,
  tagSelected,
}: {
  posts: Array<IPosts>;
  tagSelected: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  const filteredBlogPosts = posts
    .filter((post: IPosts) => !post.draft)
    .filter(
      (post: IPosts) =>
        tagSelected === 'All' ||
        post.tags?.some((tag: string) => slugify(tag) === tagSelected)
    )
    .sort((a: IPosts, b: IPosts) =>
      a.modifiedAt && b.modifiedAt
        ? Number(new Date(b.modifiedAt)) - Number(new Date(a.modifiedAt))
        : 0
    );

  const postsPerPage = 5;
  // const totalPages = Math.ceil(filteredBlogPosts.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredBlogPosts.slice(startIndex, endIndex);

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
  const matchedTag =
    Object.keys(tagCounts).find(
      (tag: string) => tagSelected === slugify(tag)
    ) || tagSelected;

  if (!isClient) {
    return <div>Loading..</div>;
  }

  return (
    <Box>
      <Heading as="h1" letterSpacing="tight" mb={4} size="2xl">
        {matchedTag} ({filteredBlogPosts.length} posts)
      </Heading>
      <Box>
        <Separator />
        <Grid
          m="0 auto 4rem auto"
          p="2"
          templateAreas={`"nav main"`}
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
        >
          <GridItem
            area="nav"
            colSpan={1}
            display={{ base: 'none', md: 'block' }}
          >
            <Box
              color={tagSelected === 'All' ? 'orange' : 'inherit'}
              flexDirection="row"
              key="All"
            >
              <Link
                href="/blog"
                key="blog"
                pointerEvents={tagSelected === 'All' ? 'none' : 'auto'}
              >
                All
              </Link>
            </Box>
            <Box>
              {Object.keys(tagCounts).map((tag: string) => (
                <Box
                  color={tagSelected === slugify(tag) ? 'orange' : 'inherit'}
                  flexDirection="row"
                  key={tag}
                >
                  <Link
                    href={`/tags/${slugify(tag)}`}
                    key={tag}
                    pointerEvents={
                      tagSelected === slugify(tag) ? 'none' : 'auto'
                    }
                  >
                    {tag} ({tagCounts[tag]})
                  </Link>
                </Box>
              ))}
            </Box>
          </GridItem>
          <GridItem area="main" colSpan={{ base: 5, md: 4 }}>
            <Flex flexDirection="column" height="100%" px={4}>
              {!currentPosts.length && 'No posts found :('}
              {currentPosts.map((post: IPosts) => (
                <BlogPostCard key={post.title || ''} {...post} />
              ))}
            </Flex>
            <Center>
              {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              /> */}
              <PaginationRoot
                count={filteredBlogPosts.length}
                defaultPage={1}
                onPageChange={(e) => setCurrentPage(e.page)}
                pageSize={postsPerPage}
                variant="solid"
              >
                <HStack>
                  <PaginationPrevTrigger />
                  <PaginationItems />
                  <PaginationNextTrigger />
                </HStack>
              </PaginationRoot>
            </Center>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
