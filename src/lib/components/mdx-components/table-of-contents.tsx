/* eslint-disable react/prop-types */

import { Box, Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { LuBookmark, LuChevronDown } from 'react-icons/lu';

type TableOfContentsProps = {
  children: React.ReactNode;
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  children,
}) => {
  const { open, onToggle } = useDisclosure();

  return (
    <Box bg="slate.300" mt={8} rounded="md" w="full">
      <Button
        _dark={{ bg: 'slate.600', color: 'slate.200' }}
        alignItems="center"
        aria-label="Toggle Table of Contents"
        bg="slate.300"
        color="slate.700"
        display="flex"
        fontWeight="bold"
        justifyContent="space-between"
        onClick={onToggle}
        p={5}
        rounded="md"
        variant="plain"
      >
        <LuBookmark />
        <span style={{ marginRight: 6 }}>Table of Contents</span>
        <IconButton
          aria-label="Toggle"
          transform={open ? 'rotate(180deg)' : ''}
          transition="transform 0.3s ease-in-out"
          variant="plain"
        >
          <LuChevronDown />
        </IconButton>
      </Button>
      {open && (
        <Box p={2} pr={6}>
          {children}
        </Box>
      )}
    </Box>
  );
};
