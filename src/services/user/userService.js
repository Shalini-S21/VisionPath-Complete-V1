import apiClient from '../api/apiClient';

export const userService = {
  getUserProfile: (userId) => apiClient.get(`/users/${userId}`),
  getByUsername: (username) => apiClient.get(`/users/username/${username}`),
  updateUserProfile: (userId, data) => apiClient.put(`/users/${userId}`, data),
};

export default userService;
