'use client';

import { Box, Heading, HStack, Separator, Stack, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useState } from 'react';

import { Tag } from '@/components/ui/tag';
import { Backlinks } from '@/lib/components/directory/backlinks';
import { WikiLink } from '@/lib/components/directory/wiki-link';
import { MDXComponents } from '@/lib/components/mdx-components';
import type { IPosts } from '@/lib/types/custom-types';

interface DirectoryItemProps {
  item: IPosts;
  mdxSource: MDXRemoteSerializeResult;
}

export function DirectoryItem({ item, mdxSource }: DirectoryItemProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dateFormat = 'dd MMM, yyyy';
  const parseDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), dateFormat);
    } catch {
      return '';
    }
  };

  const enhancedComponents = {
    ...MDXComponents,
    WikiLink,
  };

  return (
    <Box>
      <Heading as="h1" letterSpacing="tight" mb={2} size="2xl">
        {item.title}
      </Heading>

      {item.publishedAt && (
        <Text
          _dark={{ color: 'gray.400' }}
          color="gray.600"
          fontSize="sm"
          mb={2}
        >
          Published: {parseDate(item.publishedAt)}
        </Text>
      )}

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

      <Stack gap={4}>
        {mounted && (
          <MDXRemote {...mdxSource} components={enhancedComponents} />
        )}
        {!mounted && (
          <Box color="gray.500" p={4}>
            Loading content...
          </Box>
        )}
      </Stack>

      {item.slug && <Backlinks slug={item.slug} />}
    </Box>
  );
}
