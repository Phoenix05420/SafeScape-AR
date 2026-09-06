export type Language = 'en' | 'hi' | 'sat';

export type ModuleType = 'fire_safety' | 'gas_leak' | 'confined_space';

export interface TaskEvaluation {
  id: string;
  name: string;
  description: string;
  isCorrect: boolean;
  score: number;
  maxScore: number;
}

export interface TrainingSessionRecord {
  id: string;
  moduleId: ModuleType;
  moduleName: string;
  workerName: string;
  date: string;
  score: number;
  isPassed: boolean;
  tasks: TaskEvaluation[];
  isSynced: boolean;
  certNumber?: string;
}
