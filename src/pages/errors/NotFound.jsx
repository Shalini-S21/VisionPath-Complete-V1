import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
        <Compass className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white">404 - Page Not Found</h1>
      <p className="text-xs text-slate-500 max-w-sm">The route you navigated to does not exist or has been moved.</p>
      <Link to="/">
        <Button variant="primary" size="md" icon={ArrowLeft}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
