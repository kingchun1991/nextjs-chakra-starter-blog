import BlogPostListLayout from '~/lib/layout/BlogPostListLayout';
import type { IPosts } from '~/lib/types/custom-types';

const BlogList = ({
  posts,
  tagSelected,
}: {
  posts: IPosts[];
  tagSelected: string;
}) => {
  return <BlogPostListLayout posts={posts} tagSelected={tagSelected} />;
};

export default BlogList;
