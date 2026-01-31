'use client';

import { Flex, Heading, Text } from '@chakra-ui/react';

import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb';

export function Hero({ title }: { title: string }) {
  return (
    <Flex
      alignItems="center"
      bg="black"
      direction="column"
      justifyContent="center"
      margin={4}
      minHeight={150}
      minWidth="auto"
      textAlign="center"
      width="100%"
    >
      <Flex direction="column" gap={4}>
        <Heading color="white" fontWeight="extrabold" size="3xl">
          <Text>{title}</Text>
        </Heading>

        <BreadcrumbRoot>
          <BreadcrumbLink href="/">ChakraBlog</BreadcrumbLink>
          <BreadcrumbCurrentLink>
            <Text
              as="span"
              bgClip="text"
              bgGradient="linear(to-br, blue.300, blue.700)"
            >
              {title}
            </Text>
          </BreadcrumbCurrentLink>
        </BreadcrumbRoot>
      </Flex>
    </Flex>
  );
}
