import { Link, Icon, HStack, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { LuTags } from 'react-icons/lu';

import { slugify } from '../utils/textConverter';
import { Tag } from '@/components/ui/tag';

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <HStack
      wrap="wrap"
      justifyContent="flex-start"
      align={['initial', 'center']}
    >
      <Flex align="flex-start" alignItems="center">
        <Icon m={1}>
          <LuTags />
        </Icon>
      </Flex>
      {tags?.map((tag) => (
        <Flex align="flex-start" key={tag} alignItems="center">
          <Link as={NextLink} href={`/tags/${slugify(tag)}`}>
            <Tag m={1} variant="solid" colorPalette="teal" p="1">
              {tag}
            </Tag>
          </Link>
        </Flex>
      ))}
    </HStack>
  );
};

export default Tags;
