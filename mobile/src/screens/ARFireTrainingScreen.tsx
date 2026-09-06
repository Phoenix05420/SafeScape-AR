import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Language, TaskEvaluation } from '../types';
import { TRANSLATIONS } from '../constants/translations';

interface Props {
  lang: Language;
  onFinishTraining: (tasks: TaskEvaluation[]) => void;
  onCancel: () => void;
}

export const ARFireTrainingScreen: React.FC<Props> = ({ lang, onFinishTraining, onCancel }) => {
  const t = TRANSLATIONS[lang];
  const [permission, requestPermission] = useCameraPermissions();

  const [step, setStep] = useState<number>(0); // 0: Scanning, 1: Hazard ID, 2: Extinguisher Selection, 3: Aim/Sweep, 4: Evacuation
  const [fireIntensity, setFireIntensity] = useState<number>(100);
  const [selectedExtinguisher, setSelectedExtinguisher] = useState<string | null>(null);
  const [isExtinguishing, setIsExtinguishing] = useState<boolean>(false);

  // Results tracker
  const [tasks, setTasks] = useState<{
    hazardIdentified: boolean;
    extinguisherCorrect: boolean;
    extinguishedProperly: boolean;
    evacuatedSafely: boolean;
  }>({
    hazardIdentified: false,
    extinguisherCorrect: false,
    extinguishedProperly: false,
    evacuatedSafely: false,
  });

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  // Step 0 -> Auto-advance after scanning
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Step 3: Extinguishing simulation
  useEffect(() => {
    let interval: any;
    if (isExtinguishing && fireIntensity > 0) {
      interval = setInterval(() => {
        setFireIntensity((prev) => {
          if (prev <= 15) {
            clearInterval(interval);
            setIsExtinguishing(false);
            setTasks((curr) => ({ ...curr, extinguishedProperly: true }));
            setStep(4);
            return 0;
          }
          return prev - 15;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isExtinguishing, fireIntensity]);

  const handleHazardSelection = (hazardType: string) => {
    const isCorrect = hazardType === 'electrical_b';
    setTasks((prev) => ({ ...prev, hazardIdentified: isCorrect }));
    setStep(2);
  };

  const handleExtinguisherSelect = (type: string) => {
    setSelectedExtinguisher(type);
    const isCorrect = type === 'co2' || type === 'dry_powder';
    setTasks((prev) => ({ ...prev, extinguisherCorrect: isCorrect }));
    setStep(3);
  };

  const handleEvacuate = (choice: 'route_a' | 'route_b') => {
    const isSafe = choice === 'route_a'; // Route A is the unobstructed fire exit
    const finalTasks: TaskEvaluation[] = [
      {
        id: '1',
        name: 'Identified Hazard Type (Class B Electrical)',
        description: 'Recognized live electrical equipment fire hazard',
        isCorrect: tasks.hazardIdentified,
        score: tasks.hazardIdentified ? 25 : 0,
        maxScore: 25,
      },
      {
        id: '2',
        name: 'Selected Correct Extinguisher (CO2 / Dry Powder)',
        description: 'Avoided water on electrical equipment fire',
        isCorrect: tasks.extinguisherCorrect,
        score: tasks.extinguisherCorrect ? 25 : 0,
        maxScore: 25,
      },
      {
        id: '3',
        name: 'Extinguishing Technique (PASS Method)',
        description: 'Aimed at base of fire and discharged continuously',
        isCorrect: tasks.extinguishedProperly,
        score: tasks.extinguishedProperly ? 25 : 0,
        maxScore: 25,
      },
      {
        id: '4',
        name: 'Followed AR Evacuation Route',
        description: 'Navigated green illuminated emergency exit arrows',
        isCorrect: isSafe,
        score: isSafe ? 25 : 0,
        maxScore: 25,
      },
    ];
    onFinishTraining(finalTasks);
  };

  return (
    <View style={styles.container}>
      {/* Real Camera or Simulated AR Backdrop */}
      {permission?.granted ? (
        <CameraView style={StyleSheet.absoluteFill} facing="back" />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.simulatedRoom]}>
          <Text style={styles.simText}>[ INDUSTRIAL PLANT WORK AREA ]</Text>
        </View>
      )}

      {/* AR HUD Overlay */}
      <View style={styles.overlay}>
        {/* Top Status */}
        <View style={styles.topHud}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelBtnText}>✕ Exit</Text>
          </TouchableOpacity>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>FIRE SAFETY AR · STEP {step}/4</Text>
          </View>
        </View>

        {/* Dynamic AR Hazard in Center */}
        {step >= 1 && (
          <View style={styles.arHazardArea}>
            {fireIntensity > 0 ? (
              <View style={styles.fireObject}>
                <Text style={[styles.fireIcon, { transform: [{ scale: 0.8 + fireIntensity / 100 }] }]}>
                  🔥
                </Text>
                <View style={styles.arMarker}>
                  <Text style={styles.arMarkerText}>⚠️ CLASS B FIRE</Text>
                  <View style={styles.intensityBar}>
                    <View style={[styles.intensityFill, { width: `${fireIntensity}%` }]} />
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.smokeObject}>
                <Text style={styles.smokeIcon}>💨</Text>
                <Text style={styles.extinguishedBadge}>FIRE EXTINGUISHED ✅</Text>
              </View>
            )}
          </View>
        )}

        {/* Step-by-Step Interactive Cards */}
        {step === 0 && (
          <View style={styles.bottomCard}>
            <Text style={styles.cardTitle}>📷 {t.scanArea}</Text>
            <Text style={styles.cardDesc}>Detecting floor planes and positioning AR safety scenario...</Text>
          </View>
        )}

        {step === 1 && (
          <View style={styles.bottomCard}>
            <Text style={styles.cardTitle}>{t.identifyFire}</Text>
            <Text style={styles.cardDesc}>A transformer spark triggered a blaze. What class of fire is this?</Text>
            <View style={styles.choiceRow}>
              <TouchableOpacity
                style={styles.choiceBtn}
                onPress={() => handleHazardSelection('class_a')}
              >
                <Text style={styles.choiceText}>Class A (Wood/Paper)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceBtn, styles.choiceHighlight]}
                onPress={() => handleHazardSelection('electrical_b')}
              >
                <Text style={[styles.choiceText, styles.choiceTextHighlight]}>
                  Class B/C (Electrical/Flammable)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.bottomCard}>
            <Text style={styles.cardTitle}>{t.chooseExtinguisher}</Text>
            <Text style={styles.cardDesc}>Select the proper extinguisher for an energized electrical fire:</Text>
            <View style={styles.extinguisherGrid}>
              <TouchableOpacity
                style={styles.extingOption}
                onPress={() => handleExtinguisherSelect('water')}
              >
                <Text style={styles.extingEmoji}>💧</Text>
                <Text style={styles.extingLabel}>Water (H2O)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.extingOption, styles.extingOptionActive]}
                onPress={() => handleExtinguisherSelect('co2')}
              >
                <Text style={styles.extingEmoji}>🧯</Text>
                <Text style={styles.extingLabel}>Carbon Dioxide (CO2)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.extingOption}
                onPress={() => handleExtinguisherSelect('foam')}
              >
                <Text style={styles.extingEmoji}>🧼</Text>
                <Text style={styles.extingLabel}>Foam (AFFF)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.extingOption}
                onPress={() => handleExtinguisherSelect('wet_chem')}
              >
                <Text style={styles.extingEmoji}>🧪</Text>
                <Text style={styles.extingLabel}>Wet Chemical</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.bottomCard}>
            <Text style={styles.cardTitle}>{t.aimAndExtinguish}</Text>
            <Text style={styles.cardDesc}>Hold the button to discharge CO2 at the base of the virtual fire:</Text>
            <TouchableOpacity
              style={[styles.dischargeBtn, isExtinguishing && styles.dischargeBtnActive]}
              onPressIn={() => setIsExtinguishing(true)}
              onPressOut={() => setIsExtinguishing(false)}
            >
              <Text style={styles.dischargeBtnText}>
                {isExtinguishing ? '💨 DISCHARGING CO2...' : 'PRESS & HOLD TO EXTINGUISH 🧯'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 4 && (
          <View style={styles.bottomCard}>
            <Text style={styles.cardTitle}>{t.followExit}</Text>
            <Text style={styles.cardDesc}>Area filled with smoke. Follow the illuminated AR safety path:</Text>
            <View style={styles.choiceRow}>
              <TouchableOpacity
                style={[styles.choiceBtn, styles.evacBtnGreen]}
                onPress={() => handleEvacuate('route_a')}
              >
                <Text style={styles.choiceText}>➡️ Emergency Exit A (Green Route)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceBtn, styles.choiceBtnRed]}
                onPress={() => handleEvacuate('route_b')}
              >
                <Text style={styles.choiceText}>⬅️ Storage Hallway (Smoke Filled)</Text>
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
  simulatedRoom: {
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simText: {
    color: '#475569',
    fontSize: 16,
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
    backgroundColor: '#ea580c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stepBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  arHazardArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireObject: {
    alignItems: 'center',
  },
  fireIcon: {
    fontSize: 74,
  },
  arMarker: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
    alignItems: 'center',
  },
  arMarkerText: {
    color: '#ea580c',
    fontSize: 12,
    fontWeight: '800',
  },
  intensityBar: {
    width: 100,
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    marginTop: 4,
    overflow: 'hidden',
  },
  intensityFill: {
    height: '100%',
    backgroundColor: '#ef4444',
  },
  smokeObject: {
    alignItems: 'center',
  },
  smokeIcon: {
    fontSize: 54,
  },
  extinguishedBadge: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
    fontSize: 12,
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
  choiceRow: {
    gap: 8,
  },
  choiceBtn: {
    backgroundColor: '#1e293b',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#475569',
  },
  choiceHighlight: {
    borderColor: '#f97316',
    backgroundColor: '#27201c',
  },
  choiceText: {
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  choiceTextHighlight: {
    color: '#f97316',
  },
  extinguisherGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  extingOption: {
    width: '48%',
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  extingOptionActive: {
    borderColor: '#ea580c',
    backgroundColor: '#291811',
  },
  extingEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  extingLabel: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  dischargeBtn: {
    backgroundColor: '#ea580c',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  dischargeBtnActive: {
    backgroundColor: '#22c55e',
  },
  dischargeBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  evacBtnGreen: {
    backgroundColor: '#166534',
    borderColor: '#22c55e',
  },
  choiceBtnRed: {
    backgroundColor: '#7f1d1d',
    borderColor: '#ef4444',
  },
});
