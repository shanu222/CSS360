import api from './api';

export const aiService = {
  async chat(message: string, context?: string, subject?: string) {
    const response = await api.post('/ai/chat', {
      message,
      context,
      subject,
    });
    return response.data;
  },

  async generateEssayOutline(topic: string) {
    const response = await api.post('/ai/essay/outline', { topic });
    return response.data.outline;
  },

  async analyzeEssay(essay: string, topic?: string) {
    const response = await api.post('/ai/essay/analyze', {
      essay,
      topic,
    });
    return response.data.analysis;
  },

  async getStudySuggestions(data: {
    subjects: string[];
    timeAvailable: number;
    examDate: string;
  }) {
    const response = await api.post('/ai/study/suggestions', data);
    return response.data.suggestions;
  },
};
