import apiClient from '../api/apiClient';

export const aiService = {
  mentorChat: (chatPayload) => apiClient.post('/ai/mentor/chat', chatPayload),
  generateQuestions: (payload) => apiClient.post('/ai/generate-questions', payload),
  analyzeAssessment: (payload) => apiClient.post('/ai/analyze-assessment', payload),
  recommendCareers: (payload) => apiClient.post('/ai/recommend-careers', payload),
  analyzeSkillGap: (payload) => apiClient.post('/ai/analyze-skill-gap', payload),
  generateStudyPlan: (payload) => apiClient.post('/ai/generate-study-plan', payload),
  analyzeResume: (payload) => apiClient.post('/ai/analyze-resume', payload),
  counselorStudentSummary: (studentId) => apiClient.get(`/ai/counselor/student-summary/${studentId}`),
};

export default aiService;
