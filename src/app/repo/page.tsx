'use client';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
} from '@chakra-ui/react';
import type React from 'react';
import { useState } from 'react';
import { FiGithub, FiSearch } from 'react-icons/fi';

import RepoGrid from '../../components/repo/repo-grid';

export default function Page() {
  const [username, setUsername] = useState('shadcn');
  const [searchInput, setSearchInput] = useState('shadcn');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(searchInput);
  };

  return (
    <Box _dark={{ bg: 'gray.900' }} bg="gray.50" minH="100vh">
      <Container maxW="container.xl" px={4} py={8}>
        <Flex align="center" direction="column" mb={8}>
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
          _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
          bg="white"
          borderColor="gray.200"
          borderRadius="lg"
          borderWidth="1px"
          maxW="md"
          mb={8}
          mx="auto"
          p={6}
        >
          <Box mb={4}>
            <Heading mb={1} size="md">
              Search Repositories
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Enter a GitHub username to view their repositories
            </Text>
          </Box>
          <form onSubmit={handleSubmit}>
            <HStack gap={2}>
              <Input
                flex="1"
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter GitHub username..."
                value={searchInput}
              />
              <Button aria-label="Search" type="submit">
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
