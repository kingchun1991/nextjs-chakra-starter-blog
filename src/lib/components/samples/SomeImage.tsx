'use client';

import { Flex } from '@chakra-ui/react';

import HelperImage from './HelperImage';

const SomeImage = () => {
  return (
    <Flex gap={2} justifyContent="left" alignItems="left" p="2">
      <HelperImage src="/chakra-ui-logomark-colored.svg" label="Chakra UI" />
      <HelperImage src="/ts-logo-512.svg" label="TypeScript" />
      <HelperImage src="/mdx-icon.svg" label="MDX" />
    </Flex>
  );
};

export default SomeImage;
