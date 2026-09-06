import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Language, ModuleType } from '../types';
import { TRANSLATIONS } from '../constants/translations';

interface Props {
  lang: Language;
  onSelectModule: (module: ModuleType) => void;
  onChangeLanguage: () => void;
  onViewCertificates: () => void;
  onViewSync: () => void;
}

export const ModuleSelectScreen: React.FC<Props> = ({
  lang,
  onSelectModule,
  onChangeLanguage,
  onViewCertificates,
  onViewSync,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.appName}>🛡️ {t.appTitle}</Text>
          <Text style={styles.offlineTag}>● {t.offlineNotice}</Text>
        </View>
        <TouchableOpacity style={styles.langBadge} onPress={onChangeLanguage}>
          <Text style={styles.langBadgeText}>🌐 {lang.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>{t.modules}</Text>
      <Text style={styles.subheading}>SIH26041 AR Industrial Scenarios</Text>

      {/* Module 1: Fire Safety */}
      <TouchableOpacity
        style={[styles.moduleCard, styles.fireCard]}
        onPress={() => onSelectModule('fire_safety')}
        activeOpacity={0.85}
      >
        <View style={styles.moduleHeader}>
          <Text style={styles.moduleEmoji}>🔥</Text>
          <View style={styles.badgeOrange}>
            <Text style={styles.badgeOrangeText}>AR SIMULATION</Text>
          </View>
        </View>
        <Text style={styles.moduleTitle}>{t.fireModule}</Text>
        <Text style={styles.moduleDesc}>{t.fireDesc}</Text>
        <View style={styles.stepPreview}>
          <Text style={styles.stepTag}>✓ Class B Fire ID</Text>
          <Text style={styles.stepTag}>✓ CO2 Extinguisher</Text>
          <Text style={styles.stepTag}>✓ AR Evacuation</Text>
        </View>
        <View style={styles.startButton}>
          <Text style={styles.startButtonText}>{t.startTraining} →</Text>
        </View>
      </TouchableOpacity>

      {/* Module 2: Gas Leak */}
      <TouchableOpacity
        style={[styles.moduleCard, styles.gasCard]}
        onPress={() => onSelectModule('gas_leak')}
        activeOpacity={0.85}
      >
        <View style={styles.moduleHeader}>
          <Text style={styles.moduleEmoji}>☠️</Text>
          <View style={styles.badgeGreen}>
            <Text style={styles.badgeGreenText}>CONFINED SPACE AR</Text>
          </View>
        </View>
        <Text style={styles.moduleTitle}>{t.gasModule}</Text>
        <Text style={styles.moduleDesc}>{t.gasDesc}</Text>
        <View style={styles.stepPreview}>
          <Text style={styles.stepTag}>✓ Toxic Zone Perimeter</Text>
          <Text style={styles.stepTag}>✓ PPE Selection</Text>
          <Text style={styles.stepTag}>✓ Safe Route</Text>
        </View>
        <View style={[styles.startButton, styles.gasStartButton]}>
          <Text style={styles.startButtonText}>{t.startTraining} →</Text>
        </View>
      </TouchableOpacity>

      {/* Bottom Shortcuts */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={onViewCertificates}>
          <Text style={styles.secondaryButtonText}>🎓 {t.myCertificates}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onViewSync}>
          <Text style={styles.secondaryButtonText}>🔄 {t.offlineSync}</Text>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  offlineTag: {
    fontSize: 11,
    color: '#22c55e',
    marginTop: 2,
    fontWeight: '600',
  },
  langBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  langBadgeText: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '700',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f8fafc',
  },
  subheading: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 20,
  },
  moduleCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1.5,
  },
  fireCard: {
    backgroundColor: '#1c1917',
    borderColor: '#ea580c',
  },
  gasCard: {
    backgroundColor: '#064e3b',
    borderColor: '#10b981',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  moduleEmoji: {
    fontSize: 32,
  },
  badgeOrange: {
    backgroundColor: '#ea580c',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeOrangeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  badgeGreen: {
    backgroundColor: '#10b981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeGreenText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  moduleTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  moduleDesc: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 18,
    marginBottom: 14,
  },
  stepPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  stepTag: {
    fontSize: 11,
    color: '#e2e8f0',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#f97316',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  gasStartButton: {
    backgroundColor: '#10b981',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryButtonText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '700',
  },
});
