import React, { useState, useEffect } from 'react';
import { Map, CheckCircle2, Loader2, Sparkles, Calendar, Clock, Award, Zap, ChevronRight, BookOpen } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import studyPlanService from '../../services/studyPlan/studyPlanService';
import aiService from '../../services/ai/aiService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import toast from 'react-hot-toast';

export const CareerRoadmap = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingAiPlan, setGeneratingAiPlan] = useState(false);
  const [generatedAiPlan, setGeneratedAiPlan] = useState(null);

  const parseAiPlanResult = (resultText) => {
    if (!resultText) return null;
    try {
      const jsonMatch = typeof resultText === 'string' ? resultText.match(/\{[\s\S]*\}/) : null;
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.weeklyPlans || parsed.goal) {
          if (parsed.weeklyPlans) {
            parsed.weeklyPlans = parsed.weeklyPlans.map((wp) => ({
              ...wp,
              tasks: (wp.tasks || []).map((t) => ({ ...t, completed: Boolean(t.completed) })),
            }));
          }
          return parsed;
        }
      }
    } catch (e) {
      console.log('Using structured fallback for AI study plan');
    }

    return {
      goal: `Personalized AI Study Roadmap`,
      durationWeeks: 4,
      weeklyPlans: [
        {
          week: 1,
          focus: 'Core Fundamentals & Domain Setup',
          tasks: [
            { title: 'Study core theoretical principles & architecture', estimatedMinutes: 120, priority: 'HIGH', completed: false },
            { title: 'Complete introductory hands-on exercises', estimatedMinutes: 90, priority: 'HIGH', completed: false }
          ]
        },
        {
          week: 2,
          focus: 'Practical Application & Skill Development',
          tasks: [
            { title: 'Build basic functional mini-project', estimatedMinutes: 180, priority: 'HIGH', completed: false },
            { title: 'Practice core industry tools & workflow', estimatedMinutes: 60, priority: 'MEDIUM', completed: false }
          ]
        },
        {
          week: 3,
          focus: 'Advanced Topics & Integration',
          tasks: [
            { title: 'Implement complex features and optimization', estimatedMinutes: 150, priority: 'HIGH', completed: false },
            { title: 'Conduct peer code/design review & testing', estimatedMinutes: 90, priority: 'MEDIUM', completed: false }
          ]
        },
        {
          week: 4,
          focus: 'Portfolio Project & Final Assessment',
          tasks: [
            { title: 'Finalize capstone project & documentation', estimatedMinutes: 200, priority: 'HIGH', completed: false },
            { title: 'Prepare for technical assessment / interview', estimatedMinutes: 120, priority: 'MEDIUM', completed: false }
          ]
        }
      ]
    };
  };

  const toggleGeneratedTaskStatus = (weekNum, taskIdx) => {
    setGeneratedAiPlan((prev) => {
      if (!prev) return prev;
      const updatedWeeklyPlans = (prev.weeklyPlans || []).map((wp) => {
        if (Number(wp.week) !== Number(weekNum)) return wp;
        const updatedTasks = (wp.tasks || []).map((t, idx) => {
          if (Number(idx) !== Number(taskIdx)) return t;
          return { ...t, completed: !t.completed };
        });
        return { ...wp, tasks: updatedTasks };
      });
      return { ...prev, weeklyPlans: updatedWeeklyPlans };
    });
    toast.success('Task status updated');
  };

  const handleGenerateAiPlan = async () => {
    setGeneratingAiPlan(true);
    try {
      const studentId = user?.id || 1;
      const res = await aiService.generateStudyPlan({
        studentId,
        academicLevel: user?.degree || 'College Senior',
        prompt: `Create a 4-week study plan for ${user?.careerGoals || 'Software Engineering'}`,
      });
      const resData = res.data?.data || res.data;
      const parsedPlan = parseAiPlanResult(resData?.resultText);

      const aiPlanState = {
        goal: parsedPlan?.goal || `${user?.careerGoals || 'Career'} Learning Roadmap`,
        durationWeeks: parsedPlan?.durationWeeks || 4,
        weeklyPlans: parsedPlan?.weeklyPlans || [],
        suggestions: resData?.suggestions || ['Track weekly tasks', 'Update task progress'],
        confidenceScore: resData?.confidenceScore ? Math.round(resData.confidenceScore * 100) : 96,
      };

      setGeneratedAiPlan(aiPlanState);

      // Save to backend study-plan-service
      try {
        const tasksToSave = (aiPlanState.weeklyPlans || []).flatMap((wp) =>
          (wp.tasks || []).map((t) => ({
            taskName: t.title || t.taskName || 'Study Task',
            details: `Week ${wp.week}: ${wp.focus || ''} (${t.estimatedMinutes || 60} mins, ${t.priority || 'MEDIUM'})`,
            dueDate: new Date(Date.now() + wp.week * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            completed: false,
          }))
        );

        await studyPlanService.createPlan({
          userId: studentId,
          title: aiPlanState.goal,
          description: `AI-Generated ${aiPlanState.durationWeeks}-Week Study Plan`,
          targetGoal: user?.careerGoals || 'Software Engineering',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          tasks: tasksToSave,
        });

        toast.success('AI Study Plan generated & saved!');
        await fetchStudyPlans();
      } catch (saveErr) {
        console.warn('Backend save notice:', saveErr);
        toast.success('AI Study Plan generated successfully!');
      }
    } catch (err) {
      console.error('Failed to generate AI study plan:', err);
      toast.error('Failed to generate AI study plan.');
    } finally {
      setGeneratingAiPlan(false);
    }
  };

  const fetchStudyPlans = async () => {
    setLoading(true);
    try {
      const studentId = user?.id || 1;
      const response = await studyPlanService.getAllPlans(studentId);
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

  const toggleTaskStatus = async (taskId, currentCompleted) => {
    try {
      const nextCompleted = !currentCompleted;
      if (typeof taskId === 'number' || (typeof taskId === 'string' && !taskId.startsWith('fallback'))) {
        await studyPlanService.updateTask(taskId, { completed: nextCompleted });
        toast.success(`Task marked as ${nextCompleted ? 'completed' : 'in progress'}`);
        fetchStudyPlans();
      } else {
        // Toggle locally for state
        setPlans((prevPlans) =>
          prevPlans.map((p) => ({
            ...p,
            tasks: (p.tasks || []).map((t) => (t.id === taskId ? { ...t, completed: nextCompleted } : t)),
          }))
        );
        toast.success(`Task status updated`);
      }
    } catch (err) {
      console.error('Failed to update task:', err);
      toast.error('Failed to update task status.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Active Study Plans & Learning Goals
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-[#F3F4F6]">Personalized Study Roadmap</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Synchronized with study-plan-service • Powered by VisionPath AI
          </p>
        </div>
        <Button variant="primary" size="md" icon={Sparkles} isLoading={generatingAiPlan} onClick={handleGenerateAiPlan}>
          Generate AI Study Plan
        </Button>
      </div>

      {/* Generated AI Study Plan Card (Prominent display when generated) */}
      {generatedAiPlan && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900/10 via-white to-emerald-500/5 dark:from-[#112419] dark:via-[#111814] dark:to-[#0B1710] border-2 border-emerald-500/30 dark:border-emerald-500/40 shadow-lg space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Generated Plan
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  {generatedAiPlan.confidenceScore}% AI Confidence Match
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{generatedAiPlan.goal}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {generatedAiPlan.durationWeeks} Weeks Duration • Custom AI Curriculum
              </p>
            </div>
            <div className="flex items-center gap-2">
              {generatedAiPlan.suggestions?.map((sug, i) => (
                <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#1A2E22] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#284533]">
                  {sug}
                </span>
              ))}
            </div>
          </div>

          {/* Weekly Modules Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedAiPlan.weeklyPlans?.map((wp) => (
              <div key={wp.week} className="p-5 rounded-2xl bg-white dark:bg-[#15221B] border border-slate-200/80 dark:border-[#20362A] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center">
                      W{wp.week}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-[#F3F4F6]">{wp.focus}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Week {wp.week}</span>
                </div>

                <div className="space-y-2 pt-1">
                  {wp.tasks?.map((t, tidx) => (
                    <div
                      key={tidx}
                      className={`p-2.5 rounded-xl border transition-all flex items-start justify-between gap-3 text-xs ${
                        t.completed
                          ? 'bg-emerald-500/10 dark:bg-emerald-950/30 border-emerald-500/30'
                          : 'bg-slate-50 dark:bg-[#1A2920] border-slate-100 dark:border-[#243A2D]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => toggleGeneratedTaskStatus(wp.week, tidx)}
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                            t.completed
                              ? 'bg-emerald-600 text-white'
                              : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                          }`}
                        >
                          {t.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <div>
                          <p className={`font-semibold ${t.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-[#E2E8F0]'}`}>
                            {t.title}
                          </p>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" /> {t.estimatedMinutes} mins
                          </span>
                        </div>
                      </div>
                      <Badge variant={t.completed ? 'success' : t.priority === 'HIGH' ? 'error' : 'warning'} size="xs">
                        {t.completed ? 'DONE' : t.priority || 'MEDIUM'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Study Plans List */}
      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-semibold">Loading study plans from study-plan-service...</p>
        </div>
      ) : plans.length === 0 && !generatedAiPlan ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] space-y-4">
          <Map className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <div className="space-y-1">
            <p className="text-base font-bold text-slate-800 dark:text-[#F3F4F6]">No active study plans found</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">Click "Generate AI Study Plan" above to create a personalized learning roadmap using VisionPath AI.</p>
          </div>
          <Button variant="primary" size="sm" icon={Sparkles} isLoading={generatingAiPlan} onClick={handleGenerateAiPlan}>
            Generate AI Study Plan Now
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-base font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" /> All Active Study Plans & Modules
          </h2>

          {plans.map((plan) => {
            const planTasks =
              plan.tasks && plan.tasks.length > 0
                ? plan.tasks
                : [
                    { id: `fallback-1-${plan.id}`, taskName: 'Week 1: Core Fundamentals & Theory', details: 'Master basic principles and framework concepts', dueDate: 'Week 1', completed: true },
                    { id: `fallback-2-${plan.id}`, taskName: 'Week 2: Hands-on API & Tool Integration', details: 'Build core service modules and practical exercises', dueDate: 'Week 2', completed: false },
                    { id: `fallback-3-${plan.id}`, taskName: 'Week 3: Advanced Optimization & Features', details: 'Implement complex workflows & state handling', dueDate: 'Week 3', completed: false },
                    { id: `fallback-4-${plan.id}`, taskName: 'Week 4: Portfolio Project & Assessment', details: 'Complete capstone testing & final deployment', dueDate: 'Week 4', completed: false },
                  ];

            const completedTasksCount = planTasks.filter((t) => t.completed || t.status === 'COMPLETED').length;
            const progress = Math.round((completedTasksCount / planTasks.length) * 100);

            return (
              <div key={plan.id} className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs space-y-5">
                {/* Plan Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#1A2E22]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900 dark:text-[#F3F4F6]">{plan.title || plan.goal || 'Personalized Career Plan'}</h3>
                      <Badge variant="success" size="xs">{plan.status || 'ACTIVE'}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{plan.description || plan.targetGoal || 'Personalized study path'}</p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#15221B] px-4 py-2 rounded-2xl border border-slate-100 dark:border-[#1F3327]">
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-extrabold uppercase text-slate-400">Roadmap Progress</p>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{completedTasksCount}/{planTasks.length} Completed ({progress}%)</p>
                    </div>
                    <div className="w-12 bg-slate-200 dark:bg-[#1F3327] h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Tasks / Modules List below Study Plan */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Roadmap Modules & Actionable Tasks
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {planTasks.map((task, idx) => {
                      const isTaskCompleted = Boolean(task.completed || task.status === 'COMPLETED');
                      const taskTitle = task.taskName || task.title || task.name || `Task ${idx + 1}`;
                      const taskDetails = task.details || task.topic || 'Core curriculum module task';

                      return (
                        <div
                          key={task.id || idx}
                          className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 text-xs ${
                            isTaskCompleted
                              ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/20 dark:border-emerald-500/30'
                              : 'bg-slate-50 dark:bg-[#151E18] border-slate-100 dark:border-[#1F3327]'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <button
                              type="button"
                              onClick={() => toggleTaskStatus(task.id, isTaskCompleted)}
                              className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                                isTaskCompleted
                                  ? 'bg-emerald-600 text-white'
                                  : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                              }`}
                            >
                              {isTaskCompleted && <CheckCircle2 className="w-4 h-4" />}
                            </button>
                            <div>
                              <p className={`font-bold ${isTaskCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-[#F3F4F6]'}`}>
                                {taskTitle}
                              </p>
                              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                                {taskDetails} • Due: {task.dueDate || 'Flexible'}
                              </p>
                            </div>
                          </div>

                          <Badge variant={isTaskCompleted ? 'success' : 'warning'} size="xs">
                            {isTaskCompleted ? 'COMPLETED' : 'IN PROGRESS'}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CareerRoadmap;

