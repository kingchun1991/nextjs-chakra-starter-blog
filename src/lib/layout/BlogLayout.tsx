/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { LuClock } from 'react-icons/lu';
import readingDuration from 'reading-duration';
import { useEffect, useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import MDXComponents from '@/lib/components/MDXComponents';
import Share from '@/lib/components/Share';
import Tags from '@/lib/components/Tags';
import Categories from '@/lib/components/Categories';
import type { IPosts } from '@/lib/types/custom-types';
import { giscusConfig } from '@/site.config';

// import similerItems from '../utils/similarItems';

export default function BlogLayout({
  mdxSource,
  post,
  content,
}: {
  mdxSource: MDXRemoteSerializeResult;
  post: IPosts;
  content: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              <Box ml={1}>{post.author}</Box>
            </Flex>

            <Flex
              align="flex-start"
              fontSize="sm"
              color="gray.700"
              _dark={{ color: 'gray.400' }}
              alignItems="center"
            >
              <Categories categories={post.categories ?? []} />
            </Flex>
            <Flex
              align="flex-start"
              fontSize="sm"
              color="gray.700"
              _dark={{ color: 'gray.400' }}
              alignItems="center"
            >
              <Icon>
                <LuClock />
              </Icon>
              <Box ml={1}>
                <Text as="time" p={1}>
                  {modifiedAt
                    ? `${formattedModifyDate}`
                    : `${formattedPublishedDate}`}
                </Text>
              </Box>
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
                {readingDuration(content, {
                  wordsPerMinute: 200,
                  emoji: false,
                }) ?? ''}
              </Text>
            </Flex>
          </HStack>
        </Flex>
        {mounted && (
          <MDXRemote {...mdxSource} components={MDXComponents as any} />
        )}
        {!mounted && (
          <Box p={4} color="gray.500">
            Loading content...
          </Box>
        )}

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
          data-repo={giscusConfig.repo}
          data-repo-id={giscusConfig.repo_id}
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
