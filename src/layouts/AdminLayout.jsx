import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/sidebar/AdminSidebar';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
