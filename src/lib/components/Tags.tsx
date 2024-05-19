import { Tag, Link, Icon, Wrap, WrapItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaTags } from 'react-icons/fa';

import { slugify } from '../utils/textConverter';

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <Wrap justifyContent="flex-start" align={['initial', 'center']}>
      <WrapItem alignItems="center">
        <Icon as={FaTags} m={1} />
      </WrapItem>
      {tags?.map((tag) => (
        <WrapItem key={tag} alignItems="center">
          <Link as={NextLink} href={`/tags/${slugify(tag)}`}>
            <Tag m={1} variant="solid" colorScheme="teal" p="1">
              {tag}
            </Tag>
          </Link>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Tags;
