import api from './api';
import { Certificate } from '../types';

export const certificateService = {
  getCertificates: async (): Promise<Certificate[]> => {
    return [];
  },
  verifyCertificate: async (id: string): Promise<{valid: boolean; certificate?: Certificate}> => {
    return { valid: false };
  },
  getWorkerCertificates: async (workerId: string): Promise<Certificate[]> => {
    return [];
  }
};
