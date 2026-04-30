import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { LuGithub, LuHeart } from 'react-icons/lu';

import { siteConfig } from '@/site.config';

const FOOTER_BG = '#0b0c0c';
const FOOTER_ACCENT = '#1d70b8';
const FOOTER_TEXT = '#ffffff';
const FOOTER_TEXT_MUTED = '#d1d5db';

export function Footer() {
  return (
    <Box
      as="footer"
      bg={FOOTER_BG}
      borderColor={FOOTER_ACCENT}
      borderTopWidth="4px"
    >
      <Box maxWidth="1200px" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        <Stack gap={6}>
          <Flex
            align="center"
            direction={{ base: 'column', md: 'row' }}
            gap={4}
            justify="space-between"
            wrap="wrap"
          >
            <Stack direction="row" gap={4}>
              {siteConfig.navigation.map((navItem) => (
                <Link
                  _hover={{ color: FOOTER_TEXT, textDecoration: 'underline' }}
                  color={FOOTER_TEXT_MUTED}
                  fontSize="sm"
                  href={navItem.url ?? '#'}
                  key={navItem.title}
                >
                  {navItem.title}
                </Link>
              ))}
              <Link
                _hover={{ color: FOOTER_TEXT, textDecoration: 'underline' }}
                alignItems="center"
                color={FOOTER_TEXT_MUTED}
                display="flex"
                fontSize="sm"
                gap={1}
                href={siteConfig.repoUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LuGithub size={14} />
                Source
              </Link>
            </Stack>

            <Flex align="center" gap={1}>
              <Text color={FOOTER_TEXT_MUTED} fontSize="sm">
                Made with
              </Text>
              <LuHeart color="#e53e3e" size={13} />
              <Text color={FOOTER_TEXT_MUTED} fontSize="sm">
                using Next.js &amp; Chakra UI
              </Text>
            </Flex>
          </Flex>

          <Text color={FOOTER_TEXT_MUTED} fontSize="sm">
            © 2022–{new Date().getFullYear()}{' '}
            <Link
              _hover={{ color: FOOTER_TEXT, textDecoration: 'underline' }}
              color={FOOTER_TEXT_MUTED}
              href={siteConfig.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {siteConfig.title}
            </Link>
            . All rights reserved.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

// export default Footer;
