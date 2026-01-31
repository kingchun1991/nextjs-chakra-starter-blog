'use client';

import { Avatar, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import { Link } from '@/components/ui/link';
import { Tags } from '@/lib/components/tags';
import type { IPosts } from '@/lib/types/custom-types';

export function BlogPostCard({
  title,
  modifiedAt,
  summary,
  slug,
  image,
  draft,
  author,
  tags,
}: IPosts) {
  const imgPath = image
    ? `${image}`
    : `/api/og/cover?heading=${encodeURIComponent(
        title || ''
      )}&text=${encodeURIComponent(summary || '')}&template=plain&center=true`;

  if (!(summary && title)) {
    return null;
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
    <Box as="div" display="block" mb={10} width="100%">
      <Flex
        align="flex-start"
        flexDirection={['column', 'row']}
        justifyContent="space-between"
        width="100%"
      >
        <Flex
          align="flex-start"
          as="div"
          flexDirection="column"
          justifyContent="start"
          width="100%"
        >
          <Box maxWidth={1000}>
            <Image alt={title} height="auto" src={imgPath} width="100%" />
          </Box>
          <Link href={`/blog/${slug}`}>
            <Heading as="h3" fontWeight="medium" m={1} size="md">
              {title}
            </Heading>
          </Link>
        </Flex>
      </Flex>
      <Text _dark={{ color: 'gray.400' }} color="gray.700" lineClamp={2}>
        {summary}
      </Text>
      <Flex align="center" p={2}>
        <Avatar.Root size="xs">
          <Avatar.Image src="../images/avatar.png" />
          <Avatar.Fallback>{author}</Avatar.Fallback>
        </Avatar.Root>
        <Box
          _dark={{ color: 'gray.400' }}
          color="gray.700"
          fontSize="sm"
          ml={2}
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
}
