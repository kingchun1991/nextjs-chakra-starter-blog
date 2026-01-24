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
import { useState } from 'react';

import { Link } from '@/components/ui/link';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import type { IPosts } from '@/lib/types/custom-types';
import { slugify } from '@/lib/utils/textConverter';

interface ContentGridProps {
  items: Array<IPosts>;
  itemType: 'blog' | 'directory';
  columns?: number;
  showLoadMore?: boolean;
  pageSize?: number;
  showSidebar?: boolean;
  showPagination?: boolean;
  tagSelected?: string;
  renderCard: (item: IPosts) => React.ReactNode;
}

export function ContentGrid({
  items,
  renderCard,
  pageSize = 5,
  showSidebar = false,
  showPagination = false,
  tagSelected = 'All',
}: ContentGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = items
    .filter((item: IPosts) => !item.draft)
    .filter(
      (item: IPosts) =>
        tagSelected === 'All' ||
        item.tags?.some((tag: string) =>
          tag
            .toLowerCase()
            .includes(tagSelected.replace(/-/g, ' ').toLowerCase()),
        ),
    )
    .sort((a: IPosts, b: IPosts) =>
      a.modifiedAt && b.modifiedAt
        ? Number(new Date(b.modifiedAt)) - Number(new Date(a.modifiedAt))
        : 0,
    );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = showPagination
    ? filteredItems.slice(startIndex, endIndex)
    : filteredItems;

  const tagCounts: { [key: string]: number } = {};
  filteredItems.forEach((item: IPosts) => {
    item?.tags?.forEach((tag: string) => {
      if (tagCounts[tag]) {
        tagCounts[tag] += 1;
      } else {
        tagCounts[tag] = 1;
      }
    });
  });

  const matchedTag =
    Object.keys(tagCounts).find(
      (tag: string) => tagSelected === slugify(tag),
    ) || tagSelected;

  return (
    <Box>
      {tagSelected !== 'All' && (
        <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
          {matchedTag} ({filteredItems.length} posts)
        </Heading>
      )}
      <Box>
        {showSidebar && <Separator />}
        <Grid
          templateAreas={`"nav main"`}
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          p="2"
          m="0 auto 4rem auto"
        >
          {showSidebar && (
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
          )}
          <GridItem area="main" colSpan={{ base: 5, md: showSidebar ? 4 : 5 }}>
            <Flex flexDirection="column" height="100%" px={4}>
              {!currentItems.length && 'No posts found :('}
              {currentItems.map((item: IPosts) => (
                <Box key={item.slug || item.title}>{renderCard(item)}</Box>
              ))}
            </Flex>
            {showPagination && (
              <Center>
                <PaginationRoot
                  count={filteredItems.length}
                  onPageChange={(e) => setCurrentPage(e.page)}
                  pageSize={pageSize}
                  defaultPage={1}
                  variant="solid"
                >
                  <HStack>
                    <PaginationPrevTrigger />
                    <PaginationItems />
                    <PaginationNextTrigger />
                  </HStack>
                </PaginationRoot>
              </Center>
            )}
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
