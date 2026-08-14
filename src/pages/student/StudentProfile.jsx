import React, { useState, useEffect } from 'react';
import { User, Mail, Building, GraduationCap, Save, Loader2, Phone, MapPin, Award, Target } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import studentService from '../../services/student/studentService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export const StudentProfile = () => {
  const { user, editProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [educationType, setEducationType] = useState('COLLEGE');
  const [schoolName, setSchoolName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('Bachelor of Technology');
  const [branch, setBranch] = useState('Computer Science');
  const [academicYear, setAcademicYear] = useState('4th Year');
  const [cgpa, setCgpa] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [location, setLocation] = useState('');
  const [counselorEmail, setCounselorEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await studentService.getProfile();
        const data = res.data?.data || res.data;
        if (data) {
          if (data.firstName || data.lastName) {
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setName(`${data.firstName || ''} ${data.lastName || ''}`.trim());
          } else if (data.name) {
            setName(data.name);
          }
          if (data.email) setEmail(data.email);
          if (data.phone) setPhone(data.phone);
          if (data.educationType) setEducationType(data.educationType);
          if (data.college) {
            setCollegeName(data.college);
            setSchoolName(data.college);
          } else {
            if (data.schoolName) setSchoolName(data.schoolName);
            if (data.collegeName) setCollegeName(data.collegeName);
          }
          if (data.degree) setDegree(data.degree);
          if (data.department) setBranch(data.department);
          else if (data.branch) setBranch(data.branch);
          if (data.year) setAcademicYear(`${data.year}th Year`);
          else if (data.academicYear) setAcademicYear(data.academicYear);
          if (data.cgpa !== undefined && data.cgpa !== null) setCgpa(String(data.cgpa));
          if (data.careerGoals) setCareerGoals(data.careerGoals);
          if (data.location) setLocation(data.location);
          if (data.counselorEmail) setCounselorEmail(data.counselorEmail);
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
      const nameParts = name.trim().split(/\s+/, 2);
      const computedFirstName = firstName || nameParts[0] || '';
      const computedLastName = lastName || (nameParts.length > 1 ? nameParts[1] : '');
      const institutionVal = educationType === 'COLLEGE' ? collegeName : schoolName;

      const payload = {
        name,
        firstName: computedFirstName,
        lastName: computedLastName,
        email,
        phone,
        educationType,
        schoolName: educationType === 'SCHOOL' ? schoolName : '',
        collegeName: educationType === 'COLLEGE' ? collegeName : '',
        college: institutionVal,
        degree: educationType === 'COLLEGE' ? degree : '',
        branch: educationType === 'COLLEGE' ? branch : '',
        department: educationType === 'COLLEGE' ? branch : '',
        academicYear,
        year: parseInt(academicYear.replace(/[^0-9]/g, '')) || 4,
        cgpa: cgpa ? parseFloat(cgpa) : null,
        careerGoals,
        location,
        counselorEmail,
      };

      await studentService.updateProfile(payload);
      editProfile({ name, email, institution: institutionVal });
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
        <h1 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6]">Student Academic Profile</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your credentials, degree details, contact info, and career aspirations
        </p>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-semibold">Loading profile from student-service...</p>
        </div>
      ) : (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" type="text" icon={User} value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Phone Number" type="text" icon={Phone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Email Address" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input label="Current Location" type="text" icon={MapPin} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="San Francisco, CA" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Input label="Counselor Email" type="email" icon={Mail} value={counselorEmail} onChange={(e) => setCounselorEmail(e.target.value)} placeholder="counselor@visionpath.com" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Education Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEducationType('SCHOOL')}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    educationType === 'SCHOOL'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-[#151E18] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F3327]'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" /> School Student
                </button>
                <button
                  type="button"
                  onClick={() => setEducationType('COLLEGE')}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    educationType === 'COLLEGE'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-[#151E18] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1F3327]'
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label={educationType === 'SCHOOL' ? "Grade" : "Academic Year"} type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} placeholder={educationType === 'SCHOOL' ? "10th Grade" : "4th Year"} />
              <Input label="CGPA / Score" type="number" step="0.01" icon={Award} value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="3.8" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Career Goals & Aspirations
              </label>
              <textarea
                rows={3}
                value={careerGoals}
                onChange={(e) => setCareerGoals(e.target.value)}
                placeholder="Describe your career objectives, desired roles (e.g. AI Engineer, Data Scientist), and tech stack focus..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#1F3327] bg-slate-50 dark:bg-[#151E18] text-xs text-slate-900 dark:text-[#F3F4F6] placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

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

