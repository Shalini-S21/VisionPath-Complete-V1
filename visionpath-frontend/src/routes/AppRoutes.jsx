import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import StudentLayout from '../layouts/StudentLayout';
import CounselorLayout from '../layouts/CounselorLayout';
import AdminLayout from '../layouts/AdminLayout';

// Middleware
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';

// Public Pages
import SplashScreen from '../pages/splash/SplashScreen';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentProfile from '../pages/student/StudentProfile';
import Skills from '../pages/student/Skills';
import CareerAssessment from '../pages/student/CareerAssessment';
import CareerRecommendation from '../pages/student/CareerRecommendation';
import CareerRoadmap from '../pages/student/CareerRoadmap';
import AIResumeAnalyzer from '../pages/student/AIResumeAnalyzer';
import AICareerAssistant from '../pages/student/AICareerAssistant';

// Counselor Pages
import CounselorDashboard from '../pages/counselor/Dashboard';
import AssignedStudents from '../pages/counselor/AssignedStudents';
import StudentDetails from '../pages/counselor/StudentDetails';
import CounselorProfile from '../pages/counselor/Profile';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import CounselorMgmt from '../pages/admin/CounselorMgmt';
import UserMgmt from '../pages/admin/UserMgmt';

// Error Pages
import NotFound from '../pages/errors/NotFound';
import Unauthorized from '../pages/errors/Unauthorized';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<SplashScreen />} />
      </Route>

      {/* Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Student Portal */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleProtectedRoute allowedRoles={['student']} />}>
          <Route element={<StudentLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/skills" element={<Skills />} />
            <Route path="/student/career-assessment" element={<CareerAssessment />} />
            <Route path="/student/career-recommendation" element={<CareerRecommendation />} />
            <Route path="/student/career-roadmap" element={<CareerRoadmap />} />
            <Route path="/student/ai-resume-analyzer" element={<AIResumeAnalyzer />} />
            <Route path="/student/ai-career-assistant" element={<AICareerAssistant />} />
          </Route>
        </Route>
      </Route>

      {/* Counselor Portal */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleProtectedRoute allowedRoles={['counselor']} />}>
          <Route element={<CounselorLayout />}>
            <Route path="/counselor/dashboard" element={<CounselorDashboard />} />
            <Route path="/counselor/assigned-students" element={<AssignedStudents />} />
            <Route path="/counselor/student/:id" element={<StudentDetails />} />
            <Route path="/counselor/profile" element={<CounselorProfile />} />
          </Route>
        </Route>
      </Route>

      {/* Admin Portal */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/counselors" element={<CounselorMgmt />} />
            <Route path="/admin/users" element={<UserMgmt />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback Routes */}
      <Route path="/403" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
