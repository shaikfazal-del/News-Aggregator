import React from 'react';
import { Clock, ExternalLink, Heart, User } from 'lucide-react';
import { Article } from '../../types';
import { useAppSelector } from '../../hooks';
import { useFavoritesManager } from '../../hooks/useFavoritesManager';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const { darkMode } = useAppSelector(state => state.theme);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesManager();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(article.id)) {
      removeFavorite(article.id);
    } else {
      addFavorite(article);
    }
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(article.url, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
        darkMode
          ? 'bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-xl'
          : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
      }`}
    >
      <div className="relative">
        <img
          src={article.urlToImage || '/api/placeholder/400/200'}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isFavorite(article.id)
                ? 'bg-red-500 text-white'
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
            aria-label="Toggle favorite"
          >
            <Heart className={`h-4 w-4 ${isFavorite(article.id) ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleExternalClick}
            className="p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-all"
            aria-label="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            darkMode
              ? 'bg-blue-900 text-blue-200'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {article.source.name}
          </span>
          <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(article.publishedAt)}
          </div>
        </div>

        <h3 className={`font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {article.title}
        </h3>

        <p className={`text-sm mb-3 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {article.description}
        </p>

        {article.author && (
          <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <User className="h-3 w-3 mr-1" />
            {article.author}
          </div>
        )}
      </div>
    </div>
  );
};