import React, { useState, useEffect } from 'react';
import { UserCheck, Mail, Building, Save, ShieldCheck, Briefcase, Award, Phone, AlignLeft, Clock, Linkedin } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import counselorService from '../../services/counselor/counselorService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState('');
  const [title, setTitle] = useState('Senior Career Advisor');
  const [specialization, setSpecialization] = useState('Tech Careers, Study Abroad');
  const [institution, setInstitution] = useState('');
  const [qualification, setQualification] = useState('');
  const [experienceYears, setExperienceYears] = useState('10');
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [bio, setBio] = useState('');
  const [status, setStatus] = useState('APPROVED');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await counselorService.getProfile();
        const data = res.data?.data || res.data;
        if (data) {
          if (data.name) setName(data.name);
          if (data.email) setEmail(data.email);
          if (data.contactEmail) setEmail(data.contactEmail);
          if (data.contactPhone) setContactPhone(data.contactPhone);
          if (data.title) setTitle(data.title);
          if (data.specialization) setSpecialization(data.specialization);
          if (data.institution) setInstitution(data.institution);
          if (data.qualification) setQualification(data.qualification);
          if (data.experienceYears !== undefined && data.experienceYears !== null) setExperienceYears(String(data.experienceYears));
          if (data.linkedinProfile) setLinkedinProfile(data.linkedinProfile);
          if (data.bio) setBio(data.bio);
          if (data.status) setStatus(data.status);
        }
      } catch (err) {
        console.error('Failed to load counselor profile:', err);
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
        contactEmail: email,
        contactPhone,
        title,
        specialization,
        institution,
        qualification,
        experienceYears: experienceYears ? parseInt(experienceYears) : null,
        linkedinProfile,
        bio,
      };

      await counselorService.updateProfile(payload);
      toast.success('Counselor profile updated successfully!');
    } catch (err) {
      console.error('Failed to update counselor profile:', err);
      toast.error('Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6]">Counselor Advisor Profile</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage professional accreditation, specialization & contact details</p>
        </div>
        <Badge variant={status === 'APPROVED' ? 'success' : 'warning'}>
          {status}
        </Badge>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" type="text" icon={UserCheck} value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Professional Title" type="text" icon={Briefcase} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Senior Career Advisor" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email Address" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Contact Phone" type="text" icon={Phone} value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+1 (555) 000-0000" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Institution / Organization" type="text" icon={Building} value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Stanford Counseling Center" required />
            <Input label="Professional Qualification" type="text" icon={Award} value={qualification} onChange={(e) => setQualification(e.target.value)} placeholder="M.Ed. Educational Counseling" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Specialization Areas" type="text" icon={ShieldCheck} value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="Tech Careers, AI & Data Science" />
            <Input label="Years of Experience" type="number" icon={Clock} value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} placeholder="10" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Input label="LinkedIn Profile URL" type="url" icon={Linkedin} value={linkedinProfile} onChange={(e) => setLinkedinProfile(e.target.value)} placeholder="https://linkedin.com/in/counselor" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Professional Bio & Advisory Philosophy
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your background, advice strategy, and guidance focus for students..."
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
    </div>
  );
};

export default Profile;
