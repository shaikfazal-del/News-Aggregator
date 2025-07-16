import React from 'react';
import { Header } from './Header';
import { CategoryTabs } from './CategoryTabs';
import { useAppSelector } from '../../hooks';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useAppSelector(state => state.theme);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <Header />
      <CategoryTabs />
      <main>{children}</main>
    </div>
  );
};