'use client';

import { Link as ChakraLink } from '@chakra-ui/react';
import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { forwardRef } from 'react';

export interface LinkProps extends Omit<ChakraLinkProps, 'href'> {
  href?: string;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ href, children, ...props }, ref) {
    if (!href) {
      return (
        <ChakraLink href="#" ref={ref} {...props}>
          {children}
        </ChakraLink>
      );
    }
    
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    
    if (isExternal) {
      return (
        <ChakraLink href={href} ref={ref} {...props}>
          {children}
        </ChakraLink>
      );
    }
    
    return (
      <ChakraLink asChild ref={ref} {...props}>
        <NextLink href={href}>{children}</NextLink>
      </ChakraLink>
    );
  }
);
