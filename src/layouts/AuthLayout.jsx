import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 z-10">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            VISION<span className="text-emerald-600 dark:text-emerald-400">PATH</span>
          </span>
        </Link>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 py-8 px-6 sm:px-10 shadow-xl rounded-3xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
