import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { LuGithub, LuHeart } from 'react-icons/lu';

import { siteConfig } from '@/site.config';

export function Footer() {
  return (
    <Box as="footer" px={4} py={8}>
      <Stack align="center" gap={4}>
        <Flex
          align="center"
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          justify="center"
          wrap="wrap"
        >
          <Text _dark={{ color: 'gray.400' }} color="gray.600" fontSize="sm">
            © 2022 - {new Date().getFullYear()}{' '}
            <Link
              _dark={{ color: 'teal.300' }}
              _hover={{ textDecoration: 'underline' }}
              color="teal.500"
              href={siteConfig.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {siteConfig.title}
            </Link>
          </Text>

          <Text _dark={{ color: 'gray.400' }} color="gray.600" fontSize="sm">
            •
          </Text>

          <Flex align="center" gap={2}>
            <Link
              _dark={{ color: 'gray.400' }}
              _hover={{ color: 'teal.500' }}
              alignItems="center"
              color="gray.600"
              display="flex"
              gap={1}
              href={siteConfig.repoUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LuGithub size={16} />
              <Text fontSize="sm">Source</Text>
            </Link>
          </Flex>

          <Text _dark={{ color: 'gray.400' }} color="gray.600" fontSize="sm">
            •
          </Text>

          <Flex align="center" gap={1}>
            <Text _dark={{ color: 'gray.400' }} color="gray.600" fontSize="sm">
              Made with
            </Text>
            <LuHeart color="red" size={14} />
            <Text _dark={{ color: 'gray.400' }} color="gray.600" fontSize="sm">
              using Next.js & Chakra UI
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
}

// export default Footer;
