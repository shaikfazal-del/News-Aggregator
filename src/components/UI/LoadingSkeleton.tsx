import React from 'react';
import { useAppSelector } from '../../hooks';

export const LoadingSkeleton: React.FC = () => {
  const { darkMode } = useAppSelector(state => state.theme);

  return (
    <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className={`w-full h-48 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} animate-pulse`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`h-6 w-20 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full animate-pulse`} />
          <div className={`h-4 w-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse`} />
        </div>
        <div className={`h-6 w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse mb-2`} />
        <div className={`h-6 w-3/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse mb-3`} />
        <div className={`h-4 w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse mb-2`} />
        <div className={`h-4 w-5/6 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse mb-3`} />
        <div className={`h-4 w-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse`} />
      </div>
    </div>
  );
};