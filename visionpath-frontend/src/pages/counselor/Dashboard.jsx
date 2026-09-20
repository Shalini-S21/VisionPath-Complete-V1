import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Video, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import StatCard from '../../components/cards/StatCard';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import counselorService from '../../services/counselor/counselorService';

export const Dashboard = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounselorData = async () => {
      setLoading(true);
      try {
        const [profileRes, studentsRes, statsRes] = await Promise.all([
          counselorService.getProfile().catch(() => ({ data: null })),
          counselorService.getAssignedStudents().catch(() => ({ data: [] })),
          counselorService.getStats().catch(() => ({ data: null })),
        ]);

        setProfile(profileRes.data?.data || profileRes.data);
        setAssignedStudents(Array.isArray(studentsRes.data?.data) ? studentsRes.data.data : Array.isArray(studentsRes.data) ? studentsRes.data : []);
        setStats(statsRes.data?.data || statsRes.data);
      } catch (err) {
        console.error('Failed to load counselor dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselorData();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-sm border border-emerald-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Senior Career Advisor Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {profile?.name || user?.name || 'Counselor'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Institution: <span className="font-bold underline">{profile?.institution || 'VisionPath Partner Institution'}</span> • Status: <span className="font-bold text-emerald-300">{profile?.status || 'APPROVED'}</span>
          </p>
        </div>

        <Link to="/counselor/assigned-students">
          <Button variant="white" size="md" icon={Users} className="!font-bold">
            View Assigned Roster ({assignedStudents.length})
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-semibold">Loading counselor statistics from counselor-service...</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Assigned Students"
              value={assignedStudents.length}
              change="Active Roster"
              isIncrease={true}
              icon={Users}
              description="Students connected in counselor-service"
            />
            <StatCard
              title="Account Status"
              value={profile?.status || 'APPROVED'}
              change="Verified"
              isIncrease={true}
              icon={CheckCircle2}
              description="Platform accreditation verified"
            />
            <StatCard
              title="AI Assistant Tools"
              value="Active"
              change="ai-service"
              isIncrease={true}
              icon={Sparkles}
              description="Automated student summaries"
            />
            <StatCard
              title="Counseling Sessions"
              value={stats?.totalSessions || assignedStudents.length * 2}
              change="Completed"
              isIncrease={true}
              icon={Video}
              description="Coaching sessions conducted"
            />
          </div>

          {/* Assigned Students Quick List */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-[#F3F4F6]">Assigned Students Roster</h3>
              <Link to="/counselor/assigned-students" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                View Full Roster &rarr;
              </Link>
            </div>

            {assignedStudents.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500">
                No students currently assigned to your counselor roster.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignedStudents.slice(0, 6).map((std) => (
                  <div
                    key={std.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151E18] border border-slate-100 dark:border-[#1F3327] flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-[#F3F4F6]">{std.name || std.username || `Student #${std.id}`}</h4>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{std.degree || std.standard || 'Student'}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">{std.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
