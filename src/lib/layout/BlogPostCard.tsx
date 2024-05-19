/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Box,
  Link,
  Image,
  Avatar,
  Tag,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import NextLink from 'next/link';

import Tags from '../components/Tags';
import type { IPosts } from '../types/custom-types';

const BlogPostCard = ({
  title,
  // publishedAt,
  modifiedAt,
  summary,
  slug,
  image,
  categories,
  draft,
  author,
  tags,
}: IPosts) => {
  const { colorMode } = useColorMode();

  const imgPath = image
    ? `${image}`
    : `/api/og/cover?heading=${encodeURIComponent(
        title
      )}&text=${encodeURIComponent(summary)}&template=plain&center=true`;

  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400',
  };

  if (!summary || !title) {
    return <div>Loading...</div>;
  }

  if (draft) {
    return null;
  }

  const textColor = {
    light: 'gray.700',
    dark: 'gray.400',
  };
  const dateFormat = 'MMMM dd, yyyy';
  const parseDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), dateFormat);
    } catch (error) {
      return '';
    }
  };

  return (
    <Box as="div" mb={10} display="block" width="100%">
      <Flex
        width="100%"
        align="flex-start"
        justifyContent="space-between"
        flexDirection={['column', 'row']}
      >
        <Flex
          as="div"
          flexDirection="column"
          align="flex-start"
          justifyContent="start"
          width="100%"
        >
          <Box maxWidth={1000}>
            <Image src={imgPath} width="100%" height="auto" alt={title} />
          </Box>
          <Link as={NextLink} href={`/blog/${slug}`}>
            <Heading size="md" as="h3" m={1} fontWeight="medium">
              {title}
            </Heading>
          </Link>
        </Flex>
      </Flex>
      <Text color={secondaryTextColor[colorMode]} noOfLines={2}>
        {summary}
      </Text>
      <Flex align="center" p={2}>
        <Avatar size="xs" name={author} src="../images/avatar.png" mr={2} />
        <Box fontSize="sm" color={textColor[colorMode]}>
          {author}
          {' / '}
          {parseDate(modifiedAt ?? '')}
        </Box>
      </Flex>

      <Tags tags={tags ?? []} />
      <Link as={NextLink} href={`/blog/${slug}`} ml="auto">
        <Text color="teal.500" fontSize="sm" align="right" p="2">
          Read more &rarr;
        </Text>
      </Link>
    </Box>
  );
};

export default BlogPostCard;
