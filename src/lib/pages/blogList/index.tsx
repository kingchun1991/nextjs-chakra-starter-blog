import { BlogPostListLayout } from '@/lib/layout/blog-post-list-layout';
import type { IPosts } from '@/lib/types/custom-types';

export function BlogList({
  posts,
  tagSelected,
}: {
  posts: Array<IPosts>;
  tagSelected: string;
}) {
  return <BlogPostListLayout posts={posts} tagSelected={tagSelected} />;
}
