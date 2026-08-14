import React, { useState, useEffect } from 'react';
import { Users, Search, Loader2, GraduationCap, UserCheck, ShieldCheck, User, X } from 'lucide-react';
import adminService from '../../services/admin/adminService';
import Badge from '../../components/common/Badge';

export const UserMgmt = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await adminService.getUsers();
        let extracted = [];
        
        if (Array.isArray(response)) {
          extracted = response;
        } else if (Array.isArray(response?.data)) {
          extracted = response.data;
        } else if (Array.isArray(response?.data?.data)) {
          extracted = response.data.data;
        } else if (Array.isArray(response?.data?.data?.data)) {
          extracted = response.data.data.data;
        }

        // Deduplicate DB users by email/username if any duplicates exist
        const seenKeys = new Set();
        const uniqueUsers = [];

        for (const u of extracted) {
          const key = (u.email || u.username || String(u.id || u.userId || Math.random())).toLowerCase();
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            uniqueUsers.push(u);
          }
        }

        setUsers(uniqueUsers);
      } catch (err) {
        console.error('Failed to fetch users from database:', err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const totalCount = users.length;
  const studentCount = users.filter((u) => u.role?.toUpperCase() === 'STUDENT').length;
  const counselorCount = users.filter((u) => u.role?.toUpperCase() === 'COUNSELOR').length;
  const adminCount = users.filter((u) => u.role?.toUpperCase() === 'ADMIN').length;

  const filtered = users.filter((u) => {
    const nameStr = u.name || u.username || '';
    const emailStr = u.email || '';
    const usernameStr = u.username || '';
    const matchesSearch =
      search.trim() === '' ||
      nameStr.toLowerCase().includes(search.toLowerCase()) ||
      emailStr.toLowerCase().includes(search.toLowerCase()) ||
      usernameStr.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole =
      roleFilter === 'ALL' || (u.role && u.role.toUpperCase() === roleFilter);

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6] flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Platform User Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage registered accounts across students, counselors, and administrators ({totalCount} total)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, username…"
              className="w-full h-10 pl-9 pr-9 rounded-xl border border-slate-200 dark:border-[#1F3327] bg-white dark:bg-[#111814] text-sm text-slate-900 dark:text-[#F3F4F6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setRoleFilter('ALL')}
          className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            roleFilter === 'ALL'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-[#111814] border-slate-200 dark:border-[#1F3327] hover:border-emerald-500/50 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">All Roles</span>
            <Users className={`w-5 h-5 ${roleFilter === 'ALL' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-black">{totalCount}</span>
            <span className="text-xs font-medium text-slate-400">Total Users</span>
          </div>
        </button>

        <button
          onClick={() => setRoleFilter('STUDENT')}
          className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            roleFilter === 'STUDENT'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-[#111814] border-slate-200 dark:border-[#1F3327] hover:border-emerald-500/50 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Students</span>
            <GraduationCap className={`w-5 h-5 ${roleFilter === 'STUDENT' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{studentCount}</span>
            <span className="text-xs font-medium text-slate-400">Enrolled Students</span>
          </div>
        </button>

        <button
          onClick={() => setRoleFilter('COUNSELOR')}
          className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            roleFilter === 'COUNSELOR'
              ? 'bg-sky-500/10 border-sky-500 text-sky-700 dark:text-sky-300 ring-2 ring-sky-500/20'
              : 'bg-white dark:bg-[#111814] border-slate-200 dark:border-[#1F3327] hover:border-sky-500/50 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Counselors</span>
            <UserCheck className={`w-5 h-5 ${roleFilter === 'COUNSELOR' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'}`} />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-black text-sky-600 dark:text-sky-400">{counselorCount}</span>
            <span className="text-xs font-medium text-slate-400">Verified Advisors</span>
          </div>
        </button>

        <button
          onClick={() => setRoleFilter('ADMIN')}
          className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
            roleFilter === 'ADMIN'
              ? 'bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20'
              : 'bg-white dark:bg-[#111814] border-slate-200 dark:border-[#1F3327] hover:border-purple-500/50 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Admins</span>
            <ShieldCheck className={`w-5 h-5 ${roleFilter === 'ADMIN' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-black text-purple-600 dark:text-purple-400">{adminCount}</span>
            <span className="text-xs font-medium text-slate-400">System Admins</span>
          </div>
        </button>
      </div>

      {/* Directory Table Container */}
      <div className="bg-white dark:bg-[#111814] rounded-2xl border border-slate-200 dark:border-[#1F3327] overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 dark:bg-[#151E18] border-b border-slate-100 dark:border-[#1F3327] flex items-center justify-between">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Showing {filtered.length} {roleFilter === 'ALL' ? 'users' : roleFilter.toLowerCase() + 's'}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Click category cards above to filter list</span>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-semibold">Loading user directory...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <User className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No matching users found</p>
            {search ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-400">No accounts match your search for "{search}"</p>
                <button
                  onClick={() => setSearch('')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
                >
                  Clear search filter
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Try switching categories using the cards above.</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-[#1F3327] bg-slate-50/50 dark:bg-[#151E18]/50">
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">User Account</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Username</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category / Role</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1F3327]">
                {filtered.map((usr, idx) => {
                  const roleUpper = (usr.role || 'STUDENT').toUpperCase();
                  const rowKey = usr.email ? `usr-${usr.email}` : (usr.id || usr.userId ? `usr-${usr.id || usr.userId}` : `usr-idx-${idx}`);
                  return (
                    <tr key={rowKey} className="hover:bg-slate-50 dark:hover:bg-[#151E18] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-xs border ${
                              roleUpper === 'ADMIN'
                                ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800'
                                : roleUpper === 'COUNSELOR'
                                ? 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800'
                                : 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                            }`}
                          >
                            {(usr.name || usr.username || 'U')[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-[#F3F4F6]">{usr.name || usr.username}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{usr.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                        @{usr.username || 'user_' + (usr.id || usr.userId)}
                      </td>
                      <td className="px-5 py-4">
                        <Badge
                          variant={
                            roleUpper === 'ADMIN'
                              ? 'purple'
                              : roleUpper === 'COUNSELOR'
                              ? 'info'
                              : 'success'
                          }
                          size="xs"
                        >
                          {roleUpper}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={usr.enabled !== false ? 'success' : 'error'} size="xs">
                          {usr.status || (usr.enabled !== false ? 'ACTIVE' : 'DISABLED')}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMgmt;
