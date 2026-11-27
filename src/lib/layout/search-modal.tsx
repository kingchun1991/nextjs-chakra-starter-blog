'use client';

/* eslint-disable import/no-extraneous-dependencies */
import { Box, Flex, IconButton, Input, Kbd, Spacer } from '@chakra-ui/react';
import { useLocale } from 'next-intl';
import { useCallback, useState } from 'react';
import { LuSearch } from 'react-icons/lu';

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InputGroup } from '@/components/ui/input-group';

import searchData from '../../../.json/search.json';
import type { ISearchItem } from './search-result';
import { SearchResult } from './search-result';

// Characters with special meaning in a RegExp, escaped so the search matches
// the typed text literally (and input like `(` or `[` cannot throw).
const REGEX_SPECIAL_CHARACTERS = /[.*+?^${}()|[\]\\]/gu;

export function SearchModal() {
  const [searchString, setSearchString] = useState('');
  const activeLocale = useLocale();

  const handleSearch = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setSearchString(e.currentTarget.value.replace('\\', '').toLowerCase());
  }, []);

  const doSearch = (items: Array<ISearchItem>) => {
    if (searchString === '') {
      return [];
    }
    const regex = new RegExp(
      searchString.replace(REGEX_SPECIAL_CHARACTERS, '\\$&'),
      'giu'
    );
    return items.filter((item) => {
      const title = item.frontmatter.title.toLowerCase().match(regex);
      const description = item.frontmatter.description
        ?.toLowerCase()
        .match(regex);
      const categories = item.frontmatter.categories
        ?.join(' ')
        .toLowerCase()
        .match(regex);
      const tags = item.frontmatter.tags?.join(' ').toLowerCase().match(regex);
      const content = item.content.toLowerCase().match(regex);
      return title || content || description || categories || tags;
    });
  };

  // get search result
  const startTime = performance.now();

  // Filter by locale derived from next-intl context.
  const allSearchData = (searchData as Array<ISearchItem>) || [];
  const localeSearchData = allSearchData.filter(
    (item) => item.locale === activeLocale
  );

  const searchResult = doSearch(localeSearchData);
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);

  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <IconButton aria-label="Toggle Search" variant="ghost">
          <LuSearch />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <InputGroup flex="1" startElement={<LuSearch />} width="100%">
            <Input
              autoComplete="off"
              autoFocus
              onChange={handleSearch}
              placeholder="Search..."
              value={searchString}
              width="100%"
            />
          </InputGroup>
          <SearchResult
            searchResult={searchResult}
            searchString={searchString}
          />
        </DialogBody>

        <DialogFooter>
          <Flex align="center" justify="space-between">
            {searchString ? (
              <Box>
                <strong>{searchResult.length} </strong> results - in{' '}
                <strong>{totalTime} </strong> seconds
              </Box>
            ) : null}
            <Spacer />
            <Box>
              <Kbd>ESC</Kbd> to close
            </Box>
          </Flex>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

// export default SearchModal;
