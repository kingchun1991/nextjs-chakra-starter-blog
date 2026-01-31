'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  FiAlertCircle,
  FiBook,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCopy,
  FiExternalLink,
  FiMaximize2,
  FiStar,
  FiX,
} from 'react-icons/fi';
import { LuGitFork } from 'react-icons/lu';

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';

import type { RepoCardProps } from '../../lib/types/github';

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#fa7343',
  Kotlin: '#A97BFF',
};

export default function RepoCard({ repo, readme, error }: RepoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return '1 day ago';
    }
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    }
    if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months ago`;
    }
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength)}...`;
  };

  // Enhanced markdown-like formatting for modal content
  const formatReadmeContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Use a combination of index and line content for a more stable key
      const lineKey = `${index}-${line.slice(0, 20).replace(/\s/g, '-')}`;

      // Headers
      if (line.startsWith('# ')) {
        return (
          <Heading
            _first={{ mt: 0 }}
            as="h1"
            key={lineKey}
            mb={4}
            mt={6}
            size="xl"
          >
            {line.slice(2)}
          </Heading>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <Heading as="h2" key={lineKey} mb={3} mt={5} size="lg">
            {line.slice(3)}
          </Heading>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <Heading as="h3" key={lineKey} mb={2} mt={4} size="md">
            {line.slice(4)}
          </Heading>
        );
      }

      // Code blocks
      if (line.startsWith('```')) {
        return (
          <Box
            _dark={{ bg: 'gray.700' }}
            bg="gray.100"
            borderRadius="md"
            fontFamily="mono"
            fontSize="sm"
            key={lineKey}
            my={2}
            p={3}
          >
            {line}
          </Box>
        );
      }

      // Lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <Text as="li" key={lineKey} mb={1} ml={4}>
            {line.slice(2)}
          </Text>
        );
      }

      // Empty lines create spacing
      if (line.trim() === '') {
        return <Box h={2} key={lineKey} />;
      }

      // Regular text
      return (
        <Text key={lineKey} lineHeight="tall" mb={2}>
          {line}
        </Text>
      );
    });
  };

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(readme || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [readme]);

  // Handle keyboard shortcuts in modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (modalOpen && event.key === 'c' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        handleCopy();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, handleCopy]);

  const readmePreview = readme ? truncateText(readme, 300) : null;
  const hasMoreContent = readme && readme.length > 300;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button, a')) {
      return;
    }

    if (readme && !error) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <Box
        _dark={{
          bg: 'gray.800',
          borderColor: 'gray.700',
          _hover: {
            bg: 'gray.700',
          },
        }}
        _hover={{
          boxShadow: 'lg',
          bg: 'gray.50',
          transform: readme && !error ? 'scale(1.02)' : 'none',
        }}
        bg="white"
        borderColor="gray.200"
        borderRadius="lg"
        borderWidth="1px"
        cursor={readme && !error ? 'pointer' : 'default'}
        h="full"
        onClick={handleCardClick}
        overflow="hidden"
        transition="all 0.2s"
      >
        {/* Card Header */}
        <Box p={4} pb={3}>
          <Flex alignItems="flex-start" gap={2} justifyContent="space-between">
            <Box flex="1" minW="0">
              <Heading mb={1} size="md">
                <Text as="span" color="blue.500">
                  {repo.owner.login}
                </Text>
                <Text as="span" color="gray.500">
                  /
                </Text>
                <Text as="span">{repo.name}</Text>
              </Heading>
              {repo.description && (
                <Text
                  _dark={{ color: 'gray.400' }}
                  color="gray.600"
                  fontSize="sm"
                  mt={1}
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {repo.description}
                </Text>
              )}
            </Box>
            <Flex alignItems="center" gap={2}>
              <Badge
                _dark={{ bg: 'gray.700', color: 'gray.200' }}
                bg="gray.100"
                borderRadius="full"
                color="gray.800"
                fontSize="xs"
                px={2}
                py={1}
              >
                Public
              </Badge>
              {readme && !error && (
                <Text
                  alignItems="center"
                  color="gray.500"
                  display="flex"
                  fontSize="xs"
                  gap={1}
                >
                  <Icon as={FiMaximize2} boxSize={3} />
                  Click to expand
                </Text>
              )}
            </Flex>
          </Flex>

          {/* Repository Stats */}
          <Stack
            _dark={{ color: 'gray.400' }}
            color="gray.600"
            direction="row"
            flexWrap="wrap"
            fontSize="sm"
            gap={3}
            mt={3}
          >
            {repo.language && (
              <Stack align="center" direction="row" gap={1}>
                <Box
                  bg={languageColors[repo.language] || 'gray.500'}
                  borderRadius="full"
                  h={3}
                  w={3}
                />
                <Text>{repo.language}</Text>
              </Stack>
            )}
            <Stack align="center" direction="row" gap={1}>
              <Icon as={FiStar} boxSize={4} />
              <Text fontWeight="medium">
                {repo.stargazers_count.toLocaleString()}
              </Text>
            </Stack>
            <Stack align="center" direction="row" gap={1}>
              <Icon as={LuGitFork} boxSize={4} />
              <Text>{repo.forks_count.toLocaleString()}</Text>
            </Stack>
            <Text display={{ base: 'none', sm: 'inline' }}>
              Updated {formatDate(repo.updated_at)}
            </Text>
          </Stack>

          {/* Topics */}
          {repo.topics.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
              {repo.topics.slice(0, 3).map((topic) => (
                <Badge
                  fontSize="xs"
                  key={topic}
                  px={2}
                  py={0.5}
                  variant="outline"
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics.length > 3 && (
                <Badge fontSize="xs" px={2} py={0.5} variant="outline">
                  +{repo.topics.length - 3}
                </Badge>
              )}
            </Stack>
          )}
        </Box>

        {/* Divider */}
        <Box _dark={{ bg: 'gray.700' }} bg="gray.200" h="1px" />

        {/* Card Body - README Section */}
        <Box p={4}>
          <Stack gap={3}>
            <Stack align="center" direction="row" gap={2}>
              <Icon as={FiBook} boxSize={4} />
              <Text fontSize="sm" fontWeight="medium">
                README.md
              </Text>
            </Stack>

            {error && (
              <Stack
                _dark={{ color: 'gray.400', bg: 'gray.700' }}
                bg="gray.50"
                borderRadius="md"
                color="gray.600"
                direction="row"
                fontSize="sm"
                gap={2}
                p={3}
              >
                <Icon as={FiAlertCircle} boxSize={4} color="yellow.500" />
                <Text>README not available</Text>
              </Stack>
            )}

            {readmePreview && (
              <Box>
                <Text
                  _dark={{ color: 'gray.400' }}
                  color="gray.600"
                  fontSize="sm"
                  lineHeight="tall"
                  style={
                    isExpanded
                      ? {}
                      : {
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }
                  }
                  transition="all 0.2s"
                >
                  {isExpanded ? readme : readmePreview}
                </Text>

                {hasMoreContent && (
                  <Button
                    fontSize="xs"
                    height="8"
                    mt={2}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <Icon
                      as={isExpanded ? FiChevronUp : FiChevronDown}
                      mr={1}
                    />
                    {isExpanded ? 'Show less' : 'Show more'}
                  </Button>
                )}
              </Box>
            )}

            {!(readmePreview || error) && (
              <Text color="gray.500" fontSize="sm" fontStyle="italic">
                Loading README...
              </Text>
            )}
          </Stack>
        </Box>

        {/* Divider */}
        <Box _dark={{ bg: 'gray.700' }} bg="gray.200" h="1px" />

        {/* Card Footer */}
        <Box p={4}>
          <Stack direction="row" gap={2} width="full">
            <Button asChild colorScheme="blue" flex="1" size="sm">
              <a
                href={repo.html_url}
                onClick={(e) => e.stopPropagation()}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon as={FiStar} mr={1} />
                Star
              </a>
            </Button>
            <Button asChild flex="1" size="sm" variant="outline">
              <a
                href={`${repo.html_url}/fork`}
                onClick={(e) => e.stopPropagation()}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon as={LuGitFork} mr={1} />
                Fork
              </a>
            </Button>
            <IconButton
              aria-label="View on GitHub"
              asChild
              size="sm"
              variant="outline"
            >
              <a
                href={repo.html_url}
                onClick={(e) => e.stopPropagation()}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon as={FiExternalLink} />
              </a>
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* Full README Modal */}
      <DialogRoot
        onOpenChange={({ open }) => setModalOpen(open)}
        open={modalOpen}
        size="xl"
      >
        <DialogContent maxH="90vh">
          <DialogHeader
            _dark={{ bg: 'gray.900', borderColor: 'gray.700' }}
            bg="gray.50"
            borderBottomWidth="1px"
            borderColor="gray.200"
            py={4}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Stack align="center" direction="row" gap={3}>
                <Stack align="center" direction="row" gap={2}>
                  <Image
                    alt={repo.owner.login}
                    borderRadius="full"
                    boxSize="6"
                    src={repo.owner.avatar_url}
                  />
                  <DialogTitle>
                    {repo.owner.login}/{repo.name}
                  </DialogTitle>
                </Stack>
                <Badge fontSize="xs" variant="outline">
                  README.md
                </Badge>
              </Stack>

              <Stack align="center" direction="row" gap={2}>
                <Button onClick={handleCopy} size="sm" variant="ghost">
                  <Icon as={copied ? FiCheck : FiCopy} mr={1} />
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <DialogCloseTrigger>
                  <IconButton aria-label="Close" size="sm" variant="ghost">
                    <Icon as={FiX} />
                  </IconButton>
                </DialogCloseTrigger>
              </Stack>
            </Flex>
            <Text color="gray.500" fontSize="sm" mt={2}>
              Press <kbd>Esc</kbd> to close • <kbd>Ctrl+C</kbd> to copy content
            </Text>
          </DialogHeader>

          <DialogBody overflowY="auto" p={6}>
            {readme ? (
              <Box>{formatReadmeContent(readme)}</Box>
            ) : (
              <Flex
                alignItems="center"
                color="gray.500"
                justifyContent="center"
                py={12}
              >
                <Icon as={FiAlertCircle} boxSize={8} mr={3} />
                <Text>README content not available</Text>
              </Flex>
            )}
          </DialogBody>

          <DialogFooter
            _dark={{ bg: 'gray.900', borderColor: 'gray.700' }}
            bg="gray.50"
            borderColor="gray.200"
            borderTopWidth="1px"
            py={4}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="full"
            >
              <Stack color="gray.500" direction="row" fontSize="sm" gap={4}>
                <Stack align="center" direction="row" gap={1}>
                  <Icon as={FiStar} boxSize={4} />
                  <Text>{repo.stargazers_count.toLocaleString()} stars</Text>
                </Stack>
                <Stack align="center" direction="row" gap={1}>
                  <Icon as={LuGitFork} boxSize={4} />
                  <Text>{repo.forks_count.toLocaleString()} forks</Text>
                </Stack>
                {repo.language && (
                  <Stack align="center" direction="row" gap={1}>
                    <Box
                      bg={languageColors[repo.language] || 'gray.500'}
                      borderRadius="full"
                      h={3}
                      w={3}
                    />
                    <Text>{repo.language}</Text>
                  </Stack>
                )}
              </Stack>

              <Button asChild size="sm" variant="outline">
                <a
                  href={repo.html_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View on GitHub
                  <Icon as={FiExternalLink} ml={1} />
                </a>
              </Button>
            </Flex>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
