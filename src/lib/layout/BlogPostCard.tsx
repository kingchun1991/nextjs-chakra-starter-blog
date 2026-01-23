/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { Avatar, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import { Link } from '@/components/ui/link';
import Tags from '@/lib/components/Tags';
import type { IPosts } from '@/lib/types/custom-types';

const BlogPostCard = ({
  title,
  // publishedAt,
  modifiedAt,
  summary,
  slug,
  image,
  draft,
  author,
  tags,
}: IPosts) => {
  const imgPath = image
    ? `${image}`
    : `/api/og/cover?heading=${encodeURIComponent(
        title,
      )}&text=${encodeURIComponent(summary)}&template=plain&center=true`;

  if (!(summary && title)) {
    return <div>Loading...</div>;
  }

  if (draft) {
    return null;
  }

  const dateFormat = 'MMMM dd, yyyy';
  const parseDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), dateFormat);
    } catch (_error) {
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
          <Link href={`/blog/${slug}`}>
            <Heading size="md" as="h3" m={1} fontWeight="medium">
              {title}
            </Heading>
          </Link>
        </Flex>
      </Flex>
      <Text color="gray.700" _dark={{ color: 'gray.400' }} lineClamp={2}>
        {summary}
      </Text>
      <Flex align="center" p={2}>
        <Avatar.Root size="xs">
          <Avatar.Image src="../images/avatar.png" />
          <Avatar.Fallback>{author}</Avatar.Fallback>
        </Avatar.Root>
        <Box
          ml={2}
          fontSize="sm"
          color="gray.700"
          _dark={{ color: 'gray.400' }}
        >
          {author}
          {' / '}
          {parseDate(modifiedAt ?? '')}
        </Box>
      </Flex>

      <Tags tags={tags ?? []} />
      <Link href={`/blog/${slug}`} ml="auto">
        <Text color="teal.500" fontSize="sm" p="2">
          Read more &rarr;
        </Text>
      </Link>
    </Box>
  );
};

export default BlogPostCard;
