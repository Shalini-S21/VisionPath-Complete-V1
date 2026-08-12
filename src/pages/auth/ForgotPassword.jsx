import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import authService from '../../services/auth/authService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
      toast.success('Password reset instructions sent!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Forgot Password</h2>
        <p className="text-xs text-slate-500">Enter your email to receive a password reset link</p>
      </div>

      {sent ? (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center space-y-3">
          <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
            We have dispatched password recovery instructions to <span className="font-bold">{email}</span>.
          </p>
          <Link to="/login" className="inline-block text-xs font-bold text-emerald-600 hover:underline">
            Return to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email Address" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your.email@example.com" />
          <Button type="submit" variant="primary" size="md" className="w-full" isLoading={loading}>
            Send Reset Instructions
          </Button>
        </form>
      )}

      <div className="text-center pt-2">
        <Link to="/login" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
