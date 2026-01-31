/* eslint-disable react/no-unused-prop-types */
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
import type { NavItem } from '@/site.config';
import { siteConfig } from '@/site.config';

import { SearchModal } from './search-modal';

export function DesktopSubNav({ title, url }: NavItem) {
  return (
    <Link
      _hover={{ bg: { base: 'pink.50', _dark: 'gray.900' } }}
      display="block"
      href={url}
      p={2}
      role="group"
      rounded="md"
    >
      <Stack align="center" direction="row">
        <Box>
          <Text
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
            transition="all .3s ease"
          >
            {title}
          </Text>
        </Box>
        <Flex
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          align="center"
          flex={1}
          justify="flex-end"
          opacity={0}
          transform="translateX(-10px)"
          transition="all .3s ease"
        >
          <Icon color="pink.400" h={5} w={5}>
            <LuChevronRight />
          </Icon>
        </Flex>
      </Stack>
    </Link>
  );
}

export function DesktopNav() {
  return (
    <Stack direction="row" gap={4}>
      {siteConfig.navigation.map((navItem) => (
        <Box key={navItem.title}>
          <HoverCardRoot>
            <HoverCardTrigger asChild>
              <Link
                _dark={{ color: 'gray.200' }}
                _hover={{
                  textDecoration: 'none',
                  color: { base: 'gray.800', _dark: 'white' },
                }}
                color="gray.600"
                fontSize="sm"
                fontWeight={500}
                href={navItem.url ?? '#'}
                p={2}
              >
                {navItem.title}
              </Link>
            </HoverCardTrigger>

            {navItem.children && (
              <HoverCardContent>
                <HoverCardArrow />
                <Stack>
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

export function MobileNavItem({ title, url, children }: NavItem) {
  const { open, onToggle } = useDisclosure();

  return (
    <Stack gap={4} onClick={children && onToggle}>
      <Link href={url ?? '#'}>
        <Flex
          _hover={{
            textDecoration: 'none',
          }}
          align="center"
          // href={href ?? '#'}
          as={Link}
          justify="space-between"
          py={2}
        >
          <Text _dark={{ color: 'gray.200' }} color="gray.600" fontWeight={600}>
            {title}
          </Text>
          {children && (
            <Icon
              h={6}
              transform={open ? 'rotate(180deg)' : ''}
              transition="all .25s ease-in-out"
              w={6}
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
              <Link href={child.url} key={child.title} py={2}>
                {child.title}
              </Link>
            ))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  );
}

export function MobileNav() {
  return (
    <Stack _dark={{ bg: 'gray.800' }} bg="white" display={{ md: 'none' }} p={4}>
      {siteConfig.navigation.map((navItem) => (
        <MobileNavItem key={navItem.title} {...navItem} />
      ))}
    </Stack>
  );
}

export function Header() {
  const { open, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex
        align="center"
        borderStyle="solid"
        minH="60px"
        px={{ base: 4 }}
        py={{ base: 2 }}
      >
        <Flex
          align="center"
          flex={{ base: 1 }}
          justify={{ base: 'left', md: 'start' }}
        >
          <Link _hover={{ textDecoration: 'none' }} href="/">
            <Flex align="center" gap={2}>
              <Box>
                <Text
                  _dark={{ color: 'teal.300' }}
                  color="teal.500"
                  fontSize="2xl"
                  fontWeight="bold"
                  lineHeight={1}
                >
                  {siteConfig.title.charAt(0).toUpperCase()}.
                </Text>
              </Box>
              <Box display={{ base: 'none', md: 'block' }}>
                <Text
                  _dark={{ color: 'white' }}
                  color="gray.800"
                  fontSize="lg"
                  fontWeight="semibold"
                >
                  {siteConfig.title
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
          gap={3}
          justify="flex-end"
        >
          <SearchModal />
          <ColorModeButton />
          <Link
            aria-label="GitHub Repository"
            href={siteConfig.repoUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconButton
              _dark={{ color: 'gray.400' }}
              _hover={{
                color: 'gray.800',
                _dark: { color: 'white' },
              }}
              aria-label="GitHub Repository"
              bg="transparent"
              color="gray.600"
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
              _dark={{ color: 'gray.400' }}
              _hover={{
                color: 'gray.800',
                _dark: { color: 'white' },
              }}
              aria-label="Toggle Navigation"
              bg="transparent"
              color="gray.600"
              onClick={onToggle}
              size="sm"
            >
              {open ? <LuX /> : <LuMenu />}
            </IconButton>
          </Flex>
        </Stack>
      </Flex>

      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <MobileNav />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

// export default Header;
