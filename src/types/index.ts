export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  category?: string;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface SearchParams {
  q?: string;
  category?: string;
  country?: string;
  pageSize?: number;
  page?: number;
}

export interface AppState {
  articles: Article[];
  favorites: Article[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  activeCategory: string;
  darkMode: boolean;
}

export interface FavoritesState {
  items: Article[];
}

export interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  activeCategory: string;
  hasMore: boolean;
  page: number;
}

export interface ThemeState {
  darkMode: boolean;
}

export type Category = 'technology' | 'business' | 'sports' | 'general';