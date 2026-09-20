import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();

  if (!role || !allowedRoles.includes(role)) {
    if (role === 'counselor') return <Navigate to="/counselor/dashboard" replace />;
    if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/student/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
