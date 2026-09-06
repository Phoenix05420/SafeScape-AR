import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Language, TrainingSessionRecord } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { QRCodeView } from '../components/QRCodeView';

interface Props {
  lang: Language;
  certificate: TrainingSessionRecord;
  onBack: () => void;
}

export const CertificateScreen: React.FC<Props> = ({ lang, certificate, onBack }) => {
  const t = TRANSLATIONS[lang];
  const certNumber = certificate.certNumber || 'SS-2026-AR-8834';

  const handleShare = () => {
    Alert.alert(
      'Digital Certificate Exported',
      `Certificate ${certNumber} has been verified and saved to device credentials.`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← {t.backToModules}</Text>
      </TouchableOpacity>

      {/* Official Certificate Card */}
      <View style={styles.certCard}>
        {/* Certificate Border Header */}
        <View style={styles.certHeader}>
          <Text style={styles.certEmblem}>🛡️</Text>
          <Text style={styles.certSuperTitle}>NATIONAL SAFETY COUNCIL PARTNER</Text>
          <Text style={styles.certMainTitle}>{t.certTitle}</Text>
          <View style={styles.certDivider} />
        </View>

        {/* Certificate Body */}
        <View style={styles.certBody}>
          <Text style={styles.certIntro}>This digital qualification verifies that</Text>
          <Text style={styles.workerName}>{certificate.workerName || 'Industrial Worker'}</Text>
          <Text style={styles.certIntro}>
            has successfully completed the Augmented Reality practical hazard simulation for:
          </Text>

          <View style={styles.moduleBox}>
            <Text style={styles.moduleBoxText}>{certificate.moduleName}</Text>
          </View>

          <View style={styles.certMetrics}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{t.certDate}</Text>
              <Text style={styles.metricValue}>{certificate.date}</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{t.certScore}</Text>
              <Text style={[styles.metricValue, styles.scoreValue]}>{certificate.score}%</Text>
            </View>
          </View>

          {/* QR Code Verification Section */}
          <View style={styles.qrSection}>
            <QRCodeView value={`https://safescape.org/verify/${certNumber}`} size={130} />
            <Text style={styles.certNumberText}>Certificate ID: {certNumber}</Text>
            <Text style={styles.verifiedTag}>🔒 {t.verifiedBy}</Text>
          </View>
        </View>

        {/* Certificate Footer */}
        <View style={styles.certFooter}>
          <View style={styles.signBlock}>
            <View style={styles.signLine} />
            <Text style={styles.signText}>{t.authorizedSign}</Text>
          </View>
          <View style={styles.signBlock}>
            <View style={styles.signLine} />
            <Text style={styles.signText}>AR Practical Exam Committee</Text>
          </View>
        </View>
      </View>

      {/* Share & Save CTA */}
      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Text style={styles.shareBtnText}>📲 Save & Share Digital Certificate</Text>
      </TouchableOpacity>
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
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '700',
  },
  certCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 22,
    borderWidth: 6,
    borderColor: '#ea580c',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  certHeader: {
    alignItems: 'center',
    marginBottom: 14,
  },
  certEmblem: {
    fontSize: 36,
    marginBottom: 4,
  },
  certSuperTitle: {
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '800',
    color: '#ea580c',
    textTransform: 'uppercase',
  },
  certMainTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0f172a',
    textAlign: 'center',
    marginTop: 6,
  },
  certDivider: {
    width: 60,
    height: 3,
    backgroundColor: '#ea580c',
    borderRadius: 2,
    marginTop: 8,
  },
  certBody: {
    alignItems: 'center',
    marginVertical: 10,
  },
  certIntro: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginVertical: 4,
  },
  workerName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a',
    marginVertical: 4,
    textAlign: 'center',
  },
  moduleBox: {
    backgroundColor: '#fff7ed',
    borderColor: '#fdba74',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 10,
  },
  moduleBoxText: {
    color: '#c2410c',
    fontSize: 14,
    fontWeight: '800',
  },
  certMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  scoreValue: {
    color: '#16a34a',
  },
  qrSection: {
    alignItems: 'center',
    marginTop: 12,
  },
  certNumberText: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '800',
    color: '#334155',
    marginTop: 8,
  },
  verifiedTag: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '800',
    marginTop: 2,
  },
  certFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  signBlock: {
    alignItems: 'center',
    width: '45%',
  },
  signLine: {
    width: 90,
    height: 1,
    backgroundColor: '#94a3b8',
    marginBottom: 4,
  },
  signText: {
    fontSize: 8,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '700',
  },
  shareBtn: {
    backgroundColor: '#f97316',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});
