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
import { AiOutlineClose, AiOutlineGithub } from 'react-icons/ai';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';

import { ColorModeButton } from '@/components/ui/color-mode';
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import SearchModal from './SearchModal';

interface NavItem {
  label: string;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: Array<NavItem>;
  href?: string;
}
const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Tags',
    href: '/tags',
  },
  {
    label: 'About',
    href: '/about',
  },
];

const DesktopSubNav = ({ label, href }: NavItem) => {
  return (
    <Link
      as={NextLink}
      href={href}
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
            {label}
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
          <Icon color="pink.400" w={5} h={5} as={FiChevronRight} />
        </Flex>
      </Stack>
    </Link>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction="row" gap={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <HoverCardRoot>
            <HoverCardTrigger asChild>
              <Link
                as={NextLink}
                p={2}
                href={navItem.href ?? '#'}
                fontSize="sm"
                fontWeight={500}
                color="gray.600"
                _dark={{ color: 'gray.200' }}
                _hover={{
                  textDecoration: 'none',
                  color: { base: 'gray.800', _dark: 'white' },
                }}
              >
                {navItem.label}
              </Link>
            </HoverCardTrigger>

            {navItem.children && (
              <HoverCardContent>
                <HoverCardArrow />
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
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

const MobileNavItem = ({ label, children }: NavItem) => {
  const { open, onToggle } = useDisclosure();

  return (
    <Stack gap={4} onClick={children && onToggle}>
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
          {label}
        </Text>
        {children && (
          <Icon
            as={FiChevronDown}
            transition="all .25s ease-in-out"
            transform={open ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

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
                <Link as={NextLink} key={child.label} py={2} href={child.href}>
                  {child.label}
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
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
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
              href="https://github.com/kingchun1991/nextjs-chakra-starter-blog"
            >
              <AiOutlineGithub />
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
              {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
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
