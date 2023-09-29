export interface UserSession {
  sessionLocation?: {
    display: string;
  };
}

export interface SearchedApp {
  app: string;
  icon: string;
  link: string;
}

export interface AppSearchResponse {
  data?: Array<SearchedApp>;
}
