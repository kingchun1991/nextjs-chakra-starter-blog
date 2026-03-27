import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import RSS from 'rss';

const FILE_EXTENSION_REGEX = /\.[^/.]+$/;

const CONTENT_DEPTH = 2;
const JSON_FOLDER = './.json';
const BLOG_FOLDER = 'content/blog';
const RSS_FOLDER = './public';
// const site_url =
//   process.env.NODE_ENV === 'production'
//     ? 'https://nextjs-chakra-starter-blog.vercel.app/'
//     : 'http://localhost:3000';
const site_url = 'https://nextjs-chakra-starter-blog.vercel.app/';
const feedOptions = {
  title: 'NextJS ChakraUI Starter Blog',
  description: 'feedId:75864871994540032+userId:126272323145079808',
  site_url,
  feed_url: `${site_url}rss.xml`,
  image_url: `${site_url}next-app-chakra-ts.png`,
  pubDate: new Date(),
  copyright: `All rights reserved ${new Date().getFullYear()}`,
};

const feed = new RSS(feedOptions);

const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
};

const formatJsonFiles = (filePaths) => {
  // Use locally installed biome binary to avoid PATH injection attacks
  const biomeBin = path.join(
    import.meta.dirname,
    '..',
    'node_modules',
    '.bin',
    'biome'
  );

  // Check if biome exists in node_modules
  if (!fs.existsSync(biomeBin)) {
    console.warn('Biome not found in node_modules, skipping formatting');
    return;
  }

  const result = spawnSync(biomeBin, ['format', '--write', ...filePaths], {
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    throw new Error('Failed to format generated JSON files.');
  }
};

const getLocaleFromFilePath = (filepath) => {
  const relativePath = path.relative(BLOG_FOLDER, filepath);
  const firstSegment = relativePath.split(path.sep)[0];

  if (
    !firstSegment ||
    firstSegment.endsWith('.mdx') ||
    firstSegment.endsWith('.md')
  ) {
    return null;
  }

  return firstSegment;
};

// get data from markdown
const getData = (folder, groupDepth) => {
  const getPath = fs.readdirSync(folder);
  const removeIndex = getPath.filter((item) => !item.startsWith('_'));

  const getPaths = removeIndex.flatMap((filename) => {
    const filepath = path.join(folder, filename);
    const stats = fs.statSync(filepath);
    const isFolder = stats.isDirectory();

    if (isFolder) {
      return getData(filepath, groupDepth);
    }
    if (filename.endsWith('.md') || filename.endsWith('.mdx')) {
      const file = fs.readFileSync(filepath, 'utf-8');
      const { data, content } = matter(file);
      const pathParts = filepath.split(path.sep);
      const slug =
        data.slug ||
        pathParts
          .slice(CONTENT_DEPTH)
          .join('/')
          .replace(FILE_EXTENSION_REGEX, '');
      const group = pathParts[groupDepth];
      const locale = getLocaleFromFilePath(filepath);

      feed.item({
        title: data.title,
        description: data.summary,
        url: `${site_url}${slug}`,
        date: data.date,
      });

      return {
        group,
        slug,
        locale,
        frontmatter: data,
        content,
      };
    }
    return [];
  });

  const publishedPages = getPaths.filter(
    (page) => !page.frontmatter?.draft && page
  );
  return publishedPages;
};

try {
  // create folder if it doesn't exist
  if (!fs.existsSync(JSON_FOLDER)) {
    fs.mkdirSync(JSON_FOLDER);
  }

  // create json files
  const posts = getData(BLOG_FOLDER, 1);
  writeJsonFile(`${JSON_FOLDER}/posts.json`, posts);

  // merger json files for search
  const search = [...posts];
  writeJsonFile(`${JSON_FOLDER}/search.json`, search);
  formatJsonFiles([`${JSON_FOLDER}/posts.json`, `${JSON_FOLDER}/search.json`]);
  fs.writeFileSync(`${RSS_FOLDER}/rss.xml`, feed.xml({ indent: true }));
} catch (err) {
  console.error(err);
}
