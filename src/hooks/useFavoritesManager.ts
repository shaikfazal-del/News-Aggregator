import { useAppDispatch, useAppSelector } from './';
import { addToFavorites, removeFromFavorites, clearAllFavorites } from '../store/slices/favoritesSlice';
import { Article } from '../types';

export const useFavoritesManager = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);

  const addFavorite = (article: Article) => {
    dispatch(addToFavorites(article));
  };

  const removeFavorite = (articleId: string) => {
    dispatch(removeFromFavorites(articleId));
  };

  const clearFavorites = () => {
    dispatch(clearAllFavorites());
  };

  const isFavorite = (articleId: string) => {
    return favorites.some(item => item.id === articleId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite,
  };
};