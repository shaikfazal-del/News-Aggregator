const BASE_URL = 'https://newsapi.org/v2';

// Using the API key provided by the user
const API_KEY = 'ADD_YOUR_API_KEY_HERE!!';

import { NewsAPIResponse, SearchParams } from '../types';

class NewsService {
  private async makeRequest(endpoint: string, params: Record<string, any>): Promise<NewsAPIResponse> {
    try {
      const url = new URL(`${BASE_URL}${endpoint}`);
      
      // Add API key to params
      params.apiKey = API_KEY;
      
      // Add all parameters to URL
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString());
        }
      });

      console.log('Making request to:', url.toString());

      const response = await fetch(url.toString());
      const data = await response.json();

      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (data.status !== 'ok') {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async getNews(params: SearchParams): Promise<NewsAPIResponse> {
    try {
      console.log('Fetching news with params:', params);

      // For free tier, use /everything endpoint with category-specific queries
      const categoryQueries: Record<string, string> = {
        technology: 'technology',
        business: 'business',
        sports: 'sports',
        general: 'news'
      };

      const query = params.category ? categoryQueries[params.category] || 'news' : 'news';
      
      // Calculate date range (free tier has 24-hour delay)
      const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const toDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const requestParams = {
        q: query,
        from: fromDate,
        to: toDate,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: Math.min(params.pageSize || 20, 100),
        page: params.page || 1
      };

      return await this.makeRequest('/everything', requestParams);
    } catch (error) {
      console.error('NewsAPI error:', error);
      
      if (error instanceof Error) {
        // Handle specific NewsAPI errors
        if (error.message.includes('rateLimited')) {
          throw new Error('API rate limit exceeded (100 requests/day). Please try again tomorrow.');
        }
        if (error.message.includes('apiKeyInvalid')) {
          throw new Error('Invalid API key. Please check your NewsAPI configuration.');
        }
        if (error.message.includes('corsNotAllowed') || error.message.includes('not allowed on the Developer plan')) {
          throw new Error('API key not configured for browser requests. Please get a new API key from https://newsapi.org/register that supports localhost requests.');
        }
        throw new Error(`Failed to fetch news: ${error.message}`);
      }
      
      throw new Error('Failed to fetch news: Unknown error');
    }
  }

  async searchNews(params: SearchParams): Promise<NewsAPIResponse> {
    try {
      if (!params.q || params.q.trim() === '') {
        throw new Error('Search query is required');
      }

      console.log('Searching news with query:', params.q);

      // Search up to a month old (free tier limit)
      const fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const requestParams = {
        q: params.q,
        from: fromDate,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: Math.min(params.pageSize || 20, 100),
        page: params.page || 1
      };

      return await this.makeRequest('/everything', requestParams);
    } catch (error) {
      console.error('NewsAPI search error:', error);
      
      if (error instanceof Error) {
        // Handle specific NewsAPI errors
        if (error.message.includes('rateLimited')) {
          throw new Error('API rate limit exceeded (100 requests/day). Please try again tomorrow.');
        }
        if (error.message.includes('apiKeyInvalid')) {
          throw new Error('Invalid API key. Please check your NewsAPI configuration.');
        }
        if (error.message.includes('corsNotAllowed') || error.message.includes('not allowed on the Developer plan')) {
          throw new Error('API key not configured for browser requests. Please get a new API key from https://newsapi.org/register that supports localhost requests.');
        }
        throw new Error(`Failed to search news: ${error.message}`);
      }
      
      throw new Error('Failed to search news: Unknown error');
    }
  }

  // Get available news sources (optional feature)
  async getSources(params: { category?: string; language?: string; country?: string } = {}) {
    try {
      const requestParams = {
        category: params.category,
        language: params.language || 'en',
        country: params.country
      };

      return await this.makeRequest('/sources', requestParams);
    } catch (error) {
      console.error('NewsAPI sources error:', error);
      throw error;
    }
  }
}

export const newsService = new NewsService();
