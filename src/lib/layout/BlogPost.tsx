'use client';

import { useColorMode, Heading, Text, Flex, Box, Link } from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import NextLink from 'next/link';

const BlogPost = ({
  title,
  publishedAt,
  // modifiedAt,
  summary,
  slug,
  image,
  category,
}: {
  title: string;
  publishedAt: string;
  // eslint-disable-next-line react/no-unused-prop-types
  modifiedAt: string;
  summary: string;
  slug: string;
  image: string;
  category: string;
}) => {
  const { colorMode } = useColorMode();

  const imgPath = `/images/${image}`;

  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400',
  };

  if (!summary || !title) {
    return <div>Loading...</div>;
  }
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
              <Image src={imgPath} width={1000} height={600} alt="image" />
              <Heading size="md" as="h3" mb={1} fontWeight="medium">
                {title}
              </Heading>
            </Flex>
          </Flex>
          <Text color={secondaryTextColor[colorMode]}>{summary}</Text>
          <Text color="gray.500" minWidth="140px" textAlign="left" mb={4}>
            {format(parseISO(publishedAt), 'MMMM dd, yyyy')}
          </Text>
        </Box>
      </Link>
    </NextLink>
  );
};

export default BlogPost;
