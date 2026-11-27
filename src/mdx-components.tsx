import type { MDXComponents } from 'mdx/types';

import { mdxComponents } from '@/lib/components/mdx-components';

// Required by @next/mdx in the App Router: every imported .mdx file renders
// its markdown elements and JSX tags through this map.
export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
