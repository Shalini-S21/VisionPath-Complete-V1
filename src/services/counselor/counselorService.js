import apiClient from '../api/apiClient';

export const counselorService = {
  getProfile: () => apiClient.get('/counselors/profile'),
  updateProfile: (data) => apiClient.put('/counselors/profile', data),
  getAssignedStudents: () => apiClient.get('/counselors/assigned-students'),
  getStudentDetails: (studentId) => apiClient.get(`/counselors/students/${studentId}`),
  getStats: () => apiClient.get('/counselors/stats'),
};

export default counselorService;
