import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Language, TaskEvaluation } from '../types';
import { TRANSLATIONS } from '../constants/translations';

interface Props {
  lang: Language;
  onFinishTraining: (tasks: TaskEvaluation[]) => void;
  onCancel: () => void;
}

export const ARGasLeakTrainingScreen: React.FC<Props> = ({ lang, onFinishTraining, onCancel }) => {
  const t = TRANSLATIONS[lang];
  const [permission, requestPermission] = useCameraPermissions();

  const [step, setStep] = useState<number>(0);
  const [selectedPPE, setSelectedPPE] = useState<string[]>([]);
  const [avoidedDangerZone, setAvoidedDangerZone] = useState<boolean>(true);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const togglePPE = (item: string) => {
    if (selectedPPE.includes(item)) {
      setSelectedPPE(selectedPPE.filter((i) => i !== item));
    } else {
      setSelectedPPE([...selectedPPE, item]);
    }
  };

  const handlePPEConfirm = () => {
    // Required: gas_mask and full_suit
    setStep(3);
  };

  const handleEvacuate = (choice: 'upwind' | 'downwind') => {
    const isSafe = choice === 'upwind';
    const hasRequiredPPE =
      selectedPPE.includes('gas_mask') && selectedPPE.includes('gloves_suit');

    const finalTasks: TaskEvaluation[] = [
      {
        id: '1',
        name: 'Identified Hazardous Gas Leakage',
        description: 'Detected dangerous toxic methane/H2S gas cloud in confined space',
        isCorrect: true,
        score: 25,
        maxScore: 25,
      },
      {
        id: '2',
        name: 'Equipped Required PPE Gear',
        description: 'Selected respirator gas mask and chemical protective suit',
        isCorrect: hasRequiredPPE,
        score: hasRequiredPPE ? 25 : 10,
        maxScore: 25,
      },
      {
        id: '3',
        name: 'Maintained Safety Distance from Red Perimeter',
        description: 'Avoided direct contact with restricted toxic gas center',
        isCorrect: avoidedDangerZone,
        score: avoidedDangerZone ? 25 : 0,
        maxScore: 25,
      },
      {
        id: '4',
        name: 'Followed Upwind Evacuation Direction',
        description: 'Evacuated upwind and crosswind away from expanding plume',
        isCorrect: isSafe,
        score: isSafe ? 25 : 0,
        maxScore: 25,
      },
    ];
    onFinishTraining(finalTasks);
  };

  return (
    <View style={styles.container}>
      {permission?.granted ? (
        <CameraView style={StyleSheet.absoluteFillObject} facing="back" />
      ) : (
        <View style={[StyleSheet.absoluteFillObject, styles.simulatedMine]}>
          <Text style={styles.simText}>[ CONFINED MINE CHAMBER / WORKPLACE ]</Text>
        </View>
      )}

      {/* AR HUD Overlay */}
      <View style={styles.overlay}>
        <View style={styles.topHud}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelBtnText}>✕ Exit</Text>
          </TouchableOpacity>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>GAS SAFETY AR · STEP {step}/3</Text>
          </View>
        </View>

        {/* Center AR Danger Zone Marker */}
        {step >= 1 && (
          <View style={styles.arDangerArea}>
            <View style={styles.gasCloud}>
              <Text style={styles.cloudIcon}>☣️</Text>
              <Text style={styles.ppmText}>CH4: 420 PPM · DANGER</Text>
            </View>
            <View style={styles.dangerPerimeter}>
              <Text style={styles.perimeterText}>⛔ RESTRICTED DANGER ZONE ⛔</Text>
            </View>
          </View>
        )}

        {/* Step Cards */}
        {step === 0 && (
          <View style={styles.bottomCard}>
            <Text style={styles.cardTitle}>📷 {t.scanArea}</Text>
            <Text style={styles.cardDesc}>Scanning confined industrial space and mapping gas sensors...</Text>
          </View>
        )}

        {step === 1 && (
          <View style={styles.bottomCard}>
            <Text style={styles.cardTitle}>{t.identifyGas}</Text>
            <Text style={styles.cardDesc}>
              Flange seal failure detected. Hazardous gas expanding rapidly into workspace.
            </Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(2)}>
              <Text style={styles.primaryBtnText}>Acknowledge Hazard & Equip PPE →</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View style={styles.bottomCard}>
            <Text style={styles.cardTitle}>{t.selectPPE}</Text>
            <Text style={styles.cardDesc}>Select all required protective gear before entering escape path:</Text>
            <View style={styles.ppeGrid}>
              <TouchableOpacity
                style={[styles.ppeItem, selectedPPE.includes('gas_mask') && styles.ppeItemActive]}
                onPress={() => togglePPE('gas_mask')}
              >
                <Text style={styles.ppeEmoji}>😷</Text>
                <Text style={styles.ppeText}>Gas Mask / SCBA</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ppeItem, selectedPPE.includes('gloves_suit') && styles.ppeItemActive]}
                onPress={() => togglePPE('gloves_suit')}
              >
                <Text style={styles.ppeEmoji}>🥼</Text>
                <Text style={styles.ppeText}>Chemical Suit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ppeItem, selectedPPE.includes('boots') && styles.ppeItemActive]}
                onPress={() => togglePPE('boots')}
              >
                <Text style={styles.ppeEmoji}>🥾</Text>
                <Text style={styles.ppeText}>Safety Boots</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ppeItem, selectedPPE.includes('cloth') && styles.ppeItemActive]}
                onPress={() => togglePPE('cloth')}
              >
                <Text style={styles.ppeEmoji}>🧣</Text>
                <Text style={styles.ppeText}>Cloth Mask (❌)</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.primaryBtn} onPress={handlePPEConfirm}>
              <Text style={styles.primaryBtnText}>Confirm Gear ({selectedPPE.length} Selected) →</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View style={styles.bottomCard}>
            <Text style={styles.cardTitle}>{t.evacuateSafe}</Text>
            <Text style={styles.cardDesc}>Wind sensor active. Which evacuation direction ensures survival?</Text>
            <View style={styles.choiceRow}>
              <TouchableOpacity
                style={[styles.choiceBtn, styles.evacGreen]}
                onPress={() => handleEvacuate('upwind')}
              >
                <Text style={styles.choiceText}>↗️ Move UPWIND & Crosswind to Fresh Air</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceBtn, styles.evacRed]}
                onPress={() => handleEvacuate('downwind')}
              >
                <Text style={styles.choiceText}>↘️ Move DOWNWIND into Gas Plume</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  simulatedMine: {
    backgroundColor: '#064e3b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simText: {
    color: '#34d399',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 45,
  },
  topHud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  stepBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stepBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  arDangerArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gasCloud: {
    backgroundColor: 'rgba(16, 185, 129, 0.35)',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#34d399',
  },
  cloudIcon: {
    fontSize: 48,
  },
  ppmText: {
    color: '#fef08a',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
  },
  dangerPerimeter: {
    borderWidth: 2,
    borderColor: '#ef4444',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  perimeterText: {
    color: '#ef4444',
    fontSize: 11,
    fontWeight: '900',
  },
  bottomCard: {
    backgroundColor: '#0f172ae6',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#cbd5e1',
    marginBottom: 14,
    lineHeight: 17,
  },
  primaryBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  ppeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  ppeItem: {
    width: '48%',
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  ppeItemActive: {
    borderColor: '#10b981',
    backgroundColor: '#064e3b',
  },
  ppeEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  ppeText: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '700',
  },
  choiceRow: {
    gap: 8,
  },
  choiceBtn: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  evacGreen: {
    backgroundColor: '#166534',
    borderColor: '#22c55e',
  },
  evacRed: {
    backgroundColor: '#7f1d1d',
    borderColor: '#ef4444',
  },
  choiceText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
});
