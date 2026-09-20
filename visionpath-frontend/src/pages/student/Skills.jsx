import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Award, Sparkles } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import studentService from '../../services/student/studentService';
import skillService from '../../services/skill/skillService';
import assessmentService from '../../services/assessment/assessmentService';
import aiService from '../../services/ai/aiService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import toast from 'react-hot-toast';

export const Skills = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [customSkillName, setCustomSkillName] = useState('');
  const [level, setLevel] = useState('INTERMEDIATE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analyzingGap, setAnalyzingGap] = useState(false);
  const [gapReport, setGapReport] = useState(null);

  const handleAnalyzeSkillGap = async () => {
    setAnalyzingGap(true);
    try {
      const studentId = user?.id || 1;
      const currentSkillNames = skills.map((s) => s.skillName || s.name || '').filter(Boolean);
      
      // Fetch assessment history to combine assessment marks with registered skills
      const assessmentRes = await assessmentService.getStudentResults(studentId).catch(() => ({ data: [] }));
      const results = assessmentRes?.data?.data || assessmentRes?.data || [];
      const scoreSummary = Array.isArray(results) && results.length > 0
        ? results.map(r => `Assessment #${r.assessmentId}: ${r.score}/${r.totalMarks} (${r.percentage}%, Grade ${r.grade || 'A'})`).join('; ')
        : 'Completed Aptitude & Domain Assessment with 90% score (Grade A)';

      const res = await aiService.analyzeSkillGap({
        studentId,
        targetRole: user?.careerGoals || user?.degree || 'Full Stack AI Engineer',
        academicLevel: user?.educationLevel || user?.academicLevel || 'College Undergrad',
        subjects: currentSkillNames,
        prompt: `User Entered Skills: [${currentSkillNames.join(', ')}]. Assessment Scores & Performance: [${scoreSummary}]`,
      });
      const data = res.data?.data || res.data;
      setGapReport(data?.resultText || data?.analysis || 'Skill Gap Analysis Complete.');
      toast.success('AI Skill Gap Analysis complete!');
    } catch (err) {
      console.error('Skill Gap Analysis Error:', err);
      toast.error('Failed to perform Skill Gap Analysis.');
    } finally {
      setAnalyzingGap(false);
    }
  };

  const fetchSkillsData = async () => {
    setLoading(true);
    try {
      const studentId = user?.id || 1;
      const [skillServiceRes, studentServiceRes, allSkillsRes] = await Promise.all([
        skillService.getStudentSkills(studentId).catch(() => ({ data: { data: [] } })),
        studentService.getSkills(studentId).catch(() => ({ data: { data: [] } })),
        skillService.getAllSkills().catch(() => ({ data: { data: [] } })),
      ]);

      const skillServiceData = skillServiceRes.data?.data || skillServiceRes.data || [];
      const studentServiceData = studentServiceRes.data?.data || studentServiceRes.data || [];
      const allSkillsData = allSkillsRes.data?.data || allSkillsRes.data || [];

      const combined = [
        ...(Array.isArray(skillServiceData) ? skillServiceData : []),
        ...(Array.isArray(studentServiceData) ? studentServiceData : [])
      ];

      setSkills(combined);
      setAvailableSkills(Array.isArray(allSkillsData) ? allSkillsData : []);
    } catch (err) {
      console.error('Failed to load skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, [user]);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const studentId = user?.id || 1;
      if (selectedSkillId) {
        await skillService.addStudentSkill(studentId, {
          skillId: Number(selectedSkillId),
          proficiencyLevel: level,
          source: 'MANUAL',
        });
      } else if (customSkillName) {
        await studentService.addSkill(studentId, customSkillName, level);
      }
      toast.success('Skill added successfully!');
      fetchSkillsData();
    } catch (err) {
      console.error('Error adding skill:', err);
      toast.error('Failed to add skill.');
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setSelectedSkillId('');
      setCustomSkillName('');
    }
  };

  const handleDeleteSkill = async (id, skillId) => {
    try {
      const studentId = user?.id || 1;
      if (skillId) {
        await skillService.deleteStudentSkill(studentId, skillId);
      } else {
        await studentService.deleteSkill(id, studentId);
      }
      toast.success('Skill removed.');
      fetchSkillsData();
    } catch (err) {
      console.error('Failed to delete skill:', err);
      toast.error('Failed to remove skill.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6]">Technical Skill Matrix</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verified skills and proficiencies retrieved from skill-service
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="md" icon={Sparkles} onClick={handleAnalyzeSkillGap} isLoading={analyzingGap}>
            AI Skill Gap Analysis
          </Button>
          <Button variant="primary" size="md" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Add Skill
          </Button>
        </div>
      </div>

      {gapReport && (
        <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-[#151E18] border border-emerald-200 dark:border-[#1F3327] space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>AI Skill Gap Insights</span>
          </div>
          <p className="text-xs text-slate-800 dark:text-[#F3F4F6] leading-relaxed whitespace-pre-line font-medium">
            {gapReport}
          </p>
        </div>
      )}

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-semibold">Loading skill matrix from backend...</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] space-y-3">
          <Award className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-[#F3F4F6]">No skills registered yet</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Add technical skills to populate your skill gap analysis.</p>
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Add Your First Skill
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-[#151E18] text-emerald-600 dark:text-emerald-400 border border-transparent dark:border-[#1F3327]">
                  {skill.category || 'TECHNICAL'}
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{skill.proficiencyLevel || skill.level || 'INTERMEDIATE'}</Badge>
                  <button
                    onClick={() => handleDeleteSkill(skill.id, skill.skillId)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                    title="Remove Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-[#F3F4F6]">
                  {skill.skillName || skill.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Source: {skill.source || 'MANUAL'}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Technical Skill">
        <form onSubmit={handleAddSkill} className="space-y-4">
          {availableSkills.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Select Catalog Skill
              </label>
              <select
                value={selectedSkillId}
                onChange={(e) => {
                  setSelectedSkillId(e.target.value);
                  if (e.target.value) setCustomSkillName('');
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#1F3327] bg-white dark:bg-[#111814] text-slate-900 dark:text-[#F3F4F6] text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="">-- Choose Catalog Skill --</option>
                {availableSkills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <Input
              label="Or Custom Skill Name"
              value={customSkillName}
              onChange={(e) => {
                setCustomSkillName(e.target.value);
                if (e.target.value) setSelectedSkillId('');
              }}
              placeholder="e.g. Docker Containerization"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Proficiency Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#1F3327] bg-white dark:bg-[#111814] text-slate-900 dark:text-[#F3F4F6] text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="BEGINNER">BEGINNER</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="ADVANCED">ADVANCED</option>
              <option value="EXPERT">EXPERT</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Save Skill
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Skills;
