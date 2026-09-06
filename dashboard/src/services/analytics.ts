import api from './api';
import { DashboardStats, ModuleStats, ComplianceReport } from '../types';

export const analyticsService = {
  getDashboardStats: async (): Promise<DashboardStats | null> => {
    return null;
  },
  getModuleStats: async (): Promise<ModuleStats[]> => {
    return [];
  },
  getComplianceReport: async (): Promise<ComplianceReport[]> => {
    return [];
  },
  getWorkerStats: async () => {
    return null;
  }
};
