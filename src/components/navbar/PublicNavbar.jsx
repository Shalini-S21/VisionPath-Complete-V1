import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, LogIn, UserPlus } from 'lucide-react';
import Button from '../common/Button';

export const PublicNavbar = () => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            VISION<span className="text-emerald-600 dark:text-emerald-400">PATH</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
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
