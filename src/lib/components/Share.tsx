import { Box, HStack, IconButton } from '@chakra-ui/react';
import {
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaXTwitter,
} from 'react-icons/fa6';

import { baseUrl } from '@/lib/constants/baseUrl';

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
              `https://facebook.com/sharer/sharer.php?u=${baseUrl}${slug}`,
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
              `https://x.com/share?url=${baseUrl}${slug}&text=${title}`,
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
              `https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}${slug}&title=${title}&summary=${description}&source=${baseUrl}`,
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
              `https://pinterest.com/pin/create/button/?url=${baseUrl}${slug}&media=&description=${description}`,
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
