'use client';

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Footer } from './footer';
import { Header } from './header';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <a
        href="#main-content"
        onBlur={(e) => {
          Object.assign(e.currentTarget.style, {
            left: '-9999px',
            width: '1px',
            height: '1px',
          });
        }}
        onFocus={(e) => {
          Object.assign(e.currentTarget.style, {
            left: '0',
            width: 'auto',
            height: 'auto',
          });
        }}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        Skip to main content
      </a>
      <Header />
      <Box
        as="main"
        flex="1"
        id="main-content"
        maxWidth="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={8}
        width="100%"
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
