import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveCategory, resetNews } from '../../store/slices/newsSlice';

const categories = [
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'business', label: 'Business', icon: '📊' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'general', label: 'General', icon: '📰' },
];

export const CategoryTabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeCategory, searchQuery } = useAppSelector(state => state.news);
  const { darkMode } = useAppSelector(state => state.theme);

  const handleCategoryChange = (category: string) => {
    dispatch(resetNews());
    dispatch(setActiveCategory(category));
  };

  if (searchQuery) {
    return null; // Hide categories when searching
  }

  return (
    <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? darkMode
                    ? 'border-blue-400 text-blue-400'
                    : 'border-blue-500 text-blue-600'
                  : darkMode
                  ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};