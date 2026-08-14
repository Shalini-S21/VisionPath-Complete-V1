import React, { useState, useEffect } from 'react';
import { UserCheck, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import adminService from '../../services/admin/adminService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import toast from 'react-hot-toast';

export const CounselorMgmt = () => {
  const [pendingCounselors, setPendingCounselors] = useState([]);
  const [activeCounselors, setActiveCounselors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCounselors = async () => {
    setLoading(true);
    try {
      const [pendingRes, activeRes] = await Promise.all([
        adminService.getPendingCounselors().catch(() => ({ data: [] })),
        adminService.getAllCounselors().catch(() => ({ data: [] })),
      ]);

      const pendingData = pendingRes.data?.data || pendingRes.data || [];
      const activeData = activeRes.data?.data || activeRes.data || [];

      setPendingCounselors(Array.isArray(pendingData) ? pendingData : []);
      setActiveCounselors(Array.isArray(activeData) ? activeData : []);
    } catch (err) {
      console.error('Error fetching counselors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounselors();
  }, []);

  const handleApprove = async (id, name) => {
    try {
      await adminService.approveCounselor(id);
      toast.success(`Counselor ${name} approved successfully!`);
      fetchCounselors();
    } catch (err) {
      console.error('Failed to approve counselor:', err);
      toast.error('Failed to approve counselor.');
    }
  };

  const handleReject = async (id, name) => {
    try {
      await adminService.rejectCounselor(id);
      toast.error(`Counselor ${name} application rejected.`);
      fetchCounselors();
    } catch (err) {
      console.error('Failed to reject counselor:', err);
      toast.error('Failed to reject counselor.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6] flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          Counselor Accreditation & Verification
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Review pending counselor registration requests and grant advisor platform access
        </p>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-semibold">Loading counselor applications from admin-service...</p>
        </div>
      ) : (
        <>
          {/* Pending Applications Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#F3F4F6] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              Pending Applications ({pendingCounselors.length})
            </h2>

            {pendingCounselors.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-6 text-center">No pending counselor applications at this time.</p>
            ) : (
              <div className="space-y-3">
                {pendingCounselors.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151E18] border border-slate-100 dark:border-[#1F3327] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-[#F3F4F6]">{c.name || c.username}</h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">{c.email}</p>
                      <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{c.institution || 'Partner Institution'} • {c.qualification || 'M.Sc.'}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="danger" size="sm" icon={XCircle} onClick={() => handleReject(c.id, c.name || c.username)}>
                        Reject
                      </Button>
                      <Button variant="primary" size="sm" icon={CheckCircle2} onClick={() => handleApprove(c.id, c.name || c.username)}>
                        Approve Counselor
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Counselors Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#F3F4F6]">Active Verified Counselors</h2>
            {activeCounselors.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 py-6 text-center">No active counselors found.</p>
            ) : (
              <div className="space-y-3">
                {activeCounselors.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151E18] border border-slate-100 dark:border-[#1F3327] flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-[#F3F4F6]">{c.name || c.username}</h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">{c.email}</p>
                    </div>
                    <Badge variant="success" size="xs">APPROVED</Badge>
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

export default CounselorMgmt;
