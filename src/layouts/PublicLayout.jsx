import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/navbar/PublicNavbar';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F0C] text-slate-900 dark:text-[#F3F4F6] flex flex-col">
      <PublicNavbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
