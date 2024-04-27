'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useColorMode,
  Heading,
  Flex,
  Stack,
  Avatar,
  Box,
  Text,
  Tag,
  VStack,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { FaRegFolder, FaTags, FaRegClock } from 'react-icons/fa';
import readingDuration from 'reading-duration';

import Container from '../components/Container';
import Share from '../components/Share';
import type { IPosts } from '../types/custom-types';
// import similerItems from '../utils/similarItems';
import MDXComponents from '~/lib/components/MDXComponents';

export default function BlogLayout({
  mdxSource,
  post,
}: {
  mdxSource: MDXRemoteSerializeResult;
  post: IPosts;
}) {
  const { colorMode } = useColorMode();
  const textColor = {
    light: 'gray.700',
    dark: 'gray.400',
  };
  const dateFormat = 'dd MMM, yyyy';
  const parseDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), dateFormat);
    } catch (error) {
      return '';
    }
  };
  // const similarPosts = similerItems(post, posts, post.slug!);
  const publishedAt = post?.publishedAt ?? '';
  const formattedPublishedDate = parseDate(publishedAt);
  const modifiedAt = post?.modifiedAt ?? '';
  const formattedModifyDate = parseDate(modifiedAt);

  return (
    <Container>
      <Stack
        as="article"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="900px"
        w="100%"
        px={2}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="900px"
          w="100%"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            {post.title}
          </Heading>
          <Flex
            justify="space-between"
            align={['initial', 'center']}
            direction={['column', 'row']}
            mt={2}
            w="100%"
            mb={4}
          >
            <HStack spacing={4} align="stretch">
              <Box color={textColor[colorMode]}>
                <Avatar size="xs" name={post.author} mr={2} />
                {post.author}
              </Box>

              <Box color={textColor[colorMode]}>
                <Icon as={FaRegFolder} />
                {post.categories?.map((category) => (
                  <Tag key={category} ml={2} variant="solid" colorScheme="teal">
                    {category}
                  </Tag>
                ))}
              </Box>
              <Box color={textColor[colorMode]}>
                <Icon as={FaRegClock} />
                <Text as="time" p={1}>
                  {modifiedAt
                    ? `${formattedModifyDate}`
                    : `${formattedPublishedDate}`}
                </Text>
              </Box>
            </HStack>
            <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
              {readingDuration(String(mdxSource.frontmatter.content), {
                wordsPerMinute: 200,
                emoji: false,
              }) ?? ''}
            </Text>
          </Flex>
        </Flex>
        <MDXRemote {...mdxSource} components={MDXComponents} />
        <Flex alignItems="center" gridColumn="4" className="lg:col-4">
          <VStack spacing={4} align="stretch">
            <Box color={textColor[colorMode]}>
              <Icon as={FaTags} />
              {post.tags?.map((tag) => (
                <Tag key={tag} ml={2} variant="solid" colorScheme="teal">
                  {tag}
                </Tag>
              ))}
            </Box>
            <Box color={textColor[colorMode]}>
              <HStack spacing={4} align="stretch">
                <Text mr={3}>Share :</Text>
                <Share
                  title={post.title}
                  description={post.summary}
                  slug={post.slug!}
                />
              </HStack>
            </Box>
          </VStack>
        </Flex>
      </Stack>
    </Container>
  );
}
