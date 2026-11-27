'use client';

import { Box, Heading, HStack, Separator, Stack, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import type { ReactNode } from 'react';

import { Tag } from '@/components/ui/tag';
import { Backlinks } from '@/lib/components/directory/backlinks';
import type { IPosts } from '@/lib/types/custom-types';

interface DirectoryItemProps {
  children: ReactNode;
  item: IPosts;
}

export function DirectoryItem({ children, item }: DirectoryItemProps) {
  const dateFormat = 'dd MMM, yyyy';
  const parseDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), dateFormat);
    } catch {
      return '';
    }
  };

  return (
    <Box>
      <Heading as="h1" letterSpacing="tight" mb={2} size="2xl">
        {item.title}
      </Heading>

      {item.publishedAt ? (
        <Text
          _dark={{ color: 'gray.400' }}
          color="gray.600"
          fontSize="sm"
          mb={2}
        >
          Published: {parseDate(item.publishedAt)}
        </Text>
      ) : null}

      {item.tags && item.tags.length > 0 && (
        <HStack mb={4} wrap="wrap">
          {item.tags.map((tag) => (
            <Tag colorPalette="teal" key={tag} variant="solid">
              {tag}
            </Tag>
          ))}
        </HStack>
      )}

      <Separator mb={6} />

      <Stack gap={4}>{children}</Stack>

      {item.slug ? <Backlinks slug={item.slug} /> : null}
    </Box>
  );
}
