import React from 'react';
import { Home, ListTodo, Settings, User } from 'lucide-react';
import clsx from 'clsx';
import { useThemeStore } from '../store/themeStore';

interface SidebarProps {
  user: {
    name: string;
    avatar: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  return (
    <div
      className={clsx(
        'flex h-screen w-64 flex-col border-r',
        isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h3
              className={clsx(
                'font-medium',
                isDark ? 'text-white' : 'text-gray-900'
              )}
            >
              {user.name}
            </h3>
            <p className="text-sm text-gray-500">Free Account</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        <NavItem icon={Home} label="Home" active />
        <NavItem icon={ListTodo} label="Tasks" />
        <NavItem icon={User} label="Profile" />
        <NavItem icon={Settings} label="Settings" />
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active }) => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  return (
    <button
      className={clsx(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm',
        active
          ? isDark
            ? 'bg-gray-800 text-white'
            : 'bg-gray-100 text-gray-900'
          : isDark
          ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
          : 'text-gray-700 hover:bg-gray-50'
      )}
    >
      <Icon size={20} />
      {label}
    </button>
  );
};