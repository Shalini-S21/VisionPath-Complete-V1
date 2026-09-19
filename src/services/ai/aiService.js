import axios from 'axios';
import apiClient from '../api/apiClient';

const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';

export const aiService = {
  mentorChat: (chatPayload) => apiClient.post('/ai/mentor/chat', chatPayload),
  generateQuestions: (payload) => apiClient.post('/ai/generate-questions', payload),
  analyzeAssessment: (payload) => apiClient.post('/ai/analyze-assessment', payload),
  recommendCareers: (payload) => apiClient.post('/ai/recommend-careers', payload),
  analyzeSkillGap: (payload) => apiClient.post('/ai/analyze-skill-gap', payload),
  generateStudyPlan: (payload) => apiClient.post('/ai/generate-study-plan', payload),
  analyzeResume: (payload) => apiClient.post('/ai/analyze-resume', payload),
  uploadResumeToAi: (formData) => axios.post(`${FASTAPI_URL}/ai/resume/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000,
  }),
  counselorStudentSummary: (studentId) => apiClient.get(`/ai/counselor/student-summary/${studentId}`),
};

export default aiService;
