'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Heading,
  Flex,
  Stack,
  Box,
  Text,
  Icon,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { FaRegFolder, FaRegClock } from 'react-icons/fa';
import readingDuration from 'reading-duration';

import { Avatar } from '@/components/ui/avatar';
import { Tag } from '@/components/ui/tag';
import MDXComponents from '@/lib/components/MDXComponents';
import Share from '@/lib/components/Share';
import Tags from '@/lib/components/Tags';
import type { IPosts } from '@/lib/types/custom-types';

// import similerItems from '../utils/similarItems';

export default function BlogLayout({
  mdxSource,
  post,
}: {
  mdxSource: MDXRemoteSerializeResult;
  post: IPosts;
}) {
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
    <Box>
      <Stack
        as="article"
        gap={8}
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
          <HStack
            wrap="wrap"
            justifyContent="flex-start"
            align={['initial', 'center']}
            mt={2}
            w="100%"
            mb={4}
          >
            <Flex
              align="flex-start"
              fontSize="sm"
              color="gray.700"
              _dark={{ color: 'gray.400' }}
              alignItems="center"
            >
              <Avatar size="xs" name={post.author} mr={2} />
              {post.author}
            </Flex>

            <Flex
              align="flex-start"
              fontSize="sm"
              color="gray.700"
              _dark={{ color: 'gray.400' }}
              alignItems="center"
            >
              <Icon>
                <FaRegFolder />
              </Icon>
              {post.categories.map((category) => (
                <Tag key={category} colorPalette="teal" variant="solid">
                  {category}
                </Tag>
              ))}
            </Flex>
            <Flex
              align="flex-start"
              fontSize="sm"
              color="gray.700"
              _dark={{ color: 'gray.400' }}
              alignItems="center"
            >
              <Icon>
                <FaRegClock />
              </Icon>
              <Text as="time" p={1}>
                {modifiedAt
                  ? `${formattedModifyDate}`
                  : `${formattedPublishedDate}`}
              </Text>
            </Flex>
            <Spacer />
            <Flex
              align="flex-start"
              fontSize="sm"
              color="gray.700"
              _dark={{ color: 'gray.400' }}
              alignItems="center"
            >
              <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
                {readingDuration(String(mdxSource.frontmatter.content), {
                  wordsPerMinute: 200,
                  emoji: false,
                }) ?? ''}
              </Text>
            </Flex>
          </HStack>
        </Flex>
        <MDXRemote {...mdxSource} components={MDXComponents} />

        <Box color="gray.700" _dark={{ color: 'gray.400' }}>
          <Tags tags={post.tags ?? []} />
        </Box>
        <Box color="gray.700" _dark={{ color: 'gray.400' }}>
          <HStack gap={4} align="stretch" alignItems="center">
            <Text mr={3}>Share :</Text>
            <Share
              title={post.title}
              description={post.summary}
              slug={post.slug!}
            />
          </HStack>
        </Box>

        <Box className="giscus" />
        <script
          src="https://giscus.app/client.js"
          data-repo="kingchun1991/nextjs-chakra-starter-blog"
          data-repo-id="R_kgDOJ2sHHw"
          data-category="General"
          data-category-id="DIC_kwDOJ2sHH84CfEZU"
          data-mapping="title"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-theme="preferred_color_scheme"
          data-lang="en"
          crossOrigin="anonymous"
          async
        />
      </Stack>
    </Box>
  );
}
