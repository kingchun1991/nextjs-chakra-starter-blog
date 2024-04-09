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

import { baseUrl } from '../constants/baseUrl';
import type { IPosts } from '../types/custom-types';

const BlogPostCard = ({
  title,
  // publishedAt,
  modifiedAt,
  summary,
  slug,
  image,
  category,
  draft,
  author,
  tags,
}: IPosts) => {
  const { colorMode } = useColorMode();

  const imgPath = image
    ? `${image}`
    : `${baseUrl}/api/og/cover?heading=${encodeURIComponent(
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
            <Image src={imgPath} width="100%" height="auto" alt="image" />
          </Box>
          <Link as={NextLink} href={`/${category}/${slug}`}>
            <Heading size="md" as="h3" mb={1} fontWeight="medium">
              {title}
            </Heading>
          </Link>
        </Flex>
      </Flex>
      <Text color={secondaryTextColor[colorMode]} noOfLines={2}>
        {summary}
      </Text>
      <Flex align="center">
        <Avatar size="xs" name={author} src="../images/portrait.jpeg" mr={2} />
        <Box fontSize="sm" color={textColor[colorMode]}>
          {author}
          {' / '}
          {parseDate(modifiedAt ?? '')}
        </Box>
      </Flex>

      {tags?.map((tag) => (
        <Link as={NextLink} href={`/tags/${tag}`}>
          <Tag key={tag} ml={2} variant="solid" colorScheme="teal">
            {tag}
          </Tag>
        </Link>
      ))}
      <Link as={NextLink} href={`/${category}/${slug}`} ml="auto">
        <Text color="teal.500" fontSize="sm" align="right" p="2">
          Read more &rarr;
        </Text>
      </Link>
    </Box>
  );
};

export default BlogPostCard;