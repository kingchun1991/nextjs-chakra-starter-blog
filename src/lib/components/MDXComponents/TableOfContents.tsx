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
    <Box mt={8} w="full" rounded="md" bg="slate.300">
      <Button
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={5}
        fontWeight="bold"
        rounded="md"
        bg="slate.300"
        color="slate.700"
        _dark={{ bg: 'slate.600', color: 'slate.200' }}
        onClick={onToggle}
        aria-label="Toggle Table of Contents"
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
