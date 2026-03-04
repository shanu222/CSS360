import api from './api';

export const mcqService = {
  async getMCQs(filters?: {
    subject?: string;
    topic?: string;
    count?: number;
  }) {
    const response = await api.get('/mcqs', { params: filters });
    return response.data.questions;
  },

  async submitAttempt(data: {
    subject: string;
    topic: string;
    answers: Array<{
      questionId: string;
      selectedAnswer: number;
    }>;
    timeTaken?: number;
  }) {
    const response = await api.post('/mcqs/attempt', data);
    return response.data.result;
  },

  async getAttempts(subject?: string) {
    const response = await api.get('/mcqs/attempts', {
      params: { subject },
    });
    return response.data.attempts;
  },

  async getAttempt(id: string) {
    const response = await api.get(`/mcqs/attempts/${id}`);
    return response.data.attempt;
  },

  async getStats() {
    const response = await api.get('/mcqs/stats');
    return response.data.stats;
  },
};
