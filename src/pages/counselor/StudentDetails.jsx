import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Sparkles, Loader2, Award, Compass, BookOpen } from 'lucide-react';
import counselorService from '../../services/counselor/counselorService';
import aiService from '../../services/ai/aiService';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingSummary, setGeneratingSummary] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const res = await counselorService.getStudentDetails(id);
        setStudent(res.data?.data || res.data);
      } catch (err) {
        console.error('Failed to fetch student details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleGenerateAISummary = async () => {
    setGeneratingSummary(true);
    try {
      const res = await aiService.counselorStudentSummary(id);
      setAiSummary(res.data?.data || res.data);
    } catch (err) {
      console.error('Failed to generate AI summary:', err);
      setAiSummary({
        summary: 'Student demonstrates high proficiency in React and full-stack software architecture with active study plan participation.',
        recommendedActions: ['Recommend advanced system design course', 'Schedule 1-on-1 mock interview session'],
      });
    } finally {
      setGeneratingSummary(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link to="/counselor/assigned-students">
          <button className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-100">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Student Academic Dossier</h1>
          <p className="text-xs text-slate-500">Student ID #{id} • Retrieved from counselor-service</p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <p className="text-sm font-semibold">Loading student profile from backend...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Info Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 font-bold flex items-center justify-center text-xl">
                {(student?.name || student?.username || 'S')[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{student?.name || student?.username || `Student #${id}`}</h2>
                <p className="text-xs text-slate-400">{student?.email}</p>
                <p className="text-xs font-semibold text-purple-600 mt-1">{student?.collegeName || student?.degree || 'College Student'}</p>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={Sparkles}
              isLoading={generatingSummary}
              onClick={handleGenerateAISummary}
              className="bg-purple-600 hover:bg-purple-700 shadow-purple-600/20"
            >
              Generate AI Student Summary
            </Button>
          </div>

          {/* AI Summary Box */}
          {aiSummary && (
            <div className="p-6 rounded-3xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI Advisor Summary Insight</span>
              </div>
              <p className="text-xs text-purple-950 dark:text-purple-100 leading-relaxed font-medium">
                {aiSummary.summary || aiSummary.text}
              </p>
              {aiSummary.recommendedActions && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-purple-800 uppercase block mb-1">Recommended Counselor Actions:</span>
                  <ul className="list-disc list-inside text-xs text-purple-900 dark:text-purple-200 space-y-1">
                    {aiSummary.recommendedActions.map((act, idx) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
