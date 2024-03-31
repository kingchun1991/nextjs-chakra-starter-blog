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
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import NextLink from 'next/link';

import { baseUrl } from '../constants/baseUrl';

const BlogPost = ({
  title,
  publishedAt,
  // modifiedAt,
  summary,
  slug,
  image,
  category,
  draft,
  author,
}: {
  title: string;
  publishedAt: string;
  // eslint-disable-next-line react/no-unused-prop-types
  modifiedAt: string;
  summary: string;
  slug: string;
  image: string;
  category: string;
  draft: boolean;
  author: string;
}) => {
  const { colorMode } = useColorMode();

  const imgPath = image
    ? `/images/${image}`
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
    <NextLink href={`/${category}/${slug}`} passHref>
      <Link w="100%" _hover={{ textDecoration: 'none' }}>
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
              <Heading size="md" as="h3" mb={1} fontWeight="medium">
                {title}
              </Heading>
            </Flex>
          </Flex>
          <Text color={secondaryTextColor[colorMode]}>{summary}</Text>
          <Flex align="center">
            <Avatar
              size="xs"
              name={author}
              src="../images/portrait.jpeg"
              mr={2}
            />
            <Box fontSize="sm" color={textColor[colorMode]}>
              {author}
              {' / '}
              {parseDate(publishedAt)}
            </Box>
          </Flex>
        </Box>
      </Link>
    </NextLink>
  );
};

export default BlogPost;
