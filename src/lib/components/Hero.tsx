'use client';

import {
  Heading,
  Text,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';

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
      bg="black" // Add this line to set the background color to black
      width="100%" // Add this line to set the width to 100%
    >
      <Flex direction="column" gap={4}>
        <Heading size="3xl" fontWeight="extrabold">
          <Text as="span">{title}</Text>
        </Heading>

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">
              <Text
                as="span"
                bgGradient="linear(to-br, blue.300, blue.700)"
                bgClip="text"
              >
                {title}
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
    </Flex>
  );
}
