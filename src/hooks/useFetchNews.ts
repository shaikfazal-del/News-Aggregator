import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './';
import { fetchNews } from '../store/slices/newsSlice';

export const useFetchNews = () => {
  const dispatch = useAppDispatch();
  const { activeCategory, loading, error } = useAppSelector(state => state.news);

  useEffect(() => {
    dispatch(fetchNews({ category: activeCategory, pageSize: 20 }));
  }, [dispatch, activeCategory]);

  return { loading, error };
};