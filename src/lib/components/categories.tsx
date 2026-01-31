import { Flex, HStack, Icon } from '@chakra-ui/react';
import { LuFolder } from 'react-icons/lu';

import { Link } from '@/components/ui/link';
import { Tag } from '@/components/ui/tag';

import { slugify } from '../utils/text-converter';

export function Categories({ categories }: { categories: Array<string> }) {
  return (
    <HStack
      align={['initial', 'center']}
      justifyContent="flex-start"
      wrap="wrap"
    >
      <Flex align="flex-start" alignItems="center">
        <Icon m={1}>
          <LuFolder />
        </Icon>
      </Flex>
      {categories?.map((category) => (
        <Flex align="flex-start" alignItems="center" key={category}>
          <Link href={`/categories/${slugify(category)}`}>
            <Tag colorPalette="teal" m={1} p="1" variant="solid">
              {category}
            </Tag>
          </Link>
        </Flex>
      ))}
    </HStack>
  );
}
