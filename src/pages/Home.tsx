import React, { useState } from 'react';
import { ArticleGrid } from '../components/News/ArticleGrid';
import { ArticleDetail } from '../components/News/ArticleDetail';
import { useAppSelector } from '../hooks';
import { useFetchNews } from '../hooks/useFetchNews';
import { Article } from '../types';

export const Home: React.FC = () => {
  const { articles, loading, error, searchQuery } = useAppSelector(state => state.news);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  useFetchNews();

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCloseDetail = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Search Results for "{searchQuery}"</h2>
          <p className="text-gray-600 mt-1">{articles.length} articles found</p>
        </div>
      )}
      
      <ArticleGrid
        articles={articles}
        loading={loading}
        error={error}
        onArticleClick={handleArticleClick}
      />

      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};