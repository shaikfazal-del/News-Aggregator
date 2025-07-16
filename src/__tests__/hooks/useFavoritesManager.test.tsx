import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useFavoritesManager } from '../../hooks/useFavoritesManager';
import { Article } from '../../types';
import newsReducer from '../../store/slices/newsSlice';
import favoritesReducer from '../../store/slices/favoritesSlice';
import themeReducer from '../../store/slices/themeSlice';

const mockArticle: Article = {
  id: '1',
  title: 'Test Article',
  description: 'Test Description',
  content: 'Test Content',
  url: 'https://example.com',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2023-01-01T00:00:00Z',
  source: {
    id: 'test-source',
    name: 'Test Source',
  },
  author: 'Test Author',
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      news: newsReducer,
      favorites: favoritesReducer,
      theme: themeReducer,
    },
    preloadedState: initialState,
  });
};

const wrapper = ({ children, store = createMockStore() }: any) => (
  <Provider store={store}>{children}</Provider>
);

describe('useFavoritesManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add article to favorites', () => {
    const { result } = renderHook(() => useFavoritesManager(), { wrapper });

    act(() => {
      result.current.addFavorite(mockArticle);
    });

    expect(result.current.favorites).toContain(mockArticle);
    expect(result.current.isFavorite('1')).toBe(true);
  });

  it('should remove article from favorites', () => {
    const store = createMockStore({
      favorites: { items: [mockArticle] },
    });

    const { result } = renderHook(() => useFavoritesManager(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    act(() => {
      result.current.removeFavorite('1');
    });

    expect(result.current.favorites).not.toContain(mockArticle);
    expect(result.current.isFavorite('1')).toBe(false);
  });

  it('should clear all favorites', () => {
    const store = createMockStore({
      favorites: { items: [mockArticle] },
    });

    const { result } = renderHook(() => useFavoritesManager(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    act(() => {
      result.current.clearFavorites();
    });

    expect(result.current.favorites).toHaveLength(0);
  });
});