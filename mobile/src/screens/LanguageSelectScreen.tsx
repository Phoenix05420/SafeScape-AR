import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants/translations';

interface Props {
  currentLang: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelectScreen: React.FC<Props> = ({ currentLang, onSelectLanguage }) => {
  const t = TRANSLATIONS[currentLang];

  const languages: { code: Language; name: string; nativeName: string; region: string }[] = [
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'राष्ट्रीय भाषा (खनन एवं उद्योग)' },
    { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)', region: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ, ᱳᱰᱤᱥᱟ, ᱵᱮᱝᱜᱚᱞ ᱠᱷᱟᱫᱟᱱ' },
    { code: 'en', name: 'English', nativeName: 'English', region: 'Standard Industrial Interface' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.shieldIcon}>🛡️</Text>
        <Text style={styles.title}>{t.appTitle}</Text>
        <Text style={styles.subtitle}>{t.appSubtitle}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SIH26041 AR SAFETY</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t.selectLanguage}</Text>
        <Text style={styles.instruction}>Choose your preferred language for voice and AR instructions:</Text>

        {languages.map((item) => {
          const isSelected = currentLang === item.code;
          return (
            <TouchableOpacity
              key={item.code}
              style={[styles.langButton, isSelected && styles.langButtonActive]}
              onPress={() => onSelectLanguage(item.code)}
              activeOpacity={0.8}
            >
              <View style={styles.langInfo}>
                <Text style={[styles.nativeText, isSelected && styles.nativeTextActive]}>
                  {item.nativeName}
                </Text>
                <Text style={styles.regionText}>{item.region}</Text>
              </View>
              {isSelected && <Text style={styles.checkIcon}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  shieldIcon: {
    fontSize: 54,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#f97316',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 6,
  },
  instruction: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 16,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  langButtonActive: {
    borderColor: '#f97316',
    backgroundColor: '#1c1917',
  },
  langInfo: {
    flex: 1,
  },
  nativeText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  nativeTextActive: {
    color: '#f97316',
  },
  regionText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  checkIcon: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f97316',
  },
});
