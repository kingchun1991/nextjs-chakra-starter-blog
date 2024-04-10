import { IconButton, ListItem, List } from '@chakra-ui/react';
import {
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaXTwitter,
} from 'react-icons/fa6';

import { baseUrl } from 'lib/constants/baseUrl';

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
    <List as="ul" display="flex" flexWrap="wrap">
      <ListItem display="inline-block">
        <IconButton
          aria-label="facebook share button"
          icon={<FaFacebook />}
          onClick={() =>
            window.open(
              `https://facebook.com/sharer/sharer.php?u=${baseUrl}/${slug}`,
              '_blank'
            )
          }
          variant="unstyled"
        />
      </ListItem>
      <ListItem display="inline-block">
        <IconButton
          aria-label="x share button"
          icon={<FaXTwitter />}
          onClick={() =>
            window.open(
              `https://x.com/share?url=${baseUrl}/${slug}&text=${title}`,
              '_blank'
            )
          }
          variant="unstyled"
        />
      </ListItem>
      <ListItem display="inline-block">
        <IconButton
          aria-label="linkedin share button"
          icon={<FaLinkedin />}
          onClick={() =>
            window.open(
              `https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}/${slug}&title=${title}&summary=${description}&source=${baseUrl}`,
              '_blank'
            )
          }
          variant="unstyled"
        />
      </ListItem>
      <ListItem display="inline-block">
        <IconButton
          aria-label="pinterest share button"
          icon={<FaPinterest />}
          onClick={() =>
            window.open(
              `https://pinterest.com/pin/create/button/?url=${baseUrl}/${slug}&media=&description=${description}`,
              '_blank'
            )
          }
          variant="unstyled"
        />
      </ListItem>
    </List>
  );
};

export default Share;
