import React, { useState, useEffect } from 'react';
import { Map, CheckCircle2, Loader2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import studyPlanService from '../../services/studyPlan/studyPlanService';
import Badge from '../../components/common/Badge';
import toast from 'react-hot-toast';

export const CareerRoadmap = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudyPlans = async () => {
    setLoading(true);
    try {
      const response = await studyPlanService.getAllPlans();
      const resData = response.data?.data || response.data || [];
      setPlans(Array.isArray(resData) ? resData : []);
    } catch (err) {
      console.error('Failed to load study plans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudyPlans();
  }, [user]);

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const nextStatus = currentStatus === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
      await studyPlanService.updateTask(taskId, { status: nextStatus });
      toast.success(`Task status updated to ${nextStatus}`);
      fetchStudyPlans();
    } catch (err) {
      console.error('Failed to update task:', err);
      toast.error('Failed to update task status.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Active Study Plans & Learning Goals
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Personalized Study Roadmap</h1>
          <p className="text-xs text-slate-500">
            Synchronized with study-plan-service
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-semibold">Loading study plans from study-plan-service...</p>
        </div>
      ) : plans.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Map className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">No active study plans found</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Create a study plan or generate one via AI Mentor to populate learning tasks.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {plans.map((plan) => (
            <div key={plan.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{plan.title || 'Personalized Career Plan'}</h2>
                  <p className="text-xs text-slate-500">{plan.description || plan.goal}</p>
                </div>
                <Badge variant="success">{plan.status || 'ACTIVE'}</Badge>
              </div>

              {plan.tasks && plan.tasks.length > 0 && (
                <div className="space-y-3 pt-2">
                  {plan.tasks.map((task, idx) => (
                    <div key={task.id || idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <CheckCircle2
                          onClick={() => toggleTaskStatus(task.id, task.status)}
                          className={`w-4 h-4 cursor-pointer ${
                            task.status === 'COMPLETED' ? 'text-emerald-600' : 'text-slate-300'
                          }`}
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{task.title}</p>
                          <p className="text-[11px] text-slate-400">{task.topic} • Due: {task.dueDate || 'Flexible'}</p>
                        </div>
                      </div>
                      <Badge variant={task.status === 'COMPLETED' ? 'success' : 'warning'} size="xs">
                        {task.status || 'PENDING'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerRoadmap;
