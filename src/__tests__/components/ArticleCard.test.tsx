import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ArticleCard } from '../../components/News/ArticleCard';
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

const renderWithProvider = (component: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('ArticleCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders article information correctly', () => {
    renderWithProvider(
      <ArticleCard article={mockArticle} onClick={mockOnClick} />
    );

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    renderWithProvider(
      <ArticleCard article={mockArticle} onClick={mockOnClick} />
    );

    fireEvent.click(screen.getByText('Test Article'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('handles favorite button click', () => {
    renderWithProvider(
      <ArticleCard article={mockArticle} onClick={mockOnClick} />
    );

    const favoriteButton = screen.getByLabelText('Toggle favorite');
    fireEvent.click(favoriteButton);
    
    // The onClick should not be called when clicking favorite button
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});