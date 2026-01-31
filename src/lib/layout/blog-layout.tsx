'use client';

import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useState } from 'react';
import { LuClock } from 'react-icons/lu';
import readingDuration from 'reading-duration';

import { Avatar } from '@/components/ui/avatar';
import { Categories } from '@/lib/components/categories';
import { MDXComponents } from '@/lib/components/mdx-components';
import { Share } from '@/lib/components/share';
import { Tags } from '@/lib/components/tags';
import type { IPosts } from '@/lib/types/custom-types';
import { giscusConfig } from '@/site.config';

export function BlogLayout({
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
    } catch (_error) {
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
        alignItems="flex-start"
        as="article"
        gap={8}
        justifyContent="center"
        m="0 auto 4rem auto"
        maxWidth="900px"
        px={2}
        w="100%"
      >
        <Flex
          alignItems="flex-start"
          flexDirection="column"
          justifyContent="flex-start"
          maxWidth="900px"
          w="100%"
        >
          <Heading as="h1" letterSpacing="tight" mb={2} size="2xl">
            {post.title}
          </Heading>
          <HStack
            align={['initial', 'center']}
            justifyContent="flex-start"
            mb={4}
            mt={2}
            w="100%"
            wrap="wrap"
          >
            <Flex
              _dark={{ color: 'gray.400' }}
              align="flex-start"
              alignItems="center"
              color="gray.700"
              fontSize="sm"
            >
              <Avatar mr={2} name={post.author} size="xs" />
              <Box ml={1}>{post.author}</Box>
            </Flex>

            <Flex
              _dark={{ color: 'gray.400' }}
              align="flex-start"
              alignItems="center"
              color="gray.700"
              fontSize="sm"
            >
              <Categories categories={post.categories ?? []} />
            </Flex>
            <Flex
              _dark={{ color: 'gray.400' }}
              align="flex-start"
              alignItems="center"
              color="gray.700"
              fontSize="sm"
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
              _dark={{ color: 'gray.400' }}
              align="flex-start"
              alignItems="center"
              color="gray.700"
              fontSize="sm"
            >
              <Text color="gray.500" fontSize="sm" minWidth="100px" mt={[2, 0]}>
                {readingDuration(content, {
                  wordsPerMinute: 200,
                  emoji: false,
                }) ?? ''}
              </Text>
            </Flex>
          </HStack>
        </Flex>
        {mounted && (
          <MDXRemote
            {...mdxSource}
            components={
              MDXComponents as unknown as React.ComponentProps<
                typeof MDXRemote
              >['components']
            }
          />
        )}
        {!mounted && (
          <Box color="gray.500" p={4}>
            Loading content...
          </Box>
        )}

        <Box _dark={{ color: 'gray.400' }} color="gray.700">
          <Tags tags={post.tags ?? []} />
        </Box>
        <Box _dark={{ color: 'gray.400' }} color="gray.700">
          <HStack align="stretch" alignItems="center" gap={4}>
            <Text mr={3}>Share :</Text>
            <Share
              description={post.summary}
              slug={post.slug || ''}
              title={post.title || ''}
            />
          </HStack>
        </Box>

        <Box className="giscus" />
        <script
          async
          crossOrigin="anonymous"
          data-category="General"
          data-category-id="DIC_kwDOJ2sHH84CfEZU"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-lang="en"
          data-mapping="title"
          data-reactions-enabled="1"
          data-repo={giscusConfig.repo}
          data-repo-id={giscusConfig.repo_id}
          data-strict="0"
          data-theme="preferred_color_scheme"
          src="https://giscus.app/client.js"
        />
      </Stack>
    </Box>
  );
}
