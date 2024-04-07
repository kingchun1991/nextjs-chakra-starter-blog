/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

import searchData from '~/../.json/search.json' assert { type: 'json' };

import SearchResult, { type ISearchItem } from './SearchResult';

const SearchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      <IconButton
        variant="ghost"
        aria-label="Toggle Search"
        icon={<RiSearchLine />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <Input
                placeholder="Search..."
                value={searchString}
                onChange={handleSearch}
                autoFocus
                autoComplete="off"
              />
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
            </InputGroup>
            <SearchResult
              searchResult={searchResult}
              searchString={searchString}
            />
          </ModalBody>

          <ModalFooter>
            <Flex align="center" justify="space-between">
              {/* <Box>
                <Kbd>
                  <svg
                    width="14"
                    height="14"
                    fill="currentcolor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 011.506.0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 01-.753-1.659z" />
                  </svg>
                </Kbd>
              </Box>
              <Box>
                <Kbd>
                  <svg
                    width="14"
                    height="14"
                    fill="currentcolor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 001.506.0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 00-.753 1.659z" />
                  </svg>
                </Kbd>
                to navigate
              </Box>
              <Box>
                <Kbd>
                  <svg
                    width="12"
                    height="12"
                    fill="currentcolor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.5 1.5a.5.5.0 01.5.5v4.8a2.5 2.5.0 01-2.5 2.5H2.707l3.347 3.346a.5.5.0 01-.708.708l-4.2-4.2a.5.5.0 010-.708l4-4a.5.5.0 11.708.708L2.707 8.3H12.5A1.5 1.5.0 0014 6.8V2a.5.5.0 01.5-.5z"
                    />
                  </svg>
                </Kbd>
                to select
              </Box> */}
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
