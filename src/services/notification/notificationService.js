import apiClient from '../api/apiClient';

export const notificationService = {
  getUserNotifications: (userId) => apiClient.get(`/notifications/user/${userId}`),
  markAsRead: (id) => apiClient.put(`/notifications/${id}/read`),
};

export default notificationService;
