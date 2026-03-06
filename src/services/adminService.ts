import api from './api';

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  isLoggedIn: boolean;
  activeDeviceId?: string | null;
  createdAt?: string;
  lastActive?: string;
}

export interface ContentItem {
  _id: string;
  title: string;
  type: 'announcement' | 'resource' | 'update' | 'notice';
  body: string;
  fileUrl?: string | null;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
}

export const adminService = {
  async getUsers() {
    const response = await api.get('/admin/users');
    return response.data.users as AdminUser[];
  },

  async getActiveUsers() {
    const response = await api.get('/admin/active-users');
    return response.data.users as AdminUser[];
  },

  async deleteUser(id: string) {
    return api.delete(`/admin/users/${id}`);
  },

  async forceLogoutUser(id: string) {
    return api.post(`/admin/users/${id}/force-logout`);
  },

  async getContent() {
    const response = await api.get('/admin/content');
    return response.data.items as ContentItem[];
  },

  async createContent(payload: Partial<ContentItem>) {
    const response = await api.post('/admin/content', payload);
    return response.data.item as ContentItem;
  },

  async updateContent(id: string, payload: Partial<ContentItem>) {
    const response = await api.put(`/admin/content/${id}`, payload);
    return response.data.item as ContentItem;
  },

  async deleteContent(id: string) {
    return api.delete(`/admin/content/${id}`);
  },
};
