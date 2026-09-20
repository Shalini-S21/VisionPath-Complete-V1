import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Loader2 } from 'lucide-react';
import counselorService from '../../services/counselor/counselorService';
import Badge from '../../components/common/Badge';
import toast from 'react-hot-toast';

export const AssignedStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchAssignedStudents = async () => {
    setLoading(true);
    try {
      const response = await counselorService.getAssignedStudents();
      const resData = response.data?.data || response.data || [];
      setStudents(Array.isArray(resData) ? resData : []);
    } catch (err) {
      console.error('Failed to fetch assigned students:', err);
      toast.error('Failed to load assigned students from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedStudents();
  }, []);

  const filtered = students.filter((s) => {
    const nameStr = s.name || s.username || '';
    const emailStr = s.email || '';
    return (
      nameStr.toLowerCase().includes(search.toLowerCase()) ||
      emailStr.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6]">Assigned Students Roster</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{students.length} students currently assigned under your counselor roster</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students…"
            className="h-9 pl-9 pr-4 rounded-xl border border-slate-200 dark:border-[#1F3327] bg-white dark:bg-[#111814] text-sm text-slate-900 dark:text-[#F3F4F6] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-56"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#111814] rounded-2xl border border-slate-200 dark:border-[#1F3327] overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-semibold">Loading assigned students from counselor-service...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">No assigned students found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-[#1F3327] bg-slate-50 dark:bg-[#151E18]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Student</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Institution / Degree</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Academic Year</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1F3327]">
                {filtered.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-[#151E18] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-[#151E18] text-emerald-700 dark:text-emerald-300 border border-transparent dark:border-[#1F3327] font-bold flex items-center justify-center text-xs">
                          {(student.name || student.username || 'S')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-[#F3F4F6]">{student.name || student.username}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-600 dark:text-slate-300">
                        {student.collegeName || student.schoolName || student.degree || 'Computer Science'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{student.academicYear || '4th Year'}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="success" size="xs">ACTIVE</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link to={`/counselor/student/${student.id}`}>
                        <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:underline cursor-pointer">
                          <ExternalLink className="w-3 h-3" /> View Profile
                        </button>
                      </Link>
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

export default AssignedStudents;
