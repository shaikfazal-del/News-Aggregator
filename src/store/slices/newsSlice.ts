import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Article, NewsState, SearchParams } from '../../types';
import { newsService } from '../../services/newsService';

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  searchQuery: '',
  activeCategory: 'technology',
  hasMore: true,
  page: 1,
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (params: SearchParams) => {
    const response = await newsService.getNews(params);
    return response.articles;
  }
);

export const searchNews = createAsyncThunk(
  'news/searchNews',
  async (params: SearchParams) => {
    const response = await newsService.searchNews(params);
    return response.articles;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
      state.page = 1;
      state.hasMore = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetNews: (state) => {
      state.articles = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.map((article, index) => ({
          ...article,
          id: `${article.url}-${index}`,
        }));
        state.hasMore = action.payload.length === 20;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      })
      .addCase(searchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.map((article, index) => ({
          ...article,
          id: `${article.url}-${index}`,
        }));
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search news';
      });
  },
});

export const { setSearchQuery, setActiveCategory, clearError, resetNews } = newsSlice.actions;
export default newsSlice.reducer;