import apiClient from '../api/apiClient';

export const aiService = {
  mentorChat: (chatPayload) => apiClient.post('/ai/mentor/chat', chatPayload),
  recommendCareers: (studentId) => apiClient.post('/ai/careers/recommend', { studentId }),
  analyzeSkillGap: (payload) => apiClient.post('/ai/skills/analyze-gap', payload),
  generateStudyPlan: (payload) => apiClient.post('/ai/study-plan/generate', payload),
  counselorStudentSummary: (studentId) => apiClient.get(`/ai/counselor/student-summary/${studentId}`),
};

export default aiService;
