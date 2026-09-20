import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-xl bg-slate-100 dark:bg-[#151E18] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1F3327] border border-slate-200 dark:border-[#1F3327] transition-all cursor-pointer flex items-center justify-center"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 text-slate-700" />
      ) : (
        <Sun className="w-4 h-4 text-emerald-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
