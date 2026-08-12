import React, { useState, useEffect } from 'react';
import { User, Mail, Building, GraduationCap, Save, Loader2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import studentService from '../../services/student/studentService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export const StudentProfile = () => {
  const { user, editProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [educationType, setEducationType] = useState('COLLEGE');
  const [schoolName, setSchoolName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('Bachelor of Technology');
  const [branch, setBranch] = useState('Computer Science');
  const [academicYear, setAcademicYear] = useState('4th Year');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await studentService.getProfile();
        const data = res.data?.data || res.data;
        if (data) {
          if (data.name) setName(data.name);
          if (data.email) setEmail(data.email);
          if (data.educationType) setEducationType(data.educationType);
          if (data.schoolName) setSchoolName(data.schoolName);
          if (data.collegeName) setCollegeName(data.collegeName);
          if (data.degree) setDegree(data.degree);
          if (data.branch) setBranch(data.branch);
          if (data.academicYear) setAcademicYear(data.academicYear);
        }
      } catch (err) {
        console.error('Failed to load student profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name,
        email,
        educationType,
        schoolName: educationType === 'SCHOOL' ? schoolName : '',
        collegeName: educationType === 'COLLEGE' ? collegeName : '',
        degree: educationType === 'COLLEGE' ? degree : '',
        branch: educationType === 'COLLEGE' ? branch : '',
        academicYear,
      };

      await studentService.updateProfile(payload);
      editProfile({ name, email, institution: educationType === 'COLLEGE' ? collegeName : schoolName });
      toast.success('Student profile updated successfully!');
    } catch (err) {
      console.error('Failed to update student profile:', err);
      toast.error('Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Student Academic Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your credentials, degree details, and school/college affiliation
        </p>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-semibold">Loading profile from student-service...</p>
        </div>
      ) : (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Full Name" type="text" icon={User} value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Email Address" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Education Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEducationType('SCHOOL')}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border transition-all ${
                    educationType === 'SCHOOL'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" /> School Student
                </button>
                <button
                  type="button"
                  onClick={() => setEducationType('COLLEGE')}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border transition-all ${
                    educationType === 'COLLEGE'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Building className="w-4 h-4" /> College Student
                </button>
              </div>
            </div>

            {educationType === 'SCHOOL' ? (
              <Input label="School Name" type="text" icon={Building} value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="St. Jude High School" required />
            ) : (
              <>
                <Input label="College / University Name" type="text" icon={Building} value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder="Stanford University" required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Degree Program" type="text" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="B.Tech" required />
                  <Input label="Department / Branch" type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Computer Science" required />
                </div>
              </>
            )}

            <Input label="Academic Year" type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} placeholder="4th Year" />

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} icon={Save}>
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
