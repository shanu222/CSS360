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

  async trainExaminerModel() {
    const response = await api.post('/ai/examiner/train');
    return response.data;
  },

  async getExaminerProfile() {
    const response = await api.get('/ai/examiner/profile');
    return response.data.profile;
  },

  async evaluateByExaminerModel(answer: string, question?: string) {
    const response = await api.post('/ai/examiner/evaluate', {
      answer,
      question,
    });
    return response.data;
  },

  async refineByExaminerModel(answer: string, question?: string) {
    const response = await api.post('/ai/examiner/refine', {
      answer,
      question,
    });
    return response.data;
  },

  async predictFutureQuestions(subject?: string, count: number = 5) {
    const response = await api.post('/ai/examiner/predict-questions', {
      subject,
      count,
    });
    return response.data;
  },
};
