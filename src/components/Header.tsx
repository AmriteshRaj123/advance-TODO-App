import React from 'react';
import { Moon, Sun, Bell, Search } from 'lucide-react';
import clsx from 'clsx';
import { useThemeStore } from '../store/themeStore';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <header
      className={clsx(
        'flex items-center justify-between border-b px-6 py-3',
        isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            'flex items-center gap-2 rounded-lg border px-3 py-1.5',
            isDark
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-gray-50'
          )}
        >
          <Search
            size={16}
            className={isDark ? 'text-gray-400' : 'text-gray-500'}
          />
          <input
            type="text"
            placeholder="Search..."
            className={clsx(
              'bg-transparent text-sm focus:outline-none',
              isDark ? 'text-white' : 'text-gray-900'
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className={clsx(
            'rounded-lg p-2 hover:bg-gray-100',
            isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600'
          )}
        >
          {isDark ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button
          className={clsx(
            'rounded-lg p-2 hover:bg-gray-100',
            isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600'
          )}
        >
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
};