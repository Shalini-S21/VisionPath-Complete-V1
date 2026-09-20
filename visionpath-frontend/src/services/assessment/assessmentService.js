import apiClient from '../api/apiClient';

export const assessmentService = {
  getAllAssessments: () => apiClient.get('/assessments'),
  getAssessmentById: (id) => apiClient.get(`/assessments/${id}`),
  submitAssessment: (id, payload) => apiClient.post(`/assessments/${id}/submit`, payload),
  getResults: (studentId) => apiClient.get(`/assessments/results/${studentId}`),
};

export default assessmentService;
