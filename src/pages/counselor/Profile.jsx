import React, { useState, useEffect } from 'react';
import { UserCheck, Mail, Building, Save, ShieldCheck } from 'lucide-react';
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
  const [institution, setInstitution] = useState('');
  const [qualification, setQualification] = useState('');
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
          if (data.institution) setInstitution(data.institution);
          if (data.qualification) setQualification(data.qualification);
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
      await counselorService.updateProfile({ name, email, institution, qualification });
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
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Counselor Advisor Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage professional accreditation & institution details</p>
        </div>
        <Badge variant={status === 'APPROVED' ? 'success' : 'warning'}>
          {status}
        </Badge>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Full Name" type="text" icon={UserCheck} value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email Address" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Institution / Organization" type="text" icon={Building} value={institution} onChange={(e) => setInstitution(e.target.value)} required />
          <Input label="Professional Qualification" type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} required />

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} icon={Save} className="bg-purple-600 hover:bg-purple-700">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
