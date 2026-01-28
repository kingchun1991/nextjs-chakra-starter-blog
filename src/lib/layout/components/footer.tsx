import { Flex, Link, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex as="footer" justifyContent="center" width="full">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link
          href="https://agustinusnathaniel.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          agustinusnathaniel.com
        </Link>
      </Text>
    </Flex>
  );
};
