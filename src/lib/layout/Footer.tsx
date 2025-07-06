import { Flex, Link, Text, Stack, Box } from '@chakra-ui/react';
import { LuGithub, LuHeart } from 'react-icons/lu';

import { siteConfig } from '@/site.config';

const Footer = () => {
  return (
    <Box as="footer" py={8} px={4}>
      <Stack gap={4} align="center">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          gap={4}
          wrap="wrap"
        >
          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            © 2022 - {new Date().getFullYear()}{' '}
            <Link
              href={siteConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              color="teal.500"
              _dark={{ color: 'teal.300' }}
              _hover={{ textDecoration: 'underline' }}
            >
              {siteConfig.title}
            </Link>
          </Text>

          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            •
          </Text>

          <Flex align="center" gap={2}>
            <Link
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="gray.600"
              _dark={{ color: 'gray.400' }}
              _hover={{ color: 'teal.500' }}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <LuGithub size={16} />
              <Text fontSize="sm">Source</Text>
            </Link>
          </Flex>

          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            •
          </Text>

          <Flex align="center" gap={1}>
            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
              Made with
            </Text>
            <LuHeart size={14} color="red" />
            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
              using Next.js & Chakra UI
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Footer;
