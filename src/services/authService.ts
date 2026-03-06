import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  subjects?: any[];
  studyPlan?: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

const DEVICE_ID_KEY = 'deviceId';

const getOrCreateDeviceId = (): string => {
  const existing = localStorage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;

  const generated =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  localStorage.setItem(DEVICE_ID_KEY, generated);
  return generated;
};

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post('/auth/login', {
      ...credentials,
      deviceId: getOrCreateDeviceId(),
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async adminLogin(credentials: LoginCredentials) {
    const response = await api.post('/auth/admin/login', {
      ...credentials,
      deviceId: getOrCreateDeviceId(),
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data.user;
  },

  async updateProfile(data: Partial<User>) {
    const response = await api.put('/auth/profile', data);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (_error) {
      // Ignore logout network errors and clear local session anyway.
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getDeviceId(): string {
    return getOrCreateDeviceId();
  },
};
