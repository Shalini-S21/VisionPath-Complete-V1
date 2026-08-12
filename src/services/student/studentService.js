import apiClient from '../api/apiClient';

export const studentService = {
  getProfile: () => apiClient.get('/students/profile'),
  updateProfile: (profileData) => apiClient.put('/students/profile', profileData),
  getSkills: (studentId) => apiClient.get(`/students/${studentId}/skills`),
  addSkill: (skillName, level) => apiClient.post('/students/skills', { skillName, level }),
  deleteSkill: (id) => apiClient.delete(`/students/skills/${id}`),
};

export default studentService;
