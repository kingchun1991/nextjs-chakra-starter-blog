/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Post } from '@/lib/types/custom-types';

// similer products
const similerItems = (
  currentItem: Post,
  allItems: Array<Post>,
  slug: string
): Array<Post> => {
  const { categories, tags } = currentItem.frontmatter;

  // filter by categories
  const filterByCategories = allItems.filter((item: Post) =>
    categories.find((category) =>
      item.frontmatter.categories.includes(category)
    )
  );

  // filter by tags
  const filterByTags = allItems.filter((item: Post) =>
    tags.find((tag) => item.frontmatter.tags.includes(tag))
  );

  // merged after filter
  const mergedItems = [...new Set([...filterByCategories, ...filterByTags])];

  // filter by slug
  return mergedItems.filter((product) => product.slug !== slug);
};

export default similerItems;
