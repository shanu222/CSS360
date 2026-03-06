import api from './api';
import type { ContentItem } from './adminService';

export const contentService = {
  async getPublishedContent() {
    const response = await api.get('/content');
    return response.data.items as ContentItem[];
  },
};
