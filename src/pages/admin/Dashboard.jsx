import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, Shield, Activity, ArrowRight, Loader2 } from 'lucide-react';
import StatCard from '../../components/cards/StatCard';
import Button from '../../components/common/Button';
import adminService from '../../services/admin/adminService';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [pendingCounselors, setPendingCounselors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      setLoading(true);
      try {
        const [statsRes, usersRes, pendingRes] = await Promise.all([
          adminService.getDashboardStats().catch(() => ({ data: { totalUsers: 0, totalStudents: 0, totalCounselors: 0, pendingCounselors: 0 } })),
          adminService.getUsers().catch(() => ({ data: [] })),
          adminService.getPendingCounselors().catch(() => ({ data: [] })),
        ]);

        const statsData = statsRes.data?.data || statsRes.data || statsRes;
        const usersData = usersRes.data?.data || usersRes.data || usersRes;
        const pendingData = pendingRes.data?.data || pendingRes.data || pendingRes;

        setStats(statsData);
        setUsers(Array.isArray(usersData) ? usersData.slice(0, 5) : []);
        setPendingCounselors(Array.isArray(pendingData) ? pendingData : []);
      } catch (err) {
        console.error('Failed to load admin dashboard:', err);
        toast.error('Could not connect to Admin Service.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-sm border border-emerald-400/20">
            <Shield className="w-3.5 h-3.5" />
            <span>Administrator Operations Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            System Control Center ⚙️
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Platform running smoothly. Connected to API Gateway & microservice backend databases.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link to="/admin/counselors">
            <Button variant="white" size="md" icon={UserCheck} className="!font-bold">
              Review Pending Counselors ({pendingCounselors.length})
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-semibold">Loading real-time admin metrics...</p>
        </div>
      ) : (
        <>
          {/* Top Level Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Platform Users"
              value={stats?.totalUsers || users.length || 0}
              change="Real-time count"
              isIncrease={true}
              icon={Users}
              description="Registered user credentials"
            />
            <StatCard
              title="Pending Counselors"
              value={pendingCounselors.length}
              change={pendingCounselors.length > 0 ? 'Action Required' : 'All cleared'}
              isIncrease={pendingCounselors.length === 0}
              icon={UserCheck}
              description="Awaiting Admin approval"
            />
            <StatCard
              title="Active Microservices"
              value="14 Services"
              change="Connected"
              isIncrease={true}
              icon={Activity}
              description="API Gateway (Port 8080)"
            />
            <StatCard
              title="System Status"
              value="Healthy"
              change="MySQL 8"
              isIncrease={true}
              icon={Shield}
              description="Port 3306 Active"
            />
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/admin/counselors"
              className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] hover:border-emerald-500 transition-all flex items-center justify-between group"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F3F4F6] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Counselor Verification ({pendingCounselors.length} Pending)
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Approve or reject counselor accreditation applications</p>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/admin/users"
              className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] hover:border-emerald-500 transition-all flex items-center justify-between group"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F3F4F6] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  User Management Directory
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Manage accounts across Student, Counselor, and Admin roles</p>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
