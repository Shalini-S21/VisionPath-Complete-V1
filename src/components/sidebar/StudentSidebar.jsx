import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Compass,
  Award,
  BookOpen,
  Sparkles,
  FileCheck,
  Map,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';

export const StudentSidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Skill Matrix', path: '/student/skills', icon: Compass },
    { label: 'Assessments', path: '/student/career-assessment', icon: Award },
    { label: 'Recommendations', path: '/student/career-recommendation', icon: Sparkles },
    { label: 'Study Roadmap', path: '/student/career-roadmap', icon: Map },
    { label: 'ATS Resume Analyzer', path: '/student/ai-resume-analyzer', icon: FileCheck },
    { label: 'AI Mentor Chat', path: '/student/ai-career-assistant', icon: BookOpen },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between p-4 min-h-screen sticky top-0">
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              VISION<span className="text-emerald-600 dark:text-emerald-400">PATH</span>
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600">Student Portal</span>
          </div>
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
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
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

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3 text-xs">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
            {user?.name ? user.name[0].toUpperCase() : 'S'}
          </div>
          <div className="truncate">
            <p className="font-bold text-slate-900 dark:text-white truncate">{user?.name || user?.username}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
