'use client';

import { Flex, useColorMode } from '@chakra-ui/react';

import HelperImage from './HelperImage';

const SomeImage = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex gap={2} justifyContent="left" alignItems="left" p="2">
      <HelperImage src={`/nextjs-icon-${colorMode}.svg`} label="NextJS" />
      <HelperImage src="/chakra-ui-logomark-colored.svg" label="Chakra UI" />
      <HelperImage src="/ts-logo-512.svg" label="TypeScript" />
      <HelperImage src="/mdx-icon.svg" label="MDX" />
    </Flex>
  );
};

export default SomeImage;
