const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const RSS = require('rss');

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
  site_url: site_url,
  feed_url: `${site_url}rss.xml`,
  image_url: `${site_url}next-app-chakra-ts.png`,
  pubDate: new Date(),
  copyright: `All rights reserved ${new Date().getFullYear()}`,
};

const feed = new RSS(feedOptions);
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
    } else if (filename.endsWith('.md') || filename.endsWith('.mdx')) {
      const file = fs.readFileSync(filepath, 'utf-8');
      const { data, content } = matter(file);
      const pathParts = filepath.split(path.sep);
      const slug =
        data.slug ||
        pathParts
          .slice(CONTENT_DEPTH)
          .join('/')
          .replace(/\.[^/.]+$/, '');
      const group = pathParts[groupDepth];

      feed.item({
        title: data.title,
        description: data.summary,
        url: `${site_url}${slug}`,
        date: data.date,
      });

      return {
        group: group,
        slug: slug,
        frontmatter: data,
        content: content,
      };
    } else {
      return [];
    }
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
  fs.writeFileSync(
    `${JSON_FOLDER}/posts.json`,
    JSON.stringify(getData(BLOG_FOLDER, 1))
  );

  // merger json files for search
  const posts = require(`../${JSON_FOLDER}/posts.json`);
  const search = [...posts];
  fs.writeFileSync(`${JSON_FOLDER}/search.json`, JSON.stringify(search));
  fs.writeFileSync(`${RSS_FOLDER}/rss.xml`, feed.xml({ indent: true }));
} catch (err) {
  console.error(err);
}
