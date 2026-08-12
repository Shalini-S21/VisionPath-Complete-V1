import apiClient from '../api/apiClient';

export const careerService = {
  getAllCareers: () => apiClient.get('/careers'),
  getCareerById: (id) => apiClient.get(`/careers/${id}`),
  getRecommendations: (studentId) => apiClient.get(`/careers/recommendations/${studentId}`),
};

export default careerService;
