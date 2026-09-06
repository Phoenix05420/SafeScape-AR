import api from './api';
import { User } from '../types';

// MOCK DATA for standalone frontend
const MOCK_USER: User = {
  id: 'usr_1',
  name: 'Admin User',
  email: 'admin@safescape.ar',
  role: 'admin',
};

export const authService = {
  login: async (email: string, password: string):Promise<{token: string; user: User}> => {
    // return api.post('/auth/login', { email, password });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'mock-jwt-token', user: MOCK_USER });
      }, 500);
    });
  },

  getMe: async (): Promise<User> => {
    // return api.get('/auth/me');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_USER);
      }, 300);
    });
  },
};
