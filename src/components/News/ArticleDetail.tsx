import React from 'react';
import { X, Clock, User, ExternalLink, Heart, Share2 } from 'lucide-react';
import { Article } from '../../types';
import { useAppSelector } from '../../hooks';
import { useFavoritesManager } from '../../hooks/useFavoritesManager';

interface ArticleDetailProps {
  article: Article;
  onClose: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose }) => {
  const { darkMode } = useAppSelector(state => state.theme);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesManager();

  const handleFavoriteClick = () => {
    if (isFavorite(article.id)) {
      removeFavorite(article.id);
    } else {
      addFavorite(article);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(article.url);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`relative max-w-4xl w-full max-h-full overflow-y-auto rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
            darkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } transition-colors`}
          aria-label="Close article"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative">
          <img
            src={article.urlToImage || '/api/placeholder/800/400'}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute bottom-4 left-4 right-16">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              darkMode
                ? 'bg-blue-900 text-blue-200'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {article.source.name}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Clock className="h-4 w-4 mr-2" />
              {formatDate(article.publishedAt)}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite(article.id)
                    ? 'bg-red-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                aria-label="Toggle favorite"
              >
                <Heart className={`h-5 w-5 ${isFavorite(article.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className={`p-2 rounded-full transition-colors ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                aria-label="Share article"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <h1 className={`text-2xl md:text-3xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {article.title}
          </h1>

          {article.author && (
            <div className={`flex items-center mb-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <User className="h-4 w-4 mr-2" />
              By {article.author}
            </div>
          )}

          <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {article.description}
            </p>
            
            {article.content && (
              <div className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <p>{article.content}</p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Read Full Article
              <ExternalLink className="h-5 w-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};