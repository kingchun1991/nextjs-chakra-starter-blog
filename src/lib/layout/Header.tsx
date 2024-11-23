/* eslint-disable react/no-unused-prop-types */
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapsible,
  Icon,
  Link,
  useBreakpointValue,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  LuGithub,
  LuMenu,
  LuX,
  LuChevronDown,
  LuChevronRight,
} from 'react-icons/lu';

import { ColorModeButton } from '@/components/ui/color-mode';
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import type { NavItem } from '@/site.config';
import { siteConfig } from '@/site.config';

import SearchModal from './SearchModal';

const DesktopSubNav = ({ title, url }: NavItem) => {
  return (
    <Link
      as={NextLink}
      href={url}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: { base: 'pink.50', _dark: 'gray.900' } }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {title}
          </Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color="pink.400" w={5} h={5}>
            <LuChevronRight />
          </Icon>
        </Flex>
      </Stack>
    </Link>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction="row" gap={4}>
      {siteConfig.navigation.map((navItem) => (
        <Box key={navItem.title}>
          <HoverCardRoot>
            <HoverCardTrigger asChild>
              <Link
                as={NextLink}
                p={2}
                href={navItem.url ?? '#'}
                fontSize="sm"
                fontWeight={500}
                color="gray.600"
                _dark={{ color: 'gray.200' }}
                _hover={{
                  textDecoration: 'none',
                  color: { base: 'gray.800', _dark: 'white' },
                }}
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
};

const MobileNavItem = ({ title, url, children }: NavItem) => {
  const { open, onToggle } = useDisclosure();

  return (
    <Stack gap={4} onClick={children && onToggle}>
      <Link href={url ?? '#'}>
        <Flex
          py={2}
          as={Link}
          // href={href ?? '#'}
          justify="space-between"
          align="center"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text fontWeight={600} color="gray.600" _dark={{ color: 'gray.200' }}>
            {title}
          </Text>
          {children && (
            <Icon
              transition="all .25s ease-in-out"
              transform={open ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            >
              <LuChevronDown />
            </Icon>
          )}
        </Flex>
      </Link>

      <Collapsible.Root open={open} style={{ marginTop: '0!important' }}>
        <Collapsible.Content>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle="solid"
            borderColor="gray.200"
            _dark={{ borderColor: 'gray.700' }}
            align="start"
          >
            {children &&
              children.map((child) => (
                <Link as={NextLink} key={child.title} py={2} href={child.url}>
                  {child.title}
                </Link>
              ))}
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack bg="white" _dark={{ bg: 'gray.800' }} p={4} display={{ md: 'none' }}>
      {siteConfig.navigation.map((navItem) => (
        <MobileNavItem key={navItem.title} {...navItem} />
      ))}
    </Stack>
  );
};

const Header = () => {
  const { open, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderStyle="solid"
        align="center"
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'left', md: 'start' }}
          align="center"
        >
          <Link as={NextLink} href="/">
            <Text
              textAlign={useBreakpointValue({ base: 'left', md: 'left' })}
              fontFamily="heading"
              color="gray.800"
              _dark={{ color: 'white' }}
            >
              <Flex align="center">
                <Box>
                  <Text
                    fontSize={25}
                    color="teal"
                    bg="transparent"
                    w="100%"
                    h="100%"
                    textAlign="center"
                    justifyContent="center"
                    alignItems="center"
                    p="1"
                    as="b"
                  >
                    N.
                  </Text>
                </Box>
                <Box display={{ base: 'none', md: 'flex' }}>NextJSBlog</Box>
              </Flex>
            </Text>
          </Link>
        </Flex>

        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <DesktopNav />
        </Flex>

        <Spacer />

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          gap={3}
        >
          <SearchModal />
          <ColorModeButton />
          <IconButton
            as={Link}
            aria-label="GitHub Repository"
            bg="transparent"
            color="black"
            _dark={{ bg: 'black', color: 'white' }}
          >
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={siteConfig.repoUrl}
            >
              <LuGithub />
            </Link>
          </IconButton>
          <Spacer />
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              aria-label="Toggle Navigation"
              onClick={onToggle}
              bg="transparent"
              color="black"
              _dark={{ bg: 'black', color: 'white' }}
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
};

export default Header;
