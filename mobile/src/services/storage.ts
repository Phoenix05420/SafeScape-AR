import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrainingSessionRecord, Language } from '../types';

const STORAGE_KEYS = {
  SESSIONS: 'safescape_sessions_v1',
  LANGUAGE: 'safescape_language_v1',
  WORKER_PROFILE: 'safescape_worker_profile_v1',
};

export const StorageService = {
  async saveLanguage(lang: Language): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.error('Error saving language', e);
    }
  },

  async getLanguage(): Promise<Language> {
    try {
      const lang = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
      return (lang as Language) || 'hi';
    } catch (e) {
      return 'hi';
    }
  },

  async saveSession(session: TrainingSessionRecord): Promise<void> {
    try {
      const existing = await this.getSessions();
      const updated = [session, ...existing.filter((s) => s.id !== session.id)];
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving session', e);
    }
  },

  async getSessions(): Promise<TrainingSessionRecord[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  },

  async getCertificates(): Promise<TrainingSessionRecord[]> {
    const sessions = await this.getSessions();
    return sessions.filter((s) => s.isPassed && s.certNumber);
  },

  async markAllSynced(): Promise<void> {
    try {
      const sessions = await this.getSessions();
      const updated = sessions.map((s) => ({ ...s, isSynced: true }));
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error syncing sessions', e);
    }
  },
};
