'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Link } from '@/components/ui/link';
import { Tooltip } from '@/components/ui/tooltip';

interface WikiLinkProps {
  slug: string;
  broken?: boolean;
  children?: React.ReactNode;
}

export function WikiLink({ slug, broken = false, children }: WikiLinkProps) {
  const [_itemData, _setItemData] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span>{children || slug}</span>;
  }

  if (broken) {
    return (
      <Tooltip content={`Broken link: ${slug}`}>
        <Box
          as="span"
          color="red.500"
          textDecoration="underline"
          textDecorationStyle="wavy"
          cursor="help"
        >
          {children || slug}
        </Box>
      </Tooltip>
    );
  }

  return (
    <Link
      href={`/directory/${slug}`}
      color="blue.500"
      _dark={{ color: 'blue.400' }}
      textDecoration="underline"
      _hover={{
        color: 'blue.600',
        _dark: { color: 'blue.300' },
      }}
    >
      {children || slug}
    </Link>
  );
}
