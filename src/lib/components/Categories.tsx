import { Link, Icon, HStack, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { LuFolder } from 'react-icons/lu';

import { slugify } from '../utils/textConverter';
import { Tag } from '@/components/ui/tag';

const Categories = ({ categories }: { categories: string[] }) => {
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
          <Link as={NextLink} href={`/categories/${slugify(category)}`}>
            <Tag m={1} variant="solid" colorPalette="teal" p="1">
              {category}
            </Tag>
          </Link>
        </Flex>
      ))}
    </HStack>
  );
};

export default Categories;
