import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, LogIn, GraduationCap, UserCheck, Shield } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fillPreset = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter username and password.');
      return;
    }

    const res = await login(username, password);
    if (res.success) {
      toast.success(`Welcome back, ${res.user.name || res.user.username}!`);
      if (res.user.role === 'counselor') {
        navigate('/counselor/dashboard');
      } else if (res.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      toast.error(res.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-slate-900 dark:text-[#F3F4F6] tracking-tight">Sign In to VisionPath</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Access your AI-powered career roadmap & dashboard</p>
      </div>

      {/* Preset Credential Buttons */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#151E18] border border-slate-200 dark:border-[#1F3327] space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block text-center">
          Quick Demo Presets
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => fillPreset('student@visionpath.com', 'password123')}
            className="p-2 rounded-xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] hover:border-emerald-500 text-xs font-bold flex flex-col items-center gap-1 transition-all text-slate-900 dark:text-[#F3F4F6] cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => fillPreset('counselor@visionpath.com', 'password123')}
            className="p-2 rounded-xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] hover:border-emerald-500 text-xs font-bold flex flex-col items-center gap-1 transition-all text-slate-900 dark:text-[#F3F4F6] cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Counselor</span>
          </button>

          <button
            type="button"
            onClick={() => fillPreset('admin@visionpath.com', 'admin123')}
            className="p-2 rounded-xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] hover:border-emerald-500 text-xs font-bold flex flex-col items-center gap-1 transition-all text-slate-900 dark:text-[#F3F4F6] cursor-pointer"
          >
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username or Email"
          type="text"
          icon={User}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. student@visionpath.com"
          required
        />

        <Input
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-between text-xs font-semibold">
          <Link to="/forgot-password" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full" isLoading={loading} icon={LogIn}>
          Sign In
        </Button>
      </form>

      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-[#1F3327]">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
