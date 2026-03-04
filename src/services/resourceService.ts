import api from './api';

export const resourceService = {
  // Get auto-indexed past papers from CSS_Past_Papers folder
  async getPastPapersIndex() {
    const response = await api.get('/past-papers/index');
    return response.data;
  },

  // Get past papers for a specific year
  async getYearPapers(year: number) {
    const response = await api.get(`/past-papers/year/${year}`);
    return response.data;
  },

  // Get all resources with optional filters
  async getResources(filters?: {
    type?: string;
    category?: string;
    year?: number;
    search?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get(`/resources?${params.toString()}`);
    return response.data;
  },

  // Get single resource
  async getResource(id: string) {
    const response = await api.get(`/resources/${id}`);
    return response.data;
  },

  // Create resource (admin only)
  async createResource(data: {
    title: string;
    description?: string;
    type: string;
    category: string;
    year?: number;
    fileUrl: string;
    fileType: string;
    fileSize?: number;
    solved?: boolean;
    tags?: string[];
    metadata?: any;
  }) {
    const response = await api.post('/resources', data);
    return response.data;
  },

  // Update resource (admin only)
  async updateResource(id: string, data: any) {
    const response = await api.put(`/resources/${id}`, data);
    return response.data;
  },

  // Delete resource (admin only)
  async deleteResource(id: string) {
    const response = await api.delete(`/resources/${id}`);
    return response.data;
  },

  // Upload file (admin only)
  async uploadFile(file: File, onProgress?: (progress: number) => void) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/resources/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    return response.data;
  },

  // Increment views
  async incrementViews(id: string) {
    const response = await api.post(`/resources/${id}/view`);
    return response.data;
  },

  // Increment downloads
  async incrementDownloads(id: string) {
    const response = await api.post(`/resources/${id}/download`);
    return response.data;
  },

  // Get statistics (admin only)
  async getStatistics() {
    const response = await api.get('/resources/stats');
    return response.data;
  },
};
