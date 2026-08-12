import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, Award, Sparkles, Map, CheckCircle2, FileCheck, Loader2 } from 'lucide-react';
import StatCard from '../../components/cards/StatCard';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import studentService from '../../services/student/studentService';
import skillService from '../../services/skill/skillService';
import studyPlanService from '../../services/studyPlan/studyPlanService';
import assessmentService from '../../services/assessment/assessmentService';
import resumeService from '../../services/resume/resumeService';

export const Dashboard = () => {
  const { user } = useAuth();

  const [studentProfile, setStudentProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [studyPlanProgress, setStudyPlanProgress] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDashboard = async () => {
      setLoading(true);
      try {
        const studentId = user?.id || 1;
        const [profileRes, skillsRes, progressRes, resultsRes, resumesRes] = await Promise.all([
          studentService.getProfile().catch(() => ({ data: null })),
          skillService.getStudentSkills(studentId).catch(() => ({ data: [] })),
          studyPlanService.getStudentProgress(studentId).catch(() => ({ data: null })),
          assessmentService.getResults(studentId).catch(() => ({ data: [] })),
          resumeService.getStudentResumes(studentId).catch(() => ({ data: [] })),
        ]);

        setStudentProfile(profileRes.data?.data || profileRes.data);
        setSkills(Array.isArray(skillsRes.data?.data) ? skillsRes.data.data : Array.isArray(skillsRes.data) ? skillsRes.data : []);
        setStudyPlanProgress(progressRes.data?.data || progressRes.data);
        setAssessmentResults(Array.isArray(resultsRes.data?.data) ? resultsRes.data.data : Array.isArray(resultsRes.data) ? resultsRes.data : []);
        setResumes(Array.isArray(resumesRes.data?.data) ? resumesRes.data.data : Array.isArray(resumesRes.data) ? resumesRes.data : []);
      } catch (err) {
        console.error('Failed to load student dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDashboard();
  }, [user]);

  const latestResume = resumes.length > 0 ? resumes[0] : null;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14532D] via-emerald-800 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-sm border border-emerald-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Role: {latestResume?.targetRole || 'Full Stack AI Engineer'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {studentProfile?.name || user?.name || 'Student'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            {studentProfile?.schoolName || studentProfile?.collegeName
              ? `Enrolled at ${studentProfile.schoolName || studentProfile.collegeName}`
              : 'Your AI-powered career roadmap is active.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link to="/student/career-roadmap">
            <Button variant="primary" size="md" icon={Map} className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold">
              View Study Plan
            </Button>
          </Link>
          <Link to="/student/ai-career-assistant">
            <Button variant="outline" size="md" icon={Sparkles} className="border-emerald-300 text-emerald-100 hover:bg-emerald-800/40">
              Ask AI Mentor
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-semibold">Fetching your live dashboard data from API Gateway...</p>
        </div>
      ) : (
        <>
          {/* Statistics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Acquired Skills"
              value={skills.length}
              change={`${skills.length} tracked`}
              isIncrease={true}
              icon={Compass}
              description="Proficiencies recorded in skill-service"
            />
            <StatCard
              title="Assessments Taken"
              value={assessmentResults.length}
              change="Verified"
              isIncrease={true}
              icon={Award}
              description="Evaluated by assessment-service"
            />
            <StatCard
              title="ATS Resume Score"
              value={latestResume?.atsScore ? `${latestResume.atsScore}/100` : 'Not Evaluated'}
              change={latestResume ? 'Evaluated' : 'Upload Resume'}
              isIncrease={true}
              icon={FileCheck}
              description={latestResume ? latestResume.filename : 'Upload to calculate score'}
            />
            <StatCard
              title="Study Plan Tasks"
              value={studyPlanProgress?.completedTasks || 0}
              change="Completed"
              isIncrease={true}
              icon={BookOpen}
              description="Tasks completed in study-plan-service"
            />
          </div>

          {/* Skills Portfolio Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-600" />
                  My Skills Portfolio
                </h2>
                <p className="text-xs text-slate-500">Retrieved from skill-service</p>
              </div>
              <Link to="/student/skills" className="text-xs font-bold text-emerald-600 hover:underline">
                Manage Skills &rarr;
              </Link>
            </div>

            {skills.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                No skills registered yet. Click 'Manage Skills' to build your matrix!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.slice(0, 6).map((sk) => (
                  <div
                    key={sk.id}
                    className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{sk.skillName || sk.name}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-900">
                      {sk.proficiencyLevel || 'INTERMEDIATE'}
                    </span>
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
