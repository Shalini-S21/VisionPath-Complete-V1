import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, LogIn, UserPlus } from 'lucide-react';
import Button from '../common/Button';
import ThemeToggle from '../common/ThemeToggle';

export const PublicNavbar = () => {
  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-[#111814]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#1F3327]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900 dark:text-[#F3F4F6]">
            VISION<span className="text-emerald-600 dark:text-emerald-400">PATH</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm" icon={LogIn}>
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm" icon={UserPlus}>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
