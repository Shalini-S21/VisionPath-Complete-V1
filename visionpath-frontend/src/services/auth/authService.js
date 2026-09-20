import apiClient from '../api/apiClient';

export const authService = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  registerStudent: (studentData) => apiClient.post('/auth/register/student', studentData),
  registerCounselor: (counselorData) => apiClient.post('/auth/register/counselor', counselorData),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (payload) => apiClient.post('/auth/reset-password', payload),
  checkUsername: (username) => apiClient.get(`/auth/check-username?username=${username}`),
};

export default authService;
