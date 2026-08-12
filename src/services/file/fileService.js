import apiClient from '../api/apiClient';

export const fileService = {
  uploadFile: (formData) => apiClient.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getFileMetadata: (id) => apiClient.get(`/files/${id}`),
};

export default fileService;
