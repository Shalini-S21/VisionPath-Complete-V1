import apiClient from '../api/apiClient';

export const skillService = {
  getAllSkills: () => apiClient.get('/skills'),
  getStudentSkills: (studentId) => apiClient.get(`/skills/student/${studentId}`),
  addStudentSkill: (studentId, skillData) => apiClient.post(`/skills/student/${studentId}`, skillData),
  deleteStudentSkill: (studentId, skillId) => apiClient.delete(`/skills/student/${studentId}/${skillId}`),
};

export default skillService;
