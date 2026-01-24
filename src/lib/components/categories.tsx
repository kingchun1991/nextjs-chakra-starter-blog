import { Flex, HStack, Icon } from '@chakra-ui/react';
import { LuFolder } from 'react-icons/lu';

import { Link } from '@/components/ui/link';
import { Tag } from '@/components/ui/tag';

import { slugify } from '../utils/textConverter';

export function Categories({ categories }: { categories: Array<string> }) {
  return (
    <HStack
      wrap="wrap"
      justifyContent="flex-start"
      align={['initial', 'center']}
    >
      <Flex align="flex-start" alignItems="center">
        <Icon m={1}>
          <LuFolder />
        </Icon>
      </Flex>
      {categories?.map((category) => (
        <Flex align="flex-start" key={category} alignItems="center">
          <Link href={`/categories/${slugify(category)}`}>
            <Tag m={1} variant="solid" colorPalette="teal" p="1">
              {category}
            </Tag>
          </Link>
        </Flex>
      ))}
    </HStack>
  );
}
