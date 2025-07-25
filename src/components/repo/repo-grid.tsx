'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
  Icon,
  Text,
  Heading,
} from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';
import { fetchRepositories, fetchReadme } from '../../lib/github/github-api';
import RepoCard from './repo-card';
import type { GitHubRepo } from '../../lib/types/github';

interface RepoGridProps {
  username: string;
}

interface RepoWithContent {
  repo: GitHubRepo;
  readme?: string | null;
  error?: string;
}

function RepoCardSkeleton() {
  return (
    <Box
      h="full"
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
    >
      <Box p={6}>
        <Stack gap={4}>
          <Stack gap={2}>
            <Skeleton height="6" width="75%" />
            <Skeleton height="4" width="100%" />
            <Skeleton height="4" width="66%" />
          </Stack>
          <Stack direction="row" gap={2}>
            <Skeleton height="5" width="16" />
            <Skeleton height="5" width="12" />
            <Skeleton height="5" width="12" />
          </Stack>
          <Stack gap={2}>
            <Skeleton height="4" width="24" />
            <SkeletonText mt={2} noOfLines={4} />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default function RepoGrid({ username }: RepoGridProps) {
  const [repos, setRepos] = useState<RepoWithContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const repositories = await fetchRepositories(username);

        if (!isMounted) return;

        // Fetch README for each repository
        const reposWithReadme = await Promise.all(
          repositories.map(async (repo) => {
            try {
              const readme = await fetchReadme(repo.owner.login, repo.name);
              return {
                repo,
                readme,
                error: readme ? undefined : 'README not found',
              };
            } catch {
              return {
                repo,
                readme: undefined,
                error: 'Failed to load README',
              };
            }
          })
        );

        if (isMounted) {
          setRepos(reposWithReadme);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load repositories');
          console.error('Error fetching repositories:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {Array.from({ length: 6 }).map((_, i) => (
          <RepoCardSkeleton key={i} />
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        <Box width="full" textAlign="center" py={12} gridColumn="1 / -1">
          <Icon as={FiAlertCircle} boxSize={12} color="red.500" mb={4} />
          <Heading size="md" mb={2}>
            Failed to load repositories
          </Heading>
          <Text color="gray.500">
            Unable to fetch repositories from GitHub API. Please try again
            later.
          </Text>
        </Box>
      </SimpleGrid>
    );
  }

  if (repos.length === 0) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        <Box width="full" textAlign="center" py={12} gridColumn="1 / -1">
          <Icon as={FiAlertCircle} boxSize={12} color="gray.400" mb={4} />
          <Heading size="md" mb={2}>
            No repositories found
          </Heading>
          <Text color="gray.500">
            {`No public repositories found for user "${username}"`}
          </Text>
        </Box>
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
      {repos.map(({ repo, readme, error }) => (
        <RepoCard
          key={repo.id}
          repo={repo}
          readme={readme || undefined}
          error={error}
        />
      ))}
    </SimpleGrid>
  );
}
