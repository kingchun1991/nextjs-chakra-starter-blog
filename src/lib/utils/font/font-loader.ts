import { siteConfig } from '@/site.config';

export const fontLoader = (url: string) =>
  fetch(new URL(url, siteConfig.url)).then((res) => res.arrayBuffer());
