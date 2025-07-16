import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { searchNews, setSearchQuery } from '../../store/slices/newsSlice';

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, loading } = useAppSelector(state => state.news);
  const { darkMode } = useAppSelector(state => state.theme);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch(setSearchQuery(localQuery));
      dispatch(searchNews({ q: localQuery, pageSize: 20 }));
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search news..."
          className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            darkMode
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          disabled={loading}
        />
        {localQuery && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        )}
      </div>
    </form>
  );
};