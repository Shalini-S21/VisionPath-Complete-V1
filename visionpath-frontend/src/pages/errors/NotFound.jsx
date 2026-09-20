import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F0C] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-[#151E18] border border-transparent dark:border-[#1F3327] text-emerald-600 dark:text-emerald-400">
        <Compass className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-[#F3F4F6]">404 - Page Not Found</h1>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">The route you navigated to does not exist or has been moved.</p>
      <Link to="/">
        <Button variant="primary" size="md" icon={ArrowLeft}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
