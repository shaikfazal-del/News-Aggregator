import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Newspaper } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { toggleTheme } from '../../store/slices/themeSlice';
import { SearchBar } from './SearchBar';

export const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector(state => state.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Newspaper className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              NewsHub
            </span>
          </Link>

          <div className="flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/favorites'
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Favorites
            </Link>
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-md transition-colors ${
                darkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};