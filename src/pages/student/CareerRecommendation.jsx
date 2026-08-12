import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Loader2, Compass } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import careerService from '../../services/career/careerService';
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
        const res = await careerService.getRecommendations(studentId).catch(() => careerService.getAllCareers());
        const data = res.data?.data || res.data || [];
        setCareers(Array.isArray(data) ? data : []);
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
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            AI Career Recommendations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Retrieved from career-service and ai-service based on student profile & competencies
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-semibold">Generating recommendations from career-service...</p>
        </div>
      ) : careers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Compass className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">No career recommendations found</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Complete your student profile or skills matrix to unlock personalized recommendations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careers.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {c.category || 'CAREER PATH'}
                  </span>
                  <Badge variant="primary">{c.requiredEducation || 'Degree'}</Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{c.title}</h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{c.salaryRange || '$100,000 - $160,000'}</p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {c.description}
                </p>

                {c.requiredSkills && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Required Skills:</span>
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
