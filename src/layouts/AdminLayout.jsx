import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/sidebar/AdminSidebar';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F0C] text-slate-900 dark:text-[#F3F4F6] flex">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
