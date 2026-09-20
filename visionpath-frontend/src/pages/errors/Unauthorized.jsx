import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

export const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F0C] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="p-4 rounded-3xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
        <ShieldAlert className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-[#F3F4F6]">403 - Access Forbidden</h1>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">You do not have permission to access this portal page.</p>
      <Link to="/login">
        <Button variant="primary" size="md" icon={ArrowLeft}>
          Back to Login
        </Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
