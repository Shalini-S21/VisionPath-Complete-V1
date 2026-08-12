import apiClient from '../api/apiClient';

export const studyPlanService = {
  getAllPlans: () => apiClient.get('/study-plans'),
  getStudentProgress: (studentId) => apiClient.get(`/study-plans/student/${studentId}/progress`),
  updateTask: (taskId, taskData) => apiClient.put(`/study-plans/tasks/${taskId}`, taskData),
};

export default studyPlanService;
