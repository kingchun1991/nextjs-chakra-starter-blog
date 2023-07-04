import {
  useColorMode,
  Heading,
  Flex,
  Stack,
  Avatar,
  Box,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { ArticleJsonLd } from 'next-seo';
import type React from 'react';
// import { useRouter } from "next/router";

import type { IPosts } from '../types/custom-types';

import Container from './Container';

export default function BlogLayout({
  children,
  post,
}: {
  children: React.ReactNode;
  post: IPosts;
}) {
  const { colorMode } = useColorMode();
  const textColor = {
    light: 'gray.700',
    dark: 'gray.400',
  };
  // const router = useRouter();
  // const slug = router.asPath.replace("/blog", "");
  const dateFormat = 'MMMM dd, yyyy';
  const parseDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), dateFormat);
    } catch (error) {
      // console.error(`Failed to parse date: ${dateString}`, error);
      return '';
    }
  };
  return (
    <Container>
      <ArticleJsonLd
        // eslint-disable-next-line
        url={'https://standingify.com/blog/' + post.slug}
        title={post.title}
        images={['']}
        datePublished={parseDate(post.publishedAt)}
        dateModified={parseDate(post.modifiedAt)}
        authorName="Frank O"
        description={post.summary}
      />
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
            <Flex align="center">
              <Avatar
                size="xs"
                name="Frank"
                src="../images/portrait.jpeg"
                mr={2}
              />
              <Box fontSize="sm" color={textColor[colorMode]}>
                {'Frank / '}
                {parseDate(post.publishedAt)}
              </Box>
            </Flex>
            {/* <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
              {post.readingTime}
            </Text> */}
          </Flex>
        </Flex>
        {children}
      </Stack>
    </Container>
  );
}
