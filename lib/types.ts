export type GitHubUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type GitHubProfile = {
  id: string;
  login: string;
  bio?: string;
};
