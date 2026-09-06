import api from './api';
import { TrainingModule, TrainingSession } from '../types';

export const trainingService = {
  getModules: async (): Promise<TrainingModule[]> => {
    return [];
  },
  createModule: async (data: Partial<TrainingModule>): Promise<TrainingModule | null> => {
    return null;
  },
  getModule: async (id: string): Promise<TrainingModule | null> => {
    return null;
  },
  getSessions: async (): Promise<TrainingSession[]> => {
    return [];
  }
};
