import apiClient from '../api/apiClient';

export const studyPlanService = {
  getAllPlans: (studentId) => apiClient.get(studentId ? `/study-plans?userId=${studentId}` : '/study-plans'),
  getStudentProgress: (studentId) => apiClient.get(`/study-plans/student/${studentId}/progress`),
  createPlan: (planData) => apiClient.post('/study-plans', planData),
  addTask: (planId, taskData) => apiClient.post(`/study-plans/${planId}/tasks`, taskData),
  updateTask: (taskId, taskData) => apiClient.put(`/study-plans/tasks/${taskId}`, taskData),
};

export default studyPlanService;
