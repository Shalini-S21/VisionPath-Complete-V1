import apiClient from '../api/apiClient';

export const studentService = {
  getProfile: (studentId) => apiClient.get('/students/profile', { params: { userId: studentId } }),
  updateProfile: (studentId, profileData) => apiClient.put('/students/profile', profileData, { params: { userId: studentId } }),
  getSkills: (studentId) => apiClient.get('/students/skills', { params: { userId: studentId } }),
  addSkill: (studentId, skillName, level) => apiClient.post('/students/skills', { skillName, proficiency: level }, { params: { userId: studentId } }),
  deleteSkill: (id, studentId) => apiClient.delete(`/students/skills/${id}`, { params: { userId: studentId } }),
};

export default studentService;
