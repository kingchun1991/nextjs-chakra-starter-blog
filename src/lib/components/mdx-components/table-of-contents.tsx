'use client';

/* eslint-disable react/prop-types */

import { Box, Button, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { LuBookmark, LuChevronDown } from 'react-icons/lu';

type TableOfContentsProps = {
  children: React.ReactNode;
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);

  return (
    <Box bg="slate.300" mt={8} rounded="md" w="full">
      <Button
        _dark={{ bg: 'slate.600', color: 'slate.200' }}
        alignItems="center"
        aria-expanded={open}
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
        <Icon
          transform={open ? 'rotate(180deg)' : undefined}
          transition="transform 0.3s ease-in-out"
        >
          <LuChevronDown />
        </Icon>
      </Button>
      {open ? (
        <Box p={2} pr={6}>
          {children}
        </Box>
      ) : null}
    </Box>
  );
};
