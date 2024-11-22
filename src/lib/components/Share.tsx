import { Box, HStack, IconButton } from '@chakra-ui/react';
import {
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaXTwitter,
} from 'react-icons/fa6';

import { siteConfig } from '@/site.config';

const Share = ({
  title,
  description,
  slug,
}: {
  title: string;
  description?: string;
  slug: string;
}) => {
  return (
    <HStack gap="6" wrap="wrap">
      <Box display="inline-block">
        <IconButton
          aria-label="facebook share button"
          onClick={() =>
            window.open(
              `https://facebook.com/sharer/sharer.php?u=${siteConfig.url}/blog/${slug}`,
              '_blank'
            )
          }
          variant="plain"
        >
          <FaFacebook />
        </IconButton>
      </Box>
      <Box display="inline-block">
        <IconButton
          aria-label="x share button"
          onClick={() =>
            window.open(
              `https://x.com/share?url=${siteConfig.url}/blog/${slug}&text=${title}`,
              '_blank'
            )
          }
          variant="plain"
        >
          <FaXTwitter />
        </IconButton>
      </Box>
      <Box display="inline-block">
        <IconButton
          aria-label="linkedin share button"
          onClick={() =>
            window.open(
              `https://www.linkedin.com/shareArticle?mini=true&url=${siteConfig.url}/blog/${slug}&title=${title}&summary=${description}&source=${siteConfig.url}`,
              '_blank'
            )
          }
          variant="plain"
        >
          <FaLinkedin />
        </IconButton>
      </Box>
      <Box display="inline-block">
        <IconButton
          aria-label="pinterest share button"
          onClick={() =>
            window.open(
              `https://pinterest.com/pin/create/button/?url=${siteConfig.url}/blog/${slug}&media=&description=${description}`,
              '_blank'
            )
          }
          variant="plain"
        >
          <FaPinterest />
        </IconButton>
      </Box>
    </HStack>
  );
};

export default Share;
