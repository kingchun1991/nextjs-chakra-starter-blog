'use client';

import { Box, Flex } from '@chakra-ui/react';

import HelperImage from './HelperImage';

const SomeImage = () => {
  return (
    <Flex gap={2} justifyContent="left" alignItems="left" p="2">
      <Box display={{ base: 'none', _dark: 'block' }}>
        <HelperImage src="/nextjs-icon-dark.svg" label="NextJS" />
      </Box>
      <Box display={{ base: 'block', _dark: 'none' }}>
        <HelperImage src="/nextjs-icon-light.svg" label="NextJS" />
      </Box>
      <HelperImage src="/chakra-ui-logomark-colored.svg" label="Chakra UI" />
      <HelperImage src="/ts-logo-512.svg" label="TypeScript" />
      <HelperImage src="/mdx-icon.svg" label="MDX" />
    </Flex>
  );
};

export default SomeImage;
