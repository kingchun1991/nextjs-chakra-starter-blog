'use client';

import { IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

import { PagefindSearch } from './pagefind-search';

export function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label="Search"
        onClick={() => setIsOpen(true)}
        bg="transparent"
        color="gray.600"
        _dark={{ color: 'gray.400' }}
      >
        <LuSearch />
      </IconButton>
      <PagefindSearch isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
