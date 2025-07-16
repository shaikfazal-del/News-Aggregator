import React from 'react';
import { ArticleCard } from './ArticleCard';
import { LoadingSkeleton } from '../UI/LoadingSkeleton';
import { ErrorMessage } from '../UI/ErrorMessage';
import { Article } from '../../types';
import { useAppSelector } from '../../hooks';

interface ArticleGridProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
  onArticleClick: (article: Article) => void;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  loading,
  error,
  onArticleClick,
}) => {
  const { darkMode } = useAppSelector(state => state.theme);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (articles.length === 0) {
    return (
      <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <p className="text-lg">No articles found.</p>
        <p className="text-sm mt-2">Try adjusting your search terms or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          onClick={() => onArticleClick(article)}
        />
      ))}
    </div>
  );
};