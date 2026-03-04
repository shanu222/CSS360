import api from './api';

export const currentAffairService = {
  async getCurrentAffairs(filters?: {
    category?: string;
    cssRelevance?: string;
    tags?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await api.get('/current-affairs', { params: filters });
    return response.data;
  },

  async getCurrentAffair(id: string) {
    const response = await api.get(`/current-affairs/${id}`);
    return response.data.affair;
  },
};
