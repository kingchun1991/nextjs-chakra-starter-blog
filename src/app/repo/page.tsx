'use client';

import type React from 'react';

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FiGithub, FiSearch } from 'react-icons/fi';
import RepoGrid from '../../components/repo/repo-grid';
import { useState } from 'react';

export default function Page() {
  const [username, setUsername] = useState('shadcn');
  const [searchInput, setSearchInput] = useState('shadcn');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(searchInput);
  };

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <Container maxW="container.xl" py={8} px={4}>
        <Flex direction="column" align="center" mb={8}>
          <HStack gap={2} mb={4}>
            <Icon as={FiGithub} boxSize={8} />
            <Heading size="xl">GitHub Repository Explorer</Heading>
          </HStack>
          <Text color="gray.500" maxW="2xl" textAlign="center">
            Discover and explore GitHub repositories with detailed information,
            star counts, and README previews.
          </Text>
        </Flex>

        <Box
          maxW="md"
          mx="auto"
          mb={8}
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="lg"
          p={6}
          _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
        >
          <Box mb={4}>
            <Heading size="md" mb={1}>
              Search Repositories
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Enter a GitHub username to view their repositories
            </Text>
          </Box>
          <form onSubmit={handleSubmit}>
            <HStack gap={2}>
              <Input
                placeholder="Enter GitHub username..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                flex="1"
              />
              <Button type="submit" aria-label="Search">
                <Icon as={FiSearch} />
              </Button>
            </HStack>
          </form>
        </Box>

        <RepoGrid username={username} />
      </Container>
    </Box>
  );
}
