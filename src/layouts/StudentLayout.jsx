import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/sidebar/StudentSidebar';

export const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <StudentSidebar />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
