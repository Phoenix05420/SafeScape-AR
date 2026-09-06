export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager';
}

export interface Worker {
  id: string;
  name: string;
  email: string;
  organization: string;
  trainingStatus: 'completed' | 'in_progress' | 'pending' | 'failed';
  lastActivity: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  type: 'fire' | 'gas' | 'electric' | 'confined_space';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completionRate: number;
  totalSessions: number;
}

export interface TrainingSession {
  id: string;
  workerId: string;
  workerName: string;
  moduleId: string;
  moduleTitle: string;
  date: string;
  score: number;
  status: 'passed' | 'failed' | 'in_progress';
}

export interface AssessmentResult {
  id: string;
  sessionId: string;
  score: number;
  passed: boolean;
  feedback: string;
}

export interface Certificate {
  id: string;
  workerId: string;
  workerName: string;
  moduleId: string;
  moduleTitle: string;
  issueDate: string;
  expiryDate: string;
  score: number;
  status: 'valid' | 'revoked' | 'expired';
}

export interface DashboardStats {
  totalWorkers: number;
  workersChange: number;
  completedTraining: number;
  completedChange: number;
  pendingTraining: number;
  pendingChange: number;
  failedTraining: number;
  failedChange: number;
}

export interface ModuleStats {
  moduleId: string;
  passRate: number;
  averageScore: number;
  totalAttempts: number;
}

export interface ComplianceReport {
  department: string;
  compliantCount: number;
  nonCompliantCount: number;
  totalWorkers: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status: number;
}
