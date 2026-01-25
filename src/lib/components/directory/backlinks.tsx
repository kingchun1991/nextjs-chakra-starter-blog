'use client';

import { Box, Heading, List } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Link } from '@/components/ui/link';

interface BacklinksProps {
  slug: string;
}

export function Backlinks({ slug }: BacklinksProps) {
  const [backlinks, setBacklinks] = useState<Array<string>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    fetch('/.json/directory-graph.json')
      .then((res) => res.json())
      .then((data) => {
        const links = data.backlinks?.[slug] || [];
        setBacklinks(links);
      })
      .catch((error) => {
        console.error('Failed to load backlinks:', error);
      });
  }, [slug]);

  if (!mounted || backlinks.length === 0) {
    return null;
  }

  return (
    <Box mt={8} p={4} borderWidth="1px" borderRadius="md">
      <Heading size="sm" mb={3}>
        Referenced by {backlinks.length}{' '}
        {backlinks.length === 1 ? 'item' : 'items'}
      </Heading>
      <List.Root>
        {backlinks.map((backlinkSlug) => (
          <List.Item key={backlinkSlug}>
            <Link href={`/directory/${backlinkSlug}`} color="blue.500">
              {backlinkSlug}
            </Link>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
