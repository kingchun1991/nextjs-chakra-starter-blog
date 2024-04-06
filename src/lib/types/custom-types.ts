interface IReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface IFrontMatter {
  publishedAt: string;
  modifiedAt: string;
  readingTime: IReadingTime;
  slug: string;
  summary: string;
  title: string;
  wordCount: number;
  draft: boolean;
  author: string;
}

export interface IPosts {
  publishedAt?: string;
  modifiedAt?: string;
  slug?: string;
  summary: string;
  title: string;
  image: string;
  category?: string;
  draft?: boolean;
  author: string;
  tags?: string[];
  readingTime?: string;
}

export interface IAbout {
  meta_title: string;
  title: string;
  image: string;
  description: string;
}

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};
