import apiClient from '../api/apiClient';

export const resumeService = {
  uploadResume: (formData) => apiClient.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getStudentResumes: (studentId) => apiClient.get(`/resumes/student/${studentId}`),
  analyzeResume: (id) => apiClient.post(`/resumes/${id}/analyze`),
};

export default resumeService;
