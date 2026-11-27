import { Box, HStack, IconButton } from '@chakra-ui/react';
import {
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaXTwitter,
} from 'react-icons/fa6';

import { siteConfig } from '@/site.config';

export function Share({
  title,
  description,
  slug,
}: {
  title: string;
  description?: string;
  slug: string;
}) {
  const postUrl = `${siteConfig.url}/blog/${slug}`;
  const shareLinks = [
    {
      label: 'facebook share button',
      href: `https://facebook.com/sharer/sharer.php?u=${postUrl}`,
      icon: <FaFacebook />,
    },
    {
      label: 'x share button',
      href: `https://x.com/share?url=${postUrl}&text=${title}`,
      icon: <FaXTwitter />,
    },
    {
      label: 'linkedin share button',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${title}&summary=${description}&source=${siteConfig.url}`,
      icon: <FaLinkedin />,
    },
    {
      label: 'pinterest share button',
      href: `https://pinterest.com/pin/create/button/?url=${postUrl}&media=&description=${description}`,
      icon: <FaPinterest />,
    },
  ];

  return (
    <HStack gap="6" wrap="wrap">
      {shareLinks.map(({ label, href, icon }) => (
        <Box display="inline-block" key={label}>
          <IconButton aria-label={label} asChild variant="plain">
            <a href={href} rel="noopener noreferrer" target="_blank">
              {icon}
            </a>
          </IconButton>
        </Box>
      ))}
    </HStack>
  );
}
