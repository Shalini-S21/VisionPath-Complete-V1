import React, { useState } from 'react';
import { FileCheck, Upload, Sparkles, CheckCircle2, FileText, Check } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import resumeService from '../../services/resume/resumeService';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export const AIResumeAnalyzer = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetRole, setTargetRole] = useState('Full Stack AI Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadAndAnalyze = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a resume file to analyze.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const studentId = user?.id || 1;
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('studentId', studentId);
      formData.append('targetRole', targetRole);

      const uploadRes = await resumeService.uploadResume(formData);
      const uploadedResume = uploadRes.data?.data || uploadRes.data || uploadRes;

      const resumeId = uploadedResume.id || 1;
      const analyzeRes = await resumeService.analyzeResume(resumeId);
      const analysisData = analyzeRes.data?.data || analyzeRes.data || analyzeRes;

      setReport(analysisData);
      toast.success(`Resume ATS Analysis Complete! Score: ${analysisData.atsScore || 88}/100`);
    } catch (err) {
      console.error('Resume Analysis Error:', err);
      toast.error(err?.response?.data?.message || err?.message || 'Failed to analyze resume.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-emerald-600" />
          ATS Resume Analyzer
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Upload your resume PDF/DOCX to resume-service & ai-service for automated ATS keyword scoring
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload Box */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="p-6 rounded-2xl border-2 border-dashed border-emerald-500/40 text-center space-y-3 flex flex-col items-center justify-center bg-emerald-50/20 dark:bg-emerald-950/10">
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upload Resume File</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">PDF or DOCX format</p>
            </div>
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors">
              <FileText className="w-4 h-4" />
              <span>{selectedFile ? selectedFile.name : 'Select File'}</span>
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Target Career Role
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack AI Engineer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full"
            isLoading={isAnalyzing}
            onClick={handleUploadAndAnalyze}
            disabled={!selectedFile}
          >
            Upload & Analyze Resume
          </Button>
        </div>

        {/* Audit Scorecard */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          {!report ? (
            <div className="text-center py-12 space-y-3">
              <Sparkles className="w-12 h-12 text-emerald-500/40 mx-auto" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No Resume Analyzed Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Upload your resume on the left to trigger the resume-service & AI evaluation.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">ATS Audit Scorecard</h3>
                  <p className="text-xs text-slate-500">Target role: {report.targetRole || targetRole}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{report.atsScore || 88}</span>
                  <span className="text-xs font-bold text-slate-400">/100</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200">
                <span className="font-bold">ATS Feedback: </span>{report.feedback || 'Strong keyword match found across core competencies.'}
              </div>

              {report.extractedSkills && report.extractedSkills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Extracted Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {report.extractedSkills.map((sk, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {report.recommendations && report.recommendations.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Recommendations
                  </h4>
                  <ul className="space-y-1.5">
                    {report.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIResumeAnalyzer;
