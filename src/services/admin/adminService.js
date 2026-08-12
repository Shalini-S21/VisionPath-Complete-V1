import apiClient from '../api/apiClient';

export const adminService = {
  getPendingCounselors: () => apiClient.get('/admin/counselors/pending'),
  getAllCounselors: () => apiClient.get('/admin/counselors'),
  approveCounselor: (id) => apiClient.put(`/admin/counselors/${id}/approve`),
  rejectCounselor: (id) => apiClient.put(`/admin/counselors/${id}/reject`),
  suspendCounselor: (id) => apiClient.put(`/admin/counselors/${id}/suspend`),
  getUsers: () => apiClient.get('/admin/users'),
  getStudents: () => apiClient.get('/admin/students'),
  getDashboardStats: () => apiClient.get('/admin/stats'),
};

export default adminService;
