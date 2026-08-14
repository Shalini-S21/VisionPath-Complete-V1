import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Loader2, Compass } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import careerService from '../../services/career/careerService';
import aiService from '../../services/ai/aiService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const CareerRecommendation = () => {
  const { user } = useAuth();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      try {
        const studentId = user?.id || 1;
        const res = await careerService.getRecommendations(studentId).catch(() => null);
        let list = res?.data?.data || res?.data || [];
        if (!Array.isArray(list)) list = [];

        if (list.length === 0) {
          // Invoke ai-service recommend-careers endpoint via Gateway
          const aiRes = await aiService.recommendCareers({
            studentId,
            academicLevel: user?.degree || 'College Undergrad',
            prompt: `Skills: ${user?.skills || 'Java, React, SQL'}`,
          }).catch(() => null);

          const aiData = aiRes?.data?.data || aiRes?.data;
          if (aiData && aiData.resultText) {
            try {
              const parsed = typeof aiData.resultText === 'string' ? JSON.parse(aiData.resultText) : aiData;
              if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
                list = parsed.recommendations.map((item, idx) => ({
                  id: idx + 1,
                  title: item.career || item.title || 'AI Recommended Career',
                  category: 'AI RECOMMENDATION',
                  description: item.reason || item.description || 'Personalized AI Career Path match.',
                  salaryRange: `Match Score: ${item.matchScore || 90}%`,
                  requiredEducation: 'Target Role',
                  requiredSkills: Array.isArray(item.requiredSkills) ? item.requiredSkills.join(', ') : item.requiredSkills || 'Required Core Skills',
                }));
              }
            } catch (e) {
              console.warn('AI Career parsing warning:', e);
            }
          }
        }

        setCareers(list);
      } catch (err) {
        console.error('Failed to load career recommendations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            AI Career Recommendations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Retrieved from career-service and ai-service based on student profile & competencies
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-semibold">Generating recommendations from career-service...</p>
        </div>
      ) : careers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] space-y-3">
          <Compass className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-[#F3F4F6]">No career recommendations found</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Complete your student profile or skills matrix to unlock personalized recommendations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careers.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-[#151E18] text-emerald-700 dark:text-emerald-300 border border-transparent dark:border-[#1F3327]">
                    {c.category || 'CAREER PATH'}
                  </span>
                  <Badge variant="success">{c.requiredEducation || 'Degree'}</Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-[#F3F4F6]">{c.title}</h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{c.salaryRange || '$100,000 - $160,000'}</p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {c.description}
                </p>

                {c.requiredSkills && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Required Skills:</span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{c.requiredSkills}</span>
                  </div>
                )}
              </div>

              <Link to="/student/career-roadmap">
                <Button variant="primary" size="md" className="w-full" icon={ArrowRight}>
                  Adopt Active Roadmap
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerRecommendation;
