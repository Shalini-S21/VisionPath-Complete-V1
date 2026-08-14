import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Shield,
  UserCheck,
  Users,
  LogOut,
  Compass,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import ThemeToggle from '../common/ThemeToggle';

export const AdminSidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'System Control', path: '/admin/dashboard', icon: Shield },
    { label: 'Counselor Verification', path: '/admin/counselors', icon: UserCheck },
    { label: 'User Directory', path: '/admin/users', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#111814] border-r border-slate-200 dark:border-[#1F3327] flex flex-col justify-between p-4 min-h-screen sticky top-0">
      <div className="space-y-6">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-[#F3F4F6]">
                VISION<span className="text-emerald-600 dark:text-emerald-400">PATH</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Admin Command</span>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#151E18] hover:text-slate-900 dark:hover:text-[#F3F4F6]'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-[#1F3327] space-y-3">
        <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#151E18] border border-slate-200/60 dark:border-[#1F3327] flex items-center gap-3 text-xs">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div className="truncate">
            <p className="font-bold text-slate-900 dark:text-[#F3F4F6] truncate">{user?.name || user?.username}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
