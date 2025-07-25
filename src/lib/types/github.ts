export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubReadme {
  content: string;
  encoding: string;
}

export interface RepoCardProps {
  repo: GitHubRepo;
  readme?: string;
  error?: string;
}
