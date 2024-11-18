'use client';

import { Heading, Text, Flex } from '@chakra-ui/react';

import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb';

export default function Hero({ title }: { title: string }) {
  return (
    <Flex
      direction="column"
      textAlign="center"
      alignItems="center"
      margin={4}
      minHeight={150}
      minWidth="auto"
      justifyContent="center"
      bg="black"
      width="100%"
    >
      <Flex direction="column" gap={4}>
        <Heading size="3xl" fontWeight="extrabold" color="white">
          <Text>{title}</Text>
        </Heading>

        <BreadcrumbRoot>
          <BreadcrumbLink href="/">ChakraBlog</BreadcrumbLink>
          <BreadcrumbCurrentLink>
            <Text
              as="span"
              bgGradient="linear(to-br, blue.300, blue.700)"
              bgClip="text"
            >
              {title}
            </Text>
          </BreadcrumbCurrentLink>
        </BreadcrumbRoot>
      </Flex>
    </Flex>
  );
}
