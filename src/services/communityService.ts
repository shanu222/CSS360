import api from './api';

export const communityService = {
  async getThreads(filters?: {
    subject?: string;
    tags?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await api.get('/community', { params: filters });
    return response.data;
  },

  async getThread(id: string) {
    const response = await api.get(`/community/${id}`);
    return response.data.thread;
  },

  async createThread(data: {
    subject: string;
    title: string;
    content: string;
    tags?: string[];
  }) {
    const response = await api.post('/community', data);
    return response.data.thread;
  },

  async addReply(id: string, content: string) {
    const response = await api.post(`/community/${id}/reply`, { content });
    return response.data.thread;
  },

  async likeThread(id: string) {
    const response = await api.post(`/community/${id}/like`);
    return response.data;
  },

  async deleteThread(id: string) {
    const response = await api.delete(`/community/${id}`);
    return response.data;
  },
};
