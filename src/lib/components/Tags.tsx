import { Flex, HStack, Icon } from '@chakra-ui/react';
import { LuTags } from 'react-icons/lu';

import { Link } from '@/components/ui/link';
import { Tag } from '@/components/ui/tag';

import { slugify } from '../utils/textConverter';

const Tags = ({ tags }: { tags: Array<string> }) => {
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
          <Link href={`/tags/${slugify(tag)}`}>
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
