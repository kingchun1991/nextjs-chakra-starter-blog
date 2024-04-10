import { IconButton, ListItem, List } from '@chakra-ui/react';
import {
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoTwitter,
} from 'react-icons/io5';

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
          icon={<IoLogoFacebook />}
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
          aria-label="twitter share button"
          icon={<IoLogoTwitter />}
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet/?text=${title}&amp;url=${baseUrl}/${slug}`,
              '_blank'
            )
          }
          variant="unstyled"
        />
      </ListItem>
      <ListItem display="inline-block">
        <IconButton
          aria-label="linkedin share button"
          icon={<IoLogoLinkedin />}
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
          icon={<IoLogoPinterest />}
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
