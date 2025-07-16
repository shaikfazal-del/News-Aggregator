import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, FavoritesState } from '../../types';

const loadFavoritesFromStorage = (): Article[] => {
  try {
    const stored = localStorage.getItem('news-favorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (favorites: Article[]) => {
  try {
    localStorage.setItem('news-favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Article>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveFavoritesToStorage(state.items);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveFavoritesToStorage(state.items);
    },
    clearAllFavorites: (state) => {
      state.items = [];
      saveFavoritesToStorage(state.items);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;