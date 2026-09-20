import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import counselorService from '../../services/counselor/counselorService';
import aiService from '../../services/ai/aiService';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

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
      const data = res.data?.data || res.data;
      let summaryObj = data;
      if (data && data.resultText) {
        try {
          summaryObj = typeof data.resultText === 'string' ? JSON.parse(data.resultText) : data;
        } catch (e) {
          summaryObj = {
            summary: data.resultText,
            recommendedActions: data.suggestions || ['Review student progress in weekly 1-on-1 session'],
          };
        }
      }
      setAiSummary(summaryObj);
    } catch (err) {
      console.error('Failed to generate AI summary:', err);
      toast.error(err?.response?.data?.message || 'Failed to generate AI student summary.');
    } finally {
      setGeneratingSummary(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link to="/counselor/assigned-students">
          <button className="p-2 rounded-xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#151E18] transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6]">Student Academic Dossier</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Student ID #{id} • Retrieved from counselor-service</p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-semibold">Loading student profile from backend...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Info Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-[#151E18] text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-xl border border-transparent dark:border-[#1F3327]">
                {(student?.name || student?.username || 'S')[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-[#F3F4F6]">{student?.name || student?.username || `Student #${id}`}</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">{student?.email}</p>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{student?.collegeName || student?.degree || 'College Student'}</p>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={Sparkles}
              isLoading={generatingSummary}
              onClick={handleGenerateAISummary}
            >
              Generate AI Student Summary
            </Button>
          </div>

          {/* AI Summary Box */}
          {aiSummary && (
            <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-[#151E18] border border-emerald-200 dark:border-[#1F3327] space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>AI Advisor Summary Insight</span>
              </div>
              <p className="text-xs text-emerald-950 dark:text-[#F3F4F6] leading-relaxed font-medium">
                {aiSummary.summary || aiSummary.text}
              </p>
              {aiSummary.recommendedActions && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase block mb-1">Recommended Counselor Actions:</span>
                  <ul className="list-disc list-inside text-xs text-emerald-900 dark:text-slate-300 space-y-1">
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
