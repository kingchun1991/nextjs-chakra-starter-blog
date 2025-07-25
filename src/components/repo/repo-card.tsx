'use client';

import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Badge,
  Button,
  Flex,
  Heading,
  Stack,
  Icon,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import {
  FiBook,
  FiChevronDown,
  FiChevronUp,
  FiCopy,
  FiExternalLink,
  FiStar,
  FiAlertCircle,
  FiCheck,
  FiMaximize2,
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

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Enhanced markdown-like formatting for modal content
  const formatReadmeContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <Heading
            key={index}
            as="h1"
            size="xl"
            mt={6}
            mb={4}
            _first={{ mt: 0 }}
          >
            {line.slice(2)}
          </Heading>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <Heading key={index} as="h2" size="lg" mt={5} mb={3}>
            {line.slice(3)}
          </Heading>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <Heading key={index} as="h3" size="md" mt={4} mb={2}>
            {line.slice(4)}
          </Heading>
        );
      }

      // Code blocks
      if (line.startsWith('```')) {
        return (
          <Box
            key={index}
            bg="gray.100"
            _dark={{ bg: 'gray.700' }}
            p={3}
            borderRadius="md"
            fontFamily="mono"
            fontSize="sm"
            my={2}
          >
            {line}
          </Box>
        );
      }

      // Lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <Text key={index} as="li" ml={4} mb={1}>
            {line.slice(2)}
          </Text>
        );
      }

      // Empty lines create spacing
      if (line.trim() === '') {
        return <Box key={index} h={2} />;
      }

      // Regular text
      return (
        <Text key={index} mb={2} lineHeight="tall">
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
      if (modalOpen) {
        if (event.key === 'c' && (event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          handleCopy();
        }
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
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
        transition="all 0.2s"
        _hover={{
          boxShadow: 'lg',
          bg: 'gray.50',
          transform: readme && !error ? 'scale(1.02)' : 'none',
        }}
        _dark={{
          bg: 'gray.800',
          borderColor: 'gray.700',
          _hover: {
            bg: 'gray.700',
          },
        }}
        h="full"
        cursor={readme && !error ? 'pointer' : 'default'}
        onClick={handleCardClick}
      >
        {/* Card Header */}
        <Box p={4} pb={3}>
          <Flex justifyContent="space-between" alignItems="flex-start" gap={2}>
            <Box flex="1" minW="0">
              <Heading size="md" mb={1}>
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
                  color="gray.600"
                  _dark={{ color: 'gray.400' }}
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
                bg="gray.100"
                color="gray.800"
                _dark={{ bg: 'gray.700', color: 'gray.200' }}
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
              >
                Public
              </Badge>
              {readme && !error && (
                <Text
                  fontSize="xs"
                  color="gray.500"
                  display="flex"
                  alignItems="center"
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
            direction="row"
            mt={3}
            gap={3}
            color="gray.600"
            _dark={{ color: 'gray.400' }}
            fontSize="sm"
            flexWrap="wrap"
          >
            {repo.language && (
              <Stack direction="row" align="center" gap={1}>
                <Box
                  w={3}
                  h={3}
                  borderRadius="full"
                  bg={languageColors[repo.language] || 'gray.500'}
                />
                <Text>{repo.language}</Text>
              </Stack>
            )}
            <Stack direction="row" align="center" gap={1}>
              <Icon as={FiStar} boxSize={4} />
              <Text fontWeight="medium">
                {repo.stargazers_count.toLocaleString()}
              </Text>
            </Stack>
            <Stack direction="row" align="center" gap={1}>
              <Icon as={LuGitFork} boxSize={4} />
              <Text>{repo.forks_count.toLocaleString()}</Text>
            </Stack>
            <Text display={{ base: 'none', sm: 'inline' }}>
              Updated {formatDate(repo.updated_at)}
            </Text>
          </Stack>

          {/* Topics */}
          {repo.topics.length > 0 && (
            <Stack direction="row" mt={2} gap={1} flexWrap="wrap">
              {repo.topics.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="outline"
                  fontSize="xs"
                  px={2}
                  py={0.5}
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics.length > 3 && (
                <Badge variant="outline" fontSize="xs" px={2} py={0.5}>
                  +{repo.topics.length - 3}
                </Badge>
              )}
            </Stack>
          )}
        </Box>

        {/* Divider */}
        <Box h="1px" bg="gray.200" _dark={{ bg: 'gray.700' }} />

        {/* Card Body - README Section */}
        <Box p={4}>
          <Stack gap={3}>
            <Stack direction="row" align="center" gap={2}>
              <Icon as={FiBook} boxSize={4} />
              <Text fontWeight="medium" fontSize="sm">
                README.md
              </Text>
            </Stack>

            {error && (
              <Stack
                direction="row"
                gap={2}
                fontSize="sm"
                color="gray.600"
                bg="gray.50"
                p={3}
                borderRadius="md"
                _dark={{ color: 'gray.400', bg: 'gray.700' }}
              >
                <Icon as={FiAlertCircle} boxSize={4} color="yellow.500" />
                <Text>README not available</Text>
              </Stack>
            )}

            {readmePreview && (
              <Box>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: 'gray.400' }}
                  lineHeight="tall"
                  transition="all 0.2s"
                  style={
                    !isExpanded
                      ? {
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }
                      : {}
                  }
                >
                  {isExpanded ? readme : readmePreview}
                </Text>

                {hasMoreContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                    mt={2}
                    fontSize="xs"
                    height="8"
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

            {!readmePreview && !error && (
              <Text fontSize="sm" color="gray.500" fontStyle="italic">
                Loading README...
              </Text>
            )}
          </Stack>
        </Box>

        {/* Divider */}
        <Box h="1px" bg="gray.200" _dark={{ bg: 'gray.700' }} />

        {/* Card Footer */}
        <Box p={4}>
          <Stack direction="row" gap={2} width="full">
            <Button asChild flex="1" size="sm" colorScheme="blue">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon as={FiStar} mr={1} />
                Star
              </a>
            </Button>
            <Button asChild flex="1" size="sm" variant="outline">
              <a
                href={`${repo.html_url}/fork`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon as={LuGitFork} mr={1} />
                Fork
              </a>
            </Button>
            <IconButton
              asChild
              aria-label="View on GitHub"
              size="sm"
              variant="outline"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon as={FiExternalLink} />
              </a>
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* Full README Modal */}
      <DialogRoot
        open={modalOpen}
        onOpenChange={({ open }) => setModalOpen(open)}
        size="xl"
      >
        <DialogContent maxH="90vh">
          <DialogHeader
            bg="gray.50"
            borderBottomWidth="1px"
            borderColor="gray.200"
            _dark={{ bg: 'gray.900', borderColor: 'gray.700' }}
            py={4}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Stack direction="row" gap={3} align="center">
                <Stack direction="row" gap={2} align="center">
                  <Image
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    boxSize="6"
                    borderRadius="full"
                  />
                  <DialogTitle>
                    {repo.owner.login}/{repo.name}
                  </DialogTitle>
                </Stack>
                <Badge variant="outline" fontSize="xs">
                  README.md
                </Badge>
              </Stack>

              <Stack direction="row" gap={2} align="center">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Icon as={copied ? FiCheck : FiCopy} mr={1} />
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <DialogCloseTrigger>
                  <IconButton variant="ghost" size="sm" aria-label="Close">
                    <Icon as={FiX} />
                  </IconButton>
                </DialogCloseTrigger>
              </Stack>
            </Flex>
            <Text fontSize="sm" color="gray.500" mt={2}>
              Press <kbd>Esc</kbd> to close • <kbd>Ctrl+C</kbd> to copy content
            </Text>
          </DialogHeader>

          <DialogBody p={6} overflowY="auto">
            {readme ? (
              <Box>{formatReadmeContent(readme)}</Box>
            ) : (
              <Flex
                alignItems="center"
                justifyContent="center"
                py={12}
                color="gray.500"
              >
                <Icon as={FiAlertCircle} boxSize={8} mr={3} />
                <Text>README content not available</Text>
              </Flex>
            )}
          </DialogBody>

          <DialogFooter
            bg="gray.50"
            borderTopWidth="1px"
            borderColor="gray.200"
            _dark={{ bg: 'gray.900', borderColor: 'gray.700' }}
            py={4}
          >
            <Flex
              justifyContent="space-between"
              width="full"
              alignItems="center"
            >
              <Stack direction="row" gap={4} color="gray.500" fontSize="sm">
                <Stack direction="row" align="center" gap={1}>
                  <Icon as={FiStar} boxSize={4} />
                  <Text>{repo.stargazers_count.toLocaleString()} stars</Text>
                </Stack>
                <Stack direction="row" align="center" gap={1}>
                  <Icon as={LuGitFork} boxSize={4} />
                  <Text>{repo.forks_count.toLocaleString()} forks</Text>
                </Stack>
                {repo.language && (
                  <Stack direction="row" align="center" gap={1}>
                    <Box
                      w={3}
                      h={3}
                      borderRadius="full"
                      bg={languageColors[repo.language] || 'gray.500'}
                    />
                    <Text>{repo.language}</Text>
                  </Stack>
                )}
              </Stack>

              <Button asChild variant="outline" size="sm">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
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
