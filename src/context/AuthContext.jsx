import React, { createContext, useState } from 'react';
import authService from '../services/auth/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('visionpath_token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('visionpath_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await authService.login({ email: username, username, password });
      const data = response.data?.data || response.data;
      
      const jwtToken = data.token || data.jwt || data.accessToken;
      const userData = {
        id: data.userId || data.id,
        username: data.username || username,
        email: data.email || username,
        name: data.name || data.fullName || username,
        role: (data.role || 'STUDENT').toLowerCase(),
        status: data.status || 'ACTIVE',
      };

      setToken(jwtToken);
      setUser(userData);

      localStorage.setItem('visionpath_token', jwtToken);
      localStorage.setItem('visionpath_user', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Invalid email/username or password';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const registerStudent = async (payload) => {
    setLoading(true);
    try {
      const response = await authService.registerStudent({
        ...payload,
        email: payload.email || payload.username,
        role: 'STUDENT'
      });
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Student registration failed';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const registerCounselor = async (payload) => {
    setLoading(true);
    try {
      const response = await authService.registerCounselor({
        ...payload,
        email: payload.email || payload.username,
        role: 'COUNSELOR'
      });
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Counselor registration failed';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('visionpath_token');
    localStorage.removeItem('visionpath_user');
  };

  const editProfile = (updatedFields) => {
    if (user) {
      const updated = { ...user, ...updatedFields };
      setUser(updated);
      localStorage.setItem('visionpath_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        registerStudent,
        registerCounselor,
        logout,
        editProfile,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
