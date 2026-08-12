import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Award } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import studentService from '../../services/student/studentService';
import skillService from '../../services/skill/skillService';
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

  const fetchSkillsData = async () => {
    setLoading(true);
    try {
      const studentId = user?.id || 1;
      const [userSkillsRes, allSkillsRes] = await Promise.all([
        skillService.getStudentSkills(studentId).catch(() => studentService.getSkills()),
        skillService.getAllSkills().catch(() => ({ data: [] })),
      ]);

      const userSkillsData = userSkillsRes.data?.data || userSkillsRes.data || [];
      const allSkillsData = allSkillsRes.data?.data || allSkillsRes.data || [];

      setSkills(Array.isArray(userSkillsData) ? userSkillsData : []);
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
        await studentService.addSkill(customSkillName, level);
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
        await studentService.deleteSkill(id);
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
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Technical Skill Matrix</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified skills and proficiencies retrieved from skill-service
          </p>
        </div>
        <Button variant="primary" size="md" icon={Plus} onClick={() => setIsModalOpen(true)}>
          Add Skill
        </Button>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-semibold">Loading skill matrix from backend...</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <Award className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">No skills registered yet</p>
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
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  {skill.category || 'TECHNICAL'}
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{skill.proficiencyLevel || skill.level || 'INTERMEDIATE'}</Badge>
                  <button
                    onClick={() => handleDeleteSkill(skill.id, skill.skillId)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    title="Remove Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {skill.skillName || skill.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Source: {skill.source || 'MANUAL'}</p>
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
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
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
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
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
