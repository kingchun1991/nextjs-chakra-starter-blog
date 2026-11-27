import type { GitHubReadme, GitHubRepo } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchRepositories(
  username: string
): Promise<Array<GitHubRepo>> {
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
      .replace(/#{1,6}\s+/gu, '') // Remove headers
      .replace(/\*\*(?<text>.*?)\*\*/gu, '$<text>') // Remove bold
      .replace(/\*(?<text>.*?)\*/gu, '$<text>') // Remove italic
      .replace(/`(?<code>.*?)`/gu, '$<code>') // Remove inline code
      .replace(/\[(?<text>[^\]]{0,1000})\]\((?:[^)]{0,2000})\)/gu, '$<text>') // Convert links to text (ReDoS-safe)
      .replace(/\n{3,}/gu, '\n\n') // Normalize line breaks
      .trim();
  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
}
