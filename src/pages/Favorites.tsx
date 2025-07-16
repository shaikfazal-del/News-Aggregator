import React, { useState } from 'react';
import { Trash2, Heart } from 'lucide-react';
import { ArticleGrid } from '../components/News/ArticleGrid';
import { ArticleDetail } from '../components/News/ArticleDetail';
import { useAppSelector } from '../hooks';
import { useFavoritesManager } from '../hooks/useFavoritesManager';
import { Article } from '../types';

export const Favorites: React.FC = () => {
  const { darkMode } = useAppSelector(state => state.theme);
  const { favorites, clearFavorites } = useFavoritesManager();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCloseDetail = () => {
    setSelectedArticle(null);
  };

  const handleClearAll = () => {
    clearFavorites();
    setShowConfirmClear(false);
  };

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Heart className="h-24 w-24 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
          <p className="text-lg">Start adding articles to your favorites to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Favorites
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {favorites.length} saved {favorites.length === 1 ? 'article' : 'articles'}
          </p>
        </div>
        <button
          onClick={() => setShowConfirmClear(true)}
          className={`inline-flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
            darkMode
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </button>
      </div>

      <ArticleGrid
        articles={favorites}
        loading={false}
        error={null}
        onArticleClick={handleArticleClick}
      />

      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={handleCloseDetail}
        />
      )}

      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-6 rounded-lg max-w-md w-full mx-4 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Clear All Favorites?
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              This action cannot be undone. All {favorites.length} favorite articles will be removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmClear(false)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  darkMode
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};