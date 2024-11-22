/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { Box, Flex, IconButton, Input, Kbd, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

import searchData from '../../../.json/search.json' assert { type: 'json' };
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

import SearchResult, { type ISearchItem } from './SearchResult';

const SearchModal = () => {
  const [searchString, setSearchString] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchString(e.currentTarget.value.replace('\\', '').toLowerCase());
  };

  const doSearch = (searchData: ISearchItem[]) => {
    const regex = new RegExp(`${searchString}`, 'gi');
    if (searchString === '') {
      return [];
    }
    return searchData.filter((item) => {
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
  const searchResult = doSearch(searchData);
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);

  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <IconButton variant="ghost" aria-label="Toggle Search">
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
              placeholder="Search..."
              value={searchString}
              onChange={handleSearch}
              autoFocus
              autoComplete="off"
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
            {searchString && (
              <Box>
                <strong>{searchResult.length} </strong> results - in{' '}
                <strong>{totalTime} </strong> seconds
              </Box>
            )}
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
};

export default SearchModal;
