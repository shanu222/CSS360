import api from './api';

export const noteService = {
  async getNotes(filters?: {
    subjectId?: string;
    tags?: string;
    isPublic?: boolean;
    sourceType?: string;
    search?: string;
  }) {
    const response = await api.get('/notes', { params: filters });
    return response.data.notes;
  },

  async getNote(id: string) {
    const response = await api.get(`/notes/${id}`);
    return response.data.note;
  },

  async createNote(data: {
    title?: string;
    content: string;
  }) {
    const response = await api.post('/notes', data);
    return response.data.note;
  },

  async uploadImageNote(data: { image: File; title?: string; content?: string }) {
    const formData = new FormData();
    formData.append('image', data.image);
    if (data.title) formData.append('title', data.title);
    if (data.content) formData.append('content', data.content);

    const response = await api.post('/notes/my/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.note;
  },

  async getAvailableSubjects() {
    const response = await api.get('/notes/subjects');
    return response.data.subjects || [];
  },

  async organizeMyNotes(data: {
    noteIds: string[];
    subjectIds: string[];
    includeAllSubjects: boolean;
  }) {
    const response = await api.post('/notes/my/organize', data);
    return response.data;
  },

  async updateNote(id: string, data: {
    title?: string;
    content?: string;
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
