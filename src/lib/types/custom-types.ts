export interface IFrontMatter {
  author: string;
  draft: boolean;
  modifiedAt: string;
  publishedAt: string;
  slug: string;
  summary: string;
  title: string;
  wordCount: number;
}

export interface IPosts {
  author?: string;
  categories?: Array<string>;
  description?: string;
  draft?: boolean;
  image?: string;
  modifiedAt?: string;
  publishedAt?: string;
  slug?: string;
  summary?: string;
  tags?: Array<string>;
  title?: string;
}

export interface IAbout {
  description: string;
  image: string;
  meta_title: string;
  title: string;
}

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: Array<string>;
    author: string;
    tags: Array<string>;
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};
