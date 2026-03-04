import api from './api';

export const progressService = {
  async getUserProgress() {
    const response = await api.get('/progress');
    return response.data.progress;
  },

  async getSubjectProgress(subjectId: string, subjectName?: string) {
    const response = await api.get(`/progress/${subjectId}`, {
      params: { subjectName },
    });
    return response.data.progress;
  },

  async updateProgress(subjectId: string, data: {
    progress?: number;
    completedTopics?: any[];
    studyTime?: number;
    subjectName?: string;
  }) {
    const response = await api.put(`/progress/${subjectId}`, data);
    return response.data.progress;
  },

  async addPracticeScore(subjectId: string, data: {
    testType: string;
    score: number;
    totalQuestions: number;
    subjectName?: string;
  }) {
    const response = await api.post(`/progress/${subjectId}/score`, data);
    return response.data.progress;
  },

  async getStatistics() {
    const response = await api.get('/progress/stats');
    return response.data.stats;
  },
};
