/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "nextjs-chakra-mdx",
  titleTemplate: "%s | nextjs-chakra-mdx",
  defaultTitle: "nextjs-chakra-mdx",
  description: "Next.js + chakra-ui + TypeScript template",
  canonical: "https://nextjs-chakra-mdx.vercel.app/",
  openGraph: {
    url: "https://nextjs-chakra-mdx.vercel.app/",
    title: "nextjs-chakra-mdx",
    description: "Next.js + chakra-ui + TypeScript template",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextjs-chakra-mdx**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "nextjs-chakra-mdx og-image",
      },
    ],
    site_name: "nextjs-chakra-mdx",
  },
  twitter: {
    handle: "@sozonome",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
