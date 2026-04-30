/* eslint-disable react/no-unused-prop-types */
'use client';

import {
  Box,
  Collapsible,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import {
  LuChevronDown,
  LuChevronRight,
  LuGithub,
  LuMenu,
  LuX,
} from 'react-icons/lu';

import { ColorModeButton } from '@/components/ui/color-mode';
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Link } from '@/components/ui/link';
import { routing } from '@/i18n/routing';
import type { NavItem } from '@/site.config';
import { siteConfig } from '@/site.config';

import { LanguageSwitcher } from './language-switcher';
import { SearchModal } from './search-modal';

const HEADER_BG = '#0b0c0c';
const HEADER_ACCENT = '#1d70b8';
const HEADER_TEXT = '#ffffff';
const HEADER_TEXT_MUTED = '#d1d5db';

const i18nEnabled = routing.locales.length > 1;

export function DesktopSubNav({ title, url }: NavItem) {
  return (
    <Link
      _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}
      color={HEADER_TEXT}
      display="block"
      href={url}
      px={3}
      py={2}
      role="group"
      rounded="sm"
    >
      <Stack align="center" direction="row">
        <Text fontWeight={500}>{title}</Text>
        <Flex
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          align="center"
          flex={1}
          justify="flex-end"
          opacity={0}
          transform="translateX(-10px)"
          transition="all .3s ease"
        >
          <Icon color={HEADER_ACCENT} h={4} w={4}>
            <LuChevronRight />
          </Icon>
        </Flex>
      </Stack>
    </Link>
  );
}

type DesktopNavContentProps = {
  getTranslatedTitle: (navItem: NavItem) => string;
};

function DesktopNavContent({ getTranslatedTitle }: DesktopNavContentProps) {
  return (
    <Stack direction="row" gap={1}>
      {siteConfig.navigation.map((navItem) => (
        <Box key={navItem.title}>
          <HoverCardRoot>
            <HoverCardTrigger asChild>
              <Link
                _hover={{
                  color: HEADER_TEXT_MUTED,
                  textDecoration: 'underline',
                }}
                color={HEADER_TEXT}
                fontSize="sm"
                fontWeight={500}
                href={navItem.url ?? '#'}
                px={3}
                py={2}
              >
                {getTranslatedTitle(navItem)}
              </Link>
            </HoverCardTrigger>

            {navItem.children && (
              <HoverCardContent bg={HEADER_BG} borderColor={HEADER_ACCENT}>
                <HoverCardArrow />
                <Stack gap={1}>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.title} {...child} />
                  ))}
                </Stack>
              </HoverCardContent>
            )}
          </HoverCardRoot>
        </Box>
      ))}
    </Stack>
  );
}

function DesktopNavWithTranslations() {
  const t = useTranslations('header');

  const getTranslatedTitle = (navItem: NavItem) => {
    return t(navItem.title.toLowerCase());
  };

  return <DesktopNavContent getTranslatedTitle={getTranslatedTitle} />;
}

export function DesktopNav() {
  if (!i18nEnabled) {
    return (
      <DesktopNavContent getTranslatedTitle={(navItem) => navItem.title} />
    );
  }

  return <DesktopNavWithTranslations />;
}

type MobileNavItemContentProps = NavItem & {
  getTranslatedTitle: () => string;
};

function MobileNavItemContent({
  url,
  children,
  getTranslatedTitle,
}: MobileNavItemContentProps) {
  const { open, onToggle } = useDisclosure();

  return (
    <Stack gap={2} onClick={children && onToggle}>
      <Link href={url ?? '#'}>
        <Flex
          _hover={{ textDecoration: 'underline' }}
          align="center"
          justify="space-between"
          py={2}
        >
          <Text color={HEADER_TEXT} fontSize="sm" fontWeight={600}>
            {getTranslatedTitle()}
          </Text>
          {children && (
            <Icon
              color={HEADER_TEXT}
              h={5}
              transform={open ? 'rotate(180deg)' : ''}
              transition="all .25s ease-in-out"
              w={5}
            >
              <LuChevronDown />
            </Icon>
          )}
        </Flex>
      </Link>

      <Collapsible.Root open={open} style={{ marginTop: '0!important' }}>
        <Collapsible.Content>
          <Stack
            align="start"
            borderColor={HEADER_ACCENT}
            borderLeft="3px solid"
            mt={1}
            pl={4}
          >
            {children?.map((child) => (
              <Link
                color={HEADER_TEXT_MUTED}
                fontSize="sm"
                href={child.url}
                key={child.title}
                py={1}
              >
                {child.title}
              </Link>
            ))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  );
}

function MobileNavItemWithTranslations({ title, ...rest }: NavItem) {
  const t = useTranslations('header');

  return (
    <MobileNavItemContent
      {...rest}
      getTranslatedTitle={() => t(title.toLowerCase())}
      title={title}
    />
  );
}

export function MobileNavItem(props: NavItem) {
  if (!i18nEnabled) {
    return (
      <MobileNavItemContent {...props} getTranslatedTitle={() => props.title} />
    );
  }

  return <MobileNavItemWithTranslations {...props} />;
}

export function MobileNav() {
  return (
    <Box
      bg={HEADER_BG}
      borderColor={HEADER_ACCENT}
      borderTopWidth="1px"
      display={{ md: 'none' }}
      px={4}
      py={4}
    >
      <Box maxWidth="1200px" mx="auto">
        <Stack gap={1}>
          {siteConfig.navigation.map((navItem) => (
            <MobileNavItem key={navItem.title} {...navItem} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export function Header() {
  const { open, onToggle } = useDisclosure();
  return (
    <Box as="header">
      <Box bg={HEADER_BG} borderBottomWidth="4px" borderColor={HEADER_ACCENT}>
        <Flex
          align="center"
          maxWidth="1200px"
          minH="60px"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={3}
        >
          <Flex align="center" flex={{ base: 1 }} justify="start">
            <Link _hover={{ textDecoration: 'none' }} href="/">
              <Text
                color={HEADER_TEXT}
                fontSize="xl"
                fontWeight="bold"
                letterSpacing="tight"
              >
                {siteConfig.title
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Text>
            </Link>
          </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>

          <Stack align="center" direction="row" gap={2} justify="flex-end">
            <SearchModal />
            <LanguageSwitcher />
            <ColorModeButton color={HEADER_TEXT} />
            <Link
              aria-label="GitHub Repository"
              href={siteConfig.repoUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconButton
                _hover={{ color: HEADER_TEXT_MUTED }}
                aria-label="GitHub Repository"
                bg="transparent"
                color={HEADER_TEXT}
                size="sm"
              >
                <LuGithub />
              </IconButton>
            </Link>
            <Flex display={{ base: 'flex', md: 'none' }}>
              <IconButton
                _hover={{ color: HEADER_TEXT_MUTED }}
                aria-label="Toggle Navigation"
                bg="transparent"
                color={HEADER_TEXT}
                onClick={onToggle}
                size="sm"
              >
                {open ? <LuX /> : <LuMenu />}
              </IconButton>
            </Flex>
          </Stack>
        </Flex>
      </Box>

      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <MobileNav />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

// export default Header;
