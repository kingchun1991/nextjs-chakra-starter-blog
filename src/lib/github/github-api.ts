import type { GitHubRepo, GitHubReadme } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchRepositories(
  username: string
): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=stars&per_page=6`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

export async function fetchReadme(
  owner: string,
  repo: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data: GitHubReadme = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    // Simple markdown to text conversion for preview
    return content
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text (safe regex)
      .replace(/\n{3,}/g, '\n\n') // Normalize line breaks
      .trim();
  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
}
