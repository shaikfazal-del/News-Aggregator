import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../../types';

const loadThemeFromStorage = (): boolean => {
  try {
    const stored = localStorage.getItem('news-theme');
    return stored === 'dark';
  } catch {
    return false;
  }
};

const saveThemeToStorage = (darkMode: boolean) => {
  try {
    localStorage.setItem('news-theme', darkMode ? 'dark' : 'light');
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
};

const initialState: ThemeState = {
  darkMode: loadThemeFromStorage(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      saveThemeToStorage(state.darkMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;