'use client';

import { Box, Input, Stack, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { InputGroup } from '@/components/ui/input-group';
import { Link } from '@/components/ui/link';
import { siteConfig } from '@/site.config';

interface SearchResult {
  id: string;
  url: string;
  title: string;
  excerpt: string;
  type?: string;
}

interface HybridSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HybridSearch({ isOpen, onClose }: HybridSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<SearchResult>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMethod, setSearchMethod] = useState<'pagefind' | 'fallback'>(
    'fallback',
  );
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Try to load Pagefind, fall back to JSON search if not available
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const tryPagefind = async () => {
      try {
        await import(/* webpackIgnore: true */ '/_pagefind/pagefind.js');
        setSearchMethod('pagefind');
      } catch {
        setSearchMethod('fallback');
      }
    };

    tryPagefind();
  }, [isOpen]);

  // Search function
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        if (searchMethod === 'pagefind') {
          // Use Pagefind if available
          const pagefind = await import(
            /* webpackIgnore: true */ '/_pagefind/pagefind.js'
          );
          const search = await pagefind.search(query);
          const data = await Promise.all(
            search.results
              .slice(0, siteConfig.search?.maxResults || 50)
              .map((r: unknown) =>
                (r as { data: () => Promise<unknown> }).data(),
              ),
          );
          setResults(
            data.map((item) => ({
              id: item.url,
              url: item.url,
              title: item.meta.title,
              excerpt: item.excerpt,
            })),
          );
        } else {
          // Fallback to search.json
          const response = await fetch('/.json/search.json');
          const searchData = await response.json();

          const regex = new RegExp(query.replace(/\\/g, ''), 'gi');
          const filtered = (
            searchData as Array<{
              slug: string;
              frontmatter: {
                title: string;
                summary?: string;
              };
              content: string;
            }>
          ).filter((item) => {
            return (
              regex.test(item.frontmatter.title) ||
              regex.test(item.frontmatter.summary || '') ||
              regex.test(item.content || '')
            );
          });

          setResults(
            filtered
              .slice(0, siteConfig.search?.maxResults || 50)
              .map((item) => ({
                id: item.slug,
                url: `/${item.slug}`,
                title: item.frontmatter.title,
                excerpt:
                  item.frontmatter.summary ||
                  item.content?.substring(0, 150) ||
                  '',
              })),
          );
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, siteConfig.search?.debounceMs || 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, searchMethod]);

  const handleLinkClick = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={({ open }) => !open && onClose()}>
      <DialogBackdrop />
      <DialogContent maxW="2xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <Stack gap={4}>
            <InputGroup>
              <Input
                placeholder="Search posts and directory items..."
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                autoFocus
              />
            </InputGroup>

            {isLoading && <Text color="gray.500">Searching...</Text>}

            {!isLoading && results.length === 0 && query && (
              <Text color="gray.500">No results found for "{query}"</Text>
            )}

            {results.length > 0 && (
              <Stack gap={2} maxH="400px" overflowY="auto">
                {results.map((result) => (
                  <Box
                    key={result.id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    _hover={{ bg: 'gray.50', _dark: { bg: 'gray.800' } }}
                    cursor="pointer"
                  >
                    <Link
                      href={result.url}
                      onClick={handleLinkClick}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Text fontWeight="bold" mb={1}>
                        {result.title}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: 'gray.400' }}
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </Link>
                  </Box>
                ))}
              </Stack>
            )}
          </Stack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
