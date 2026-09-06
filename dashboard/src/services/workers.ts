import api from './api';
import { Worker, PaginatedResponse } from '../types';

export const workerService = {
  getWorkers: async (page = 1, limit = 10): Promise<PaginatedResponse<Worker>> => {
    // return api.get(`/workers?page=${page}&limit=${limit}`);
    return { data: [], total: 0, page, limit, totalPages: 0 };
  },
  getWorker: async (id: string): Promise<Worker | null> => {
    return null;
  },
  updateWorker: async (id: string, data: Partial<Worker>): Promise<Worker | null> => {
    return null;
  },
  deleteWorker: async (id: string): Promise<void> => {},
  getWorkerProgress: async (id: string) => {
    return [];
  }
};
