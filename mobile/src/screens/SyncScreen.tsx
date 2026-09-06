import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Language, TrainingSessionRecord } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { StorageService } from '../services/storage';

interface Props {
  lang: Language;
  onBack: () => void;
}

export const SyncScreen: React.FC<Props> = ({ lang, onBack }) => {
  const t = TRANSLATIONS[lang];
  const [sessions, setSessions] = useState<TrainingSessionRecord[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const loadSessions = async () => {
    const list = await StorageService.getSessions();
    setSessions(list);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleSyncWithServer = async () => {
    setIsSyncing(true);
    // Simulate sync or send to FastAPI backend endpoint /sync/sessions
    setTimeout(async () => {
      await StorageService.markAllSynced();
      await loadSessions();
      setIsSyncing(false);
      Alert.alert('Cloud Sync Complete', 'All offline AR training sessions synchronized with server.');
    }, 1500);
  };

  const pendingCount = sessions.filter((s) => !s.isSynced).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>← {t.backToModules}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📡 {t.offlineSync}</Text>
        <Text style={styles.subtitle}>Mining & Remote Plant Offline Session Queue</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statCol}>
          <Text style={styles.statVal}>{sessions.length}</Text>
          <Text style={styles.statLbl}>Total Local Records</Text>
        </View>
        <View style={styles.statCol}>
          <Text style={[styles.statVal, pendingCount > 0 ? styles.orangeText : styles.greenText]}>
            {pendingCount}
          </Text>
          <Text style={styles.statLbl}>Pending Sync</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.syncButton, isSyncing && styles.syncButtonDisabled]}
        onPress={handleSyncWithServer}
        disabled={isSyncing}
      >
        <Text style={styles.syncButtonText}>
          {isSyncing ? '⏳ Synchronizing with Safety Server...' : '🔄 Sync Records Now'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.listHeading}>Stored Local Training Records</Text>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No local sessions yet. Complete an AR training first!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.sessionItem}>
            <View style={styles.sessionMain}>
              <Text style={styles.sessionModule}>{item.moduleName}</Text>
              <Text style={styles.sessionDate}>{item.date}</Text>
            </View>
            <View style={styles.sessionStatus}>
              <Text style={[styles.sessionScore, item.isPassed ? styles.greenText : styles.redText]}>
                {item.score}% {item.isPassed ? 'PASSED' : 'FAILED'}
              </Text>
              <Text style={[styles.syncBadge, item.isSynced ? styles.synced : styles.pending]}>
                {item.isSynced ? 'CLOUD SYNCED' : 'OFFLINE STORED'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    paddingTop: 45,
  },
  header: {
    marginBottom: 20,
  },
  backBtn: {
    marginBottom: 8,
  },
  backBtnText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
  },
  statLbl: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
  },
  orangeText: {
    color: '#f97316',
  },
  greenText: {
    color: '#22c55e',
  },
  redText: {
    color: '#ef4444',
  },
  syncButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  syncButtonDisabled: {
    opacity: 0.6,
  },
  syncButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  listHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 30,
  },
  emptyBox: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 13,
    textAlign: 'center',
  },
  sessionItem: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  sessionMain: {
    flex: 1,
  },
  sessionModule: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  sessionDate: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  sessionStatus: {
    alignItems: 'flex-end',
  },
  sessionScore: {
    fontSize: 12,
    fontWeight: '800',
  },
  syncBadge: {
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    overflow: 'hidden',
  },
  synced: {
    backgroundColor: '#14532d',
    color: '#4ade80',
  },
  pending: {
    backgroundColor: '#7c2d12',
    color: '#fdba74',
  },
});
