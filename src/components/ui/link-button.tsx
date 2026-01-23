/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import type { HTMLChakraProps, RecipeProps } from '@chakra-ui/react';
import { chakra, createRecipeContext } from '@chakra-ui/react';
import NextLink from 'next/link';

export interface LinkButtonProps
  extends HTMLChakraProps<'a', RecipeProps<'button'>> {}

const { withContext } = createRecipeContext({ key: 'button' });

// Replace "a" with your framework's link component
export const LinkButton = withContext<HTMLAnchorElement, LinkButtonProps>(
  chakra(NextLink)
);
