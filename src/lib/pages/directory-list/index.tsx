'use client';

import { Box, Grid, Heading, Input, Separator } from '@chakra-ui/react';
import { useState } from 'react';

import { Link } from '@/components/ui/link';
import { ContentGrid } from '@/lib/components/content-grid';
import type { IPosts } from '@/lib/types/custom-types';
import { siteConfig } from '@/site.config';

interface DirectoryListProps {
  items: Array<IPosts>;
}

export function DirectoryList({ items }: DirectoryListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const config = siteConfig.directory;
  const title = config?.plural || 'Directory Items';

  const filteredItems = items
    .filter((item) => {
      if (!searchQuery) {
        return true;
      }
      const query = searchQuery.toLowerCase();
      return (
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'date') {
        return (
          new Date(b.publishedAt || 0).getTime() -
          new Date(a.publishedAt || 0).getTime()
        );
      }
      return 0;
    });

  const renderCard = (item: IPosts) => (
    <Box
      p={4}
      mb={4}
      borderWidth="1px"
      borderRadius="md"
      _hover={{ shadow: 'md' }}
      transition="all 0.2s"
    >
      <Link href={`/directory/${item.slug}`}>
        <Heading size="md" mb={2}>
          {item.title}
        </Heading>
      </Link>
      {item.description && (
        <Box color="gray.600" _dark={{ color: 'gray.400' }} mb={2}>
          {item.description}
        </Box>
      )}
      {item.tags && item.tags.length > 0 && (
        <Box fontSize="sm" color="gray.500">
          Tags: {item.tags.join(', ')}
        </Box>
      )}
    </Box>
  );

  return (
    <Box>
      <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
        {title}
      </Heading>
      <Separator mb={4} />

      <Grid templateColumns={{ base: '1fr', md: '1fr 200px' }} gap={4} mb={6}>
        <Input
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <Box>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            <option value="title">Title</option>
            <option value="date">Date</option>
          </select>
        </Box>
      </Grid>

      <ContentGrid
        items={filteredItems}
        itemType="directory"
        renderCard={renderCard}
        showPagination={true}
        pageSize={10}
      />
    </Box>
  );
}
