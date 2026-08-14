import React, { useState, useEffect } from 'react';
import { Users, Search, Loader2 } from 'lucide-react';
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
        const resData = response.data?.data || response.data || [];
        setUsers(Array.isArray(resData) ? resData : []);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const nameStr = u.name || u.username || '';
    const emailStr = u.email || '';
    const matchesSearch =
      nameStr.toLowerCase().includes(search.toLowerCase()) ||
      emailStr.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      roleFilter === 'ALL' || (u.role && u.role.toUpperCase() === roleFilter);

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6] flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Platform User Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Retrieved from admin-service ({users.length} registered accounts)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 px-3 rounded-xl border border-slate-200 dark:border-[#1F3327] bg-white dark:bg-[#111814] text-xs font-bold text-slate-900 dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="ALL">All Roles</option>
            <option value="STUDENT">Student</option>
            <option value="COUNSELOR">Counselor</option>
            <option value="ADMIN">Admin</option>
          </select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users…"
              className="h-9 pl-9 pr-4 rounded-xl border border-slate-200 dark:border-[#1F3327] bg-white dark:bg-[#111814] text-sm text-slate-900 dark:text-[#F3F4F6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-56"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111814] rounded-2xl border border-slate-200 dark:border-[#1F3327] overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-semibold">Loading user directory from admin-service...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">No matching users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-[#1F3327] bg-slate-50 dark:bg-[#151E18]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">User Account</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Role</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1F3327]">
                {filtered.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-50 dark:hover:bg-[#151E18] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-[#151E18] text-emerald-700 dark:text-emerald-300 border border-transparent dark:border-[#1F3327] font-bold flex items-center justify-center text-xs">
                          {(usr.name || usr.username || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-[#F3F4F6]">{usr.name || usr.username}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">{usr.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        variant={
                          usr.role?.toUpperCase() === 'ADMIN'
                            ? 'purple'
                            : usr.role?.toUpperCase() === 'COUNSELOR'
                            ? 'info'
                            : 'success'
                        }
                        size="xs"
                      >
                        {usr.role || 'STUDENT'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="success" size="xs">
                        {usr.status || 'ACTIVE'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMgmt;
