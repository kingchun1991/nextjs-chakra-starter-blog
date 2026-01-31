import { Flex, HStack, Icon } from '@chakra-ui/react';
import { LuTags } from 'react-icons/lu';

import { Link } from '@/components/ui/link';
import { Tag } from '@/components/ui/tag';

import { slugify } from '../utils/text-converter';

export function Tags({ tags }: { tags: Array<string> }) {
  return (
    <HStack
      align={['initial', 'center']}
      justifyContent="flex-start"
      wrap="wrap"
    >
      <Flex align="flex-start" alignItems="center">
        <Icon m={1}>
          <LuTags />
        </Icon>
      </Flex>
      {tags?.map((tag) => (
        <Flex align="flex-start" alignItems="center" key={tag}>
          <Link href={`/tags/${slugify(tag)}`}>
            <Tag colorPalette="teal" m={1} p="1" variant="solid">
              {tag}
            </Tag>
          </Link>
        </Flex>
      ))}
    </HStack>
  );
}
