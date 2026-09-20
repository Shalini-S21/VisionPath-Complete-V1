import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Award, Users } from 'lucide-react';
import Button from '../../components/common/Button';

export const SplashScreen = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-[#151E18] border border-emerald-200 dark:border-[#1F3327] text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Career & Education Guidance Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-[#F3F4F6] tracking-tight leading-tight">
          Navigate Your Future with <span className="text-emerald-600 dark:text-emerald-400">AI Intelligence</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          VisionPath analyzes your skills, assesses your competencies, and builds personalized study roadmaps and career paths backed by microservices and real-time AI guidance.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
          <Link to="/register">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Get Started Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">
              Sign In to Account
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-[#151E18] text-emerald-600 dark:text-emerald-400 border border-transparent dark:border-[#1F3327] flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-[#F3F4F6]">AI Competency Tests</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Take subject, aptitude, and psychometric assessments scored by our backend assessment engine.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-[#151E18] text-emerald-600 dark:text-emerald-400 border border-transparent dark:border-[#1F3327] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-[#F3F4F6]">Personalized Study Plans</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Automated study task generation and daily goal tracking powered by study-plan-service.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#111814] border border-slate-200 dark:border-[#1F3327] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-[#151E18] text-emerald-600 dark:text-emerald-400 border border-transparent dark:border-[#1F3327] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-[#F3F4F6]">Verified Counselor Network</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Connect with accredited career advisors verified by system administrators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
