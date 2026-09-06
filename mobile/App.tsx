import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Language, ModuleType, TaskEvaluation, TrainingSessionRecord } from './src/types';
import { StorageService } from './src/services/storage';
import { LanguageSelectScreen } from './src/screens/LanguageSelectScreen';
import { ModuleSelectScreen } from './src/screens/ModuleSelectScreen';
import { ARFireTrainingScreen } from './src/screens/ARFireTrainingScreen';
import { ARGasLeakTrainingScreen } from './src/screens/ARGasLeakTrainingScreen';
import { AssessmentScreen } from './src/screens/AssessmentScreen';
import { CertificateScreen } from './src/screens/CertificateScreen';
import { SyncScreen } from './src/screens/SyncScreen';

type ScreenState =
  | 'language_select'
  | 'module_select'
  | 'training_fire'
  | 'training_gas'
  | 'assessment'
  | 'certificate'
  | 'sync';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('language_select');
  const [language, setLanguage] = useState<Language>('hi');
  const [currentModule, setCurrentModule] = useState<ModuleType>('fire_safety');
  const [currentTasks, setCurrentTasks] = useState<TaskEvaluation[]>([]);
  const [latestSession, setLatestSession] = useState<TrainingSessionRecord | null>(null);

  useEffect(() => {
    // Load persisted language
    StorageService.getLanguage().then((saved) => {
      if (saved) setLanguage(saved);
    });
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    StorageService.saveLanguage(lang);
    setCurrentScreen('module_select');
  };

  const handleStartModule = (mod: ModuleType) => {
    setCurrentModule(mod);
    if (mod === 'fire_safety') {
      setCurrentScreen('training_fire');
    } else {
      setCurrentScreen('training_gas');
    }
  };

  const handleTrainingCompleted = async (tasks: TaskEvaluation[]) => {
    setCurrentTasks(tasks);
    const totalScore = tasks.reduce((sum, t) => sum + t.score, 0);
    const maxScore = tasks.reduce((sum, t) => sum + t.maxScore, 100);
    const percentage = Math.round((totalScore / maxScore) * 100);
    const isPassed = percentage >= 80;

    const moduleName =
      currentModule === 'fire_safety'
        ? 'Fire Safety Practical AR'
        : 'Toxic Gas Leak & PPE Practical AR';

    const sessionRecord: TrainingSessionRecord = {
      id: Date.now().toString(),
      moduleId: currentModule,
      moduleName,
      workerName: 'Ravi Kumar (Worker #4092)',
      date: new Date().toISOString().split('T')[0],
      score: percentage,
      isPassed,
      tasks,
      isSynced: false,
      certNumber: isPassed
        ? `SS-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
        : undefined,
    };

    await StorageService.saveSession(sessionRecord);
    setLatestSession(sessionRecord);
    setCurrentScreen('assessment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {currentScreen === 'language_select' && (
        <LanguageSelectScreen
          currentLang={language}
          onSelectLanguage={handleSelectLanguage}
        />
      )}

      {currentScreen === 'module_select' && (
        <ModuleSelectScreen
          lang={language}
          onSelectModule={handleStartModule}
          onChangeLanguage={() => setCurrentScreen('language_select')}
          onViewCertificates={async () => {
            const certs = await StorageService.getCertificates();
            if (certs.length > 0) {
              setLatestSession(certs[0]);
              setCurrentScreen('certificate');
            } else {
              // Create sample cert if none yet
              const sampleCert: TrainingSessionRecord = {
                id: 'demo-sample',
                moduleId: 'fire_safety',
                moduleName: 'Fire Safety Practical AR',
                workerName: 'Ravi Kumar (Worker #4092)',
                date: new Date().toISOString().split('T')[0],
                score: 92,
                isPassed: true,
                tasks: [],
                isSynced: true,
                certNumber: 'SS-2026-AR-DEMO1',
              };
              setLatestSession(sampleCert);
              setCurrentScreen('certificate');
            }
          }}
          onViewSync={() => setCurrentScreen('sync')}
        />
      )}

      {currentScreen === 'training_fire' && (
        <ARFireTrainingScreen
          lang={language}
          onFinishTraining={handleTrainingCompleted}
          onCancel={() => setCurrentScreen('module_select')}
        />
      )}

      {currentScreen === 'training_gas' && (
        <ARGasLeakTrainingScreen
          lang={language}
          onFinishTraining={handleTrainingCompleted}
          onCancel={() => setCurrentScreen('module_select')}
        />
      )}

      {currentScreen === 'assessment' && (
        <AssessmentScreen
          lang={language}
          tasks={currentTasks}
          onViewCertificate={() => setCurrentScreen('certificate')}
          onRetry={() => {
            if (currentModule === 'fire_safety') {
              setCurrentScreen('training_fire');
            } else {
              setCurrentScreen('training_gas');
            }
          }}
          onBackToModules={() => setCurrentScreen('module_select')}
        />
      )}

      {currentScreen === 'certificate' && latestSession && (
        <CertificateScreen
          lang={language}
          certificate={latestSession}
          onBack={() => setCurrentScreen('module_select')}
        />
      )}

      {currentScreen === 'sync' && (
        <SyncScreen lang={language} onBack={() => setCurrentScreen('module_select')} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
});
