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
  onClose: () => void;
};

function MobileNavItemContent({
  url,
  children,
  getTranslatedTitle,
  onClose,
}: MobileNavItemContentProps) {
  const { open, onToggle } = useDisclosure();

  return (
    <Stack gap={4} onClick={children && onToggle}>
      <Link href={url ?? '#'} onClick={children ? undefined : onClose}>
        <Flex
          _hover={{
            textDecoration: 'none',
          }}
          align="center"
          justify="space-between"
          py={2}
        >
          <Text color={HEADER_TEXT} fontWeight={600}>
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
            _dark={{ borderColor: 'gray.700' }}
            align="start"
            borderColor="gray.200"
            borderLeft={1}
            borderStyle="solid"
            mt={2}
            pl={4}
          >
            {children?.map((child) => (
              <Link href={child.url} key={child.title} onClick={onClose} py={2}>
                {child.title}
              </Link>
            ))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  );
}

type MobileNavItemWithTranslationsProps = NavItem & { onClose: () => void };

function MobileNavItemWithTranslations({
  title,
  onClose,
  ...rest
}: MobileNavItemWithTranslationsProps) {
  const t = useTranslations('header');

  return (
    <MobileNavItemContent
      {...rest}
      getTranslatedTitle={() => t(title.toLowerCase())}
      onClose={onClose}
      title={title}
    />
  );
}

type MobileNavItemProps = NavItem & { onClose: () => void };

export function MobileNavItem({ onClose, ...props }: MobileNavItemProps) {
  if (!i18nEnabled) {
    return (
      <MobileNavItemContent
        {...props}
        getTranslatedTitle={() => props.title}
        onClose={onClose}
      />
    );
  }

  return <MobileNavItemWithTranslations onClose={onClose} {...props} />;
}

type MobileNavProps = {
  onClose: () => void;
};

export function MobileNav({ onClose }: MobileNavProps) {
  return (
    <Box
      bg={HEADER_BG}
      borderColor={HEADER_ACCENT}
      borderTopWidth="1px"
      display={{ md: 'none' }}
      px={4}
      py={4}
    >
      <Stack gap={1}>
        {siteConfig.navigation.map((navItem) => (
          <MobileNavItem key={navItem.title} onClose={onClose} {...navItem} />
        ))}
      </Stack>
    </Box>
  );
}

export function Header() {
  const { open, onToggle } = useDisclosure();
  return (
    <Box as="header">
      <Box bg={HEADER_BG} borderBottomWidth="4px" borderColor={HEADER_ACCENT}>
        <Flex align="center" minH="60px" px={{ base: 4 }} py={{ base: 2 }}>
          <Flex
            align="center"
            flex={{ base: 1 }}
            justify={{ base: 'left', md: 'start' }}
          >
            <Link _hover={{ textDecoration: 'none' }} href="/">
              <Flex align="center" gap={2}>
                <Box>
                  <Text
                    color="teal.300"
                    fontSize="2xl"
                    fontWeight="bold"
                    lineHeight={1}
                  >
                    {siteConfig.title.charAt(0).toUpperCase()}.
                  </Text>
                </Box>
                <Box display={{ base: 'none', md: 'block' }}>
                  <Text color={HEADER_TEXT} fontSize="lg" fontWeight="semibold">
                    {siteConfig.title
                      .split('-')
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' ')}
                  </Text>
                </Box>
              </Flex>
            </Link>
          </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>

          <Stack
            align="center"
            direction="row"
            flex={{ base: 1, md: 0 }}
            gap={2}
            justify="flex-end"
          >
            <SearchModal />
            <LanguageSwitcher />
            <ColorModeButton />
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
            <Flex
              display={{ base: 'flex', md: 'none' }}
              flex={{ base: 1, md: 'auto' }}
              ml={{ base: -2 }}
            >
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
          <MobileNav onClose={onToggle} />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

// export default Header;
