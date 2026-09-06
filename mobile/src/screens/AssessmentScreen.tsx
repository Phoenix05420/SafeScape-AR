import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Language, TaskEvaluation } from '../types';
import { TRANSLATIONS } from '../constants/translations';

interface Props {
  lang: Language;
  tasks: TaskEvaluation[];
  onViewCertificate: () => void;
  onRetry: () => void;
  onBackToModules: () => void;
}

export const AssessmentScreen: React.FC<Props> = ({
  lang,
  tasks,
  onViewCertificate,
  onRetry,
  onBackToModules,
}) => {
  const t = TRANSLATIONS[lang];

  const totalScore = tasks.reduce((sum, task) => sum + task.score, 0);
  const maxScore = tasks.reduce((sum, task) => sum + task.maxScore, 100);
  const percentage = Math.round((totalScore / maxScore) * 100);
  const isPassed = percentage >= 80;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.resultEmoji}>{isPassed ? '🏆' : '⚠️'}</Text>
        <Text style={styles.title}>{t.completed}</Text>
        <Text style={[styles.statusText, isPassed ? styles.passColor : styles.failColor]}>
          {isPassed ? t.passed : t.failed}
        </Text>
      </View>

      {/* Score Summary Box */}
      <View style={styles.scoreBox}>
        <Text style={styles.scoreLabel}>{t.score}</Text>
        <Text style={styles.scoreNumber}>{percentage}%</Text>
        <Text style={styles.thresholdText}>
          {isPassed
            ? '✓ Met 80% industrial safety qualification requirement'
            : '✗ Failed to meet 80% passing threshold. Must retake.'}
        </Text>
      </View>

      {/* Itemized Tasks Evaluation */}
      <View style={styles.taskList}>
        <Text style={styles.sectionHeader}>Task-by-Task Evaluation</Text>
        {tasks.map((item, idx) => (
          <View key={item.id || idx} style={styles.taskCard}>
            <View style={styles.taskRow}>
              <Text style={styles.taskIcon}>{item.isCorrect ? '✅' : '❌'}</Text>
              <View style={styles.taskDetails}>
                <Text style={styles.taskName}>{item.name}</Text>
                <Text style={styles.taskDesc}>{item.description}</Text>
              </View>
              <Text style={[styles.taskScore, item.isCorrect ? styles.passColor : styles.failColor]}>
                {item.score}/{item.maxScore}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {isPassed ? (
          <TouchableOpacity style={styles.primaryBtn} onPress={onViewCertificate}>
            <Text style={styles.primaryBtnText}>🎓 {t.viewCert}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.primaryBtn, styles.retryBtn]} onPress={onRetry}>
            <Text style={styles.primaryBtnText}>🔄 {t.retake}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.secondaryBtn} onPress={onBackToModules}>
          <Text style={styles.secondaryBtnText}>🏠 {t.backToModules}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f8fafc',
  },
  statusText: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  passColor: {
    color: '#22c55e',
  },
  failColor: {
    color: '#ef4444',
  },
  scoreBox: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#f8fafc',
    marginVertical: 4,
  },
  thresholdText: {
    fontSize: 12,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 12,
  },
  taskList: {
    marginBottom: 24,
  },
  taskCard: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  taskDetails: {
    flex: 1,
  },
  taskName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#f8fafc',
  },
  taskDesc: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  taskScore: {
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 10,
  },
  actions: {
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  retryBtn: {
    backgroundColor: '#f97316',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryBtn: {
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryBtnText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
  },
});
