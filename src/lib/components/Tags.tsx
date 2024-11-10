import { Tag, Link, Icon, HStack, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaTags } from 'react-icons/fa';

import { slugify } from '../utils/textConverter';

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <HStack
      wrap="wrap"
      justifyContent="flex-start"
      align={['initial', 'center']}
    >
      <Flex align="flex-start" alignItems="center">
        <Icon as={FaTags} m={1} />
      </Flex>
      {tags?.map((tag) => (
        <Flex align="flex-start" key={tag} alignItems="center">
          <Link as={NextLink} href={`/tags/${slugify(tag)}`}>
            <Tag m={1} variant="solid" colorScheme="teal" p="1">
              {tag}
            </Tag>
          </Link>
        </Flex>
      ))}
    </HStack>
  );
};

export default Tags;
