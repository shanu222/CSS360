import api from './api';

export const noteService = {
  async getNotes(filters?: {
    subjectId?: string;
    tags?: string;
    isPublic?: boolean;
  }) {
    const response = await api.get('/notes', { params: filters });
    return response.data.notes;
  },

  async getNote(id: string) {
    const response = await api.get(`/notes/${id}`);
    return response.data.note;
  },

  async createNote(data: {
    subjectId: string;
    subjectName: string;
    title: string;
    content: string;
    tags?: string[];
    isPublic?: boolean;
  }) {
    const response = await api.post('/notes', data);
    return response.data.note;
  },

  async updateNote(id: string, data: {
    title?: string;
    content?: string;
    tags?: string[];
    isPublic?: boolean;
  }) {
    const response = await api.put(`/notes/${id}`, data);
    return response.data.note;
  },

  async deleteNote(id: string) {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },

  async likeNote(id: string) {
    const response = await api.post(`/notes/${id}/like`);
    return response.data;
  },
};
