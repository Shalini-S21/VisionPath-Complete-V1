import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, GraduationCap, UserCheck, ShieldAlert, Clock, Linkedin } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export const Register = () => {
  const navigate = useNavigate();
  const { registerStudent, registerCounselor, loading } = useAuth();

  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Student specific
  const [educationType, setEducationType] = useState('COLLEGE');
  const [schoolName, setSchoolName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('Bachelor of Technology');
  const [branch, setBranch] = useState('Computer Science');
  const [academicYear, setAcademicYear] = useState('4th Year');

  // Counselor specific
  const [institution, setInstitution] = useState('');
  const [qualification, setQualification] = useState('M.Sc. Career Counseling');
  const [experienceYears, setExperienceYears] = useState('');
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [counselorNotice, setCounselorNotice] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === 'student') {
      const payload = {
        name,
        email,
        username,
        password,
        educationType,
        schoolName: educationType === 'SCHOOL' ? schoolName : '',
        collegeName: educationType === 'COLLEGE' ? collegeName : '',
        degree: educationType === 'COLLEGE' ? degree : '',
        branch: educationType === 'COLLEGE' ? branch : '',
        academicYear,
      };

      const res = await registerStudent(payload);
      if (res.success) {
        toast.success('Student account registered! Please sign in.');
        navigate('/login');
      } else {
        toast.error(res.message || 'Registration failed.');
      }
    } else {
      const payload = {
        name,
        email,
        username,
        password,
        institution,
        qualification,
        experienceYears: experienceYears ? parseInt(experienceYears) : null,
        linkedinProfile,
      };

      const res = await registerCounselor(payload);
      if (res.success) {
        setCounselorNotice(true);
        toast.success('Counselor registration submitted!');
      } else {
        toast.error(res.message || 'Registration failed.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6] tracking-tight">Create VisionPath Account</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Join the AI career & education guidance platform</p>
      </div>

      {counselorNotice ? (
        <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-[#F3F4F6]">Verification Pending</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Your counselor account has been submitted for admin verification. An administrator will review your credentials before full access is granted.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
            Return to Sign In
          </Button>
        </div>
      ) : (
        <>
          {/* Role Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#151E18] border border-slate-200/60 dark:border-[#1F3327]">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                role === 'student'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-[#F3F4F6]'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole('counselor')}
              className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                role === 'counselor'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-[#F3F4F6]'
              }`}
            >
              <UserCheck className="w-4 h-4" /> Counselor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" type="text" icon={User} value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Alex Johnson" />
            <Input label="Email Address" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="alex@example.com" />
            <Input label="Username" type="text" icon={User} value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="alexjohnson" />
            <Input label="Password" type="password" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />

            {role === 'student' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Education Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEducationType('SCHOOL')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        educationType === 'SCHOOL'
                          ? 'bg-emerald-50 dark:bg-[#151E18] border-emerald-500 text-emerald-600 dark:text-emerald-400'
                          : 'border-slate-200 dark:border-[#1F3327] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      School Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setEducationType('COLLEGE')}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        educationType === 'COLLEGE'
                          ? 'bg-emerald-50 dark:bg-[#151E18] border-emerald-500 text-emerald-600 dark:text-emerald-400'
                          : 'border-slate-200 dark:border-[#1F3327] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      College Student
                    </button>
                  </div>
                </div>

                {educationType === 'SCHOOL' ? (
                  <Input label="School Name" type="text" icon={Building} value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="St. Jude High School" required />
                ) : (
                  <>
                    <Input label="College Name" type="text" icon={Building} value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder="Stanford University" required />
                    <div className="grid grid-cols-2 gap-2">
                      <Input label="Degree" type="text" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="B.Tech" required />
                      <Input label="Branch" type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Computer Science" required />
                    </div>
                  </>
                )}
                <Input label={educationType === 'SCHOOL' ? "Grade" : "Academic Year"} type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} placeholder={educationType === 'SCHOOL' ? "10th Grade" : "4th Year"} />
              </>
            ) : (
              <>
                <Input label="Institution / Organization" type="text" icon={Building} value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="National Counseling Bureau" required />
                <Input label="Professional Qualification" type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} placeholder="M.Sc. Counseling Psychology" required />
                <Input label="Years of Experience" type="number" icon={Clock} value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} placeholder="e.g. 5" required />
                <Input label="LinkedIn Profile URL" type="url" icon={Linkedin} value={linkedinProfile} onChange={(e) => setLinkedinProfile(e.target.value)} placeholder="https://linkedin.com/in/username" />
              </>
            )}

            <Button type="submit" variant="primary" size="md" className="w-full" isLoading={loading}>
              Create Account
            </Button>
          </form>
        </>
      )}

      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-[#1F3327]">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
