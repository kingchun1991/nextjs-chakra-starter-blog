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
    <Box borderRadius="md" borderWidth="1px" mt={8} p={4}>
      <Heading mb={3} size="sm">
        Referenced by {backlinks.length}{' '}
        {backlinks.length === 1 ? 'item' : 'items'}
      </Heading>
      <List.Root>
        {backlinks.map((backlinkSlug) => (
          <List.Item key={backlinkSlug}>
            <Link color="blue.500" href={`/directory/${backlinkSlug}`}>
              {backlinkSlug}
            </Link>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
