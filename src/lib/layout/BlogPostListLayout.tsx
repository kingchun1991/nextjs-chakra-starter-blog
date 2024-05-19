/* eslint-disable import/no-duplicates */

'use client';

import {
  Box,
  Divider,
  Flex,
  Heading,
  Grid,
  GridItem,
  Link,
  Center,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';

import Pagination from '../components/pagination';
import type { IPosts } from '../types/custom-types';
import { slugify } from '../utils/textConverter';

const Container = dynamic(() => import('~/lib/components/Container'));
const BlogPostCard = dynamic(() => import('~/lib/layout/BlogPostCard'));

export default function BlogPostListLayout({
  posts,
  tagSelected,
}: {
  posts: IPosts[];
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
        post.tags?.some((tag: string) =>
          tag
            .toLowerCase()
            .includes(tagSelected.replace(/-/g, ' ').toLowerCase())
        )
    )
    .sort((a: IPosts, b: IPosts) =>
      a.modifiedAt && b.modifiedAt
        ? Number(new Date(b.modifiedAt)) - Number(new Date(a.modifiedAt))
        : 0
    );

  const postsPerPage = 2;
  const totalPages = Math.ceil(filteredBlogPosts.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredBlogPosts.slice(startIndex, endIndex);

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
  const matchedTag =
    Object.keys(tagCounts).find(
      (tag: string) => tagSelected === slugify(tag)
    ) || tagSelected;

  if (!isClient) {
    return <div>Loading..</div>;
  }

  return (
    <Box>
      <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
        {matchedTag} ({filteredBlogPosts.length} posts)
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
          <GridItem
            area="nav"
            colSpan={1}
            display={{ base: 'none', md: 'block' }}
          >
            <Box
              key="All"
              flexDirection="row"
              color={tagSelected === 'All' ? 'orange' : 'inherit'}
            >
              <Link
                as={NextLink}
                key="blog"
                href="/blog"
                pointerEvents={tagSelected === 'All' ? 'none' : 'auto'}
              >
                All
              </Link>
            </Box>
            <Box>
              {Object.keys(tagCounts).map((tag: string) => (
                <Box
                  key={tag}
                  flexDirection="row"
                  color={tagSelected === slugify(tag) ? 'orange' : 'inherit'}
                >
                  <Link
                    as={NextLink}
                    key={tag}
                    href={`/tags/${slugify(tag)}`}
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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Center>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
