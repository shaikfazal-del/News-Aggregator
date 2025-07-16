import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { clearError } from '../../store/slices/newsSlice';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const { darkMode } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const handleRetry = () => {
    dispatch(clearError());
    onRetry?.();
  };

  return (
    <div className={`max-w-md mx-auto text-center py-12 px-6 rounded-lg ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <AlertCircle className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
      <h3 className="text-lg font-medium mb-2">Oops! Something went wrong</h3>
      <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={handleRetry}
          className={`inline-flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      )}
      {(message.includes('426') || message.includes('401') || message.includes('Invalid API key')) && (
        <div className={`mt-4 p-3 rounded-md text-xs ${
          darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-700'
        }`}>
          <p className="font-medium mb-1">🔑 Free Tier Limitations:</p>
          <p>• 100 requests per day limit</p>
          <p>• Articles have 24-hour delay</p>
          <p>• Limited endpoint access</p>
          <p>• Try searching for specific topics</p>
        </div>
      )}
      {message.includes('rate limit') && (
        <div className={`mt-4 p-3 rounded-md text-xs ${
          darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-50 text-yellow-700'
        }`}>
          <p className="font-medium mb-1">⚠️ Rate Limit Reached:</p>
          <p>Free tier allows 100 requests per day</p>
          <p>Please try again tomorrow or upgrade your plan</p>
        </div>
      )}
    </div>
  );
};