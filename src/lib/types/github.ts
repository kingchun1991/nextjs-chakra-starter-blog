export interface GitHubRepo {
  description: string | null;
  forks_count: number;
  full_name: string;
  html_url: string;
  id: number;
  language: string | null;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  topics: Array<string>;
  updated_at: string;
}

export interface GitHubReadme {
  content: string;
  encoding: string;
}

export interface RepoCardProps {
  error?: string;
  readme?: string;
  repo: GitHubRepo;
}
