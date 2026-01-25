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

interface PagefindResult {
  id: string;
  url: string;
  excerpt: string;
  meta: {
    title: string;
  };
  sub_results?: Array<{
    title: string;
    url: string;
    excerpt: string;
  }>;
}

interface PagefindSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PagefindSearch({ isOpen, onClose }: PagefindSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<PagefindResult>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagefind, setPagefind] = useState<any>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const loadPagefind = async () => {
      if (typeof window !== 'undefined' && !pagefind) {
        try {
          const pf = await import(
            /* webpackIgnore: true */ '/_pagefind/pagefind.js'
          );
          setPagefind(pf);
        } catch (error) {
          console.error('Failed to load Pagefind:', error);
        }
      }
    };

    if (isOpen) {
      loadPagefind();
    }
  }, [isOpen, pagefind]);

  useEffect(() => {
    if (!(query && pagefind)) {
      setResults([]);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const search = await pagefind.search(query);
        const resultsData = await Promise.all(
          search.results
            .slice(0, siteConfig.search?.maxResults || 50)
            .map((r: any) => r.data()),
        );
        setResults(resultsData);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, siteConfig.search?.debounceMs || 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, pagefind]);

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
                        {result.meta.title}
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
