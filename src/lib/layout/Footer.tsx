import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        2022 - {new Date().getFullYear()}{' '}
        <Link
          href="https://nextjs-chakra-starter-blog.vercel.app/"
          isExternal
          rel="noopener noreferrer"
        >
          nextjs-chakra-starter-blog
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
