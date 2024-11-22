import { Image } from '@chakra-ui/react';

import { Tooltip } from '@/components/ui/tooltip';

type HelperImageProps = {
  label?: string;
  src: string;
};

const size = 5;

const HelperImage = ({ label = '', src }: HelperImageProps) => {
  return (
    <Tooltip showArrow aria-label={label} content={label}>
      <Image
        src={src}
        alt={label}
        title={label}
        height={size}
        width={size}
        objectFit="contain"
      />
    </Tooltip>
  );
};

export default HelperImage;
