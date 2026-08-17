import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, AppTracking } from '../constants';
import { useRouter } from '../hooks/useRouter';
import TarjetaFormSheet from '../components/TarjetaFormSheet';
import CarnetScannerView from '../components/CarnetScannerView';
import BottomNavBar from '../components/BottomNavBar';

export default function PerfilView() {
  const router = useRouter();
  const [nombre, setNombre] = useState('Joaquín Díaz');
  const [notifOn, setNotifOn] = useState(true);
  const [ubicacionOn, setUbicacionOn] = useState(true);
  const [ecoOff, setEcoOff] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [newNameInput, setNewNameInput] = useState('');
  const [showTarjetaSheet, setShowTarjetaSheet] = useState(false);
  const [showCarnetScanner, setShowCarnetScanner] = useState(false);
  const [carnetVerificado, setCarnetVerificado] = useState(false);
  const [metodoPagoGuardado, setMetodoPagoGuardado] = useState<string | null>(null);

  const iniciales = nombre
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={[Colors.appPrimary, Colors.primaryContainer, Colors.tertiary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroDecoration1} />
            <View style={styles.heroDecoration2} />
            <View style={{ flex: 1, paddingTop: 56 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20 }}>
                <View style={styles.avatarContainer}>
                  <View style={[styles.avatarCircle, { backgroundColor: Colors.inversePrimary }]}>
                    <Text style={styles.avatarText}>{iniciales}</Text>
                  </View>
                  <View style={[styles.avatarBorder, { borderColor: Colors.onPrimary }]} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.heroName, { color: Colors.onPrimary }]}>{nombre}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
                    <View style={[styles.roleBadge, { backgroundColor: Colors.onPrimary + '33' }]}>
                      <Text style={[styles.roleText, { color: Colors.onPrimary }]}>ESTUDIANTE UTP</Text>
                    </View>
                    {carnetVerificado && (
                      <View style={[styles.verifiedBadge, { backgroundColor: Colors.tertiary }]}>
                        <Ionicons name="checkmark" size={10} color={Colors.onPrimary} />
                        <Text style={[styles.verifiedText, { color: Colors.onPrimary }]}>VERIFICADO</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
                <Text style={[styles.walletLabel, { color: Colors.onPrimary + 'D9' }]}>MI BILLETERA</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <TouchableOpacity
                    onPress={() => setShowTarjetaSheet(true)}
                    style={[styles.walletCard, { backgroundColor: Colors.onPrimary + '2E' }]}
                  >
                    <Ionicons name="card" size={18} color={Colors.onPrimary} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={[styles.walletCardTitle, { color: Colors.onPrimary }]}>Método Pago</Text>
                      <Text style={[styles.walletCardSubtitle, { color: Colors.onPrimary + 'CC' }]}>
                        {metodoPagoGuardado ? `Visa •••• ${metodoPagoGuardado}` : 'Agregar tarjeta'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowCarnetScanner(true)}
                    style={[styles.walletCard, { backgroundColor: Colors.onPrimary + '2E' }]}
                  >
                    <Ionicons name="person" size={18} color={Colors.onPrimary} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={[styles.walletCardTitle, { color: Colors.onPrimary }]}>Carnet UTP</Text>
                      <Text style={[styles.walletCardSubtitle, { color: Colors.onPrimary + 'CC' }]}>
                        {carnetVerificado ? 'Verificado' : 'Escanear ahora'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.statsCardContainer}>
          <View style={[styles.statsCard, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: Colors.onSurface }]}>47</Text>
              <Text style={[styles.statLabel, { color: Colors.onSurfaceVariant }]}>VIAJES</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: Colors.outlineVariant + '80' }]} />
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: Colors.onSurface }]}>12</Text>
              <Text style={[styles.statLabel, { color: Colors.onSurfaceVariant }]}>RUTAS</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: Colors.outlineVariant + '80' }]} />
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: Colors.onSurface }]}>3</Text>
              <Text style={[styles.statLabel, { color: Colors.onSurfaceVariant }]}>LOGROS</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 24, gap: 12 }}>
          <Text style={[styles.preferencesLabel, { color: Colors.onSurfaceVariant }]}>Preferencias</Text>
          <View style={[styles.preferencesCard, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <ToggleRow icon="notifications" iconColor={Colors.appPrimary} label="Notificaciones" isOn={notifOn} onToggle={setNotifOn} />
            <View style={[styles.preferenceDivider, { backgroundColor: Colors.outlineVariant + '40' }]} />
            <ToggleRow icon="location" iconColor={Colors.secondary} label="Compartir ubicación" isOn={ubicacionOn} onToggle={setUbicacionOn} />
            <View style={[styles.preferenceDivider, { backgroundColor: Colors.outlineVariant + '40' }]} />
            <ToggleRow icon="card" iconColor={Colors.tertiary} label="Modo económico" isOn={ecoOff} onToggle={setEcoOff} />
            <View style={[styles.preferenceDivider, { backgroundColor: Colors.outlineVariant + '40' }]} />
            <TouchableOpacity
              style={styles.chevronRow}
              onPress={() => {
                setNewNameInput(nombre);
                setShowEditAlert(true);
              }}
            >
              <View style={[styles.chevronIconCircle, { backgroundColor: Colors.appPrimary + '23' }]}>
                <Ionicons name="person" size={16} color={Colors.appPrimary} />
              </View>
              <Text style={[styles.chevronLabel, { color: Colors.onSurface }]}>Nombre: {nombre}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
            <View style={[styles.preferenceDivider, { backgroundColor: Colors.outlineVariant + '40' }]} />
            <TouchableOpacity
              style={styles.chevronRow}
              onPress={() => {
                setNewNameInput(nombre);
                setShowEditAlert(true);
              }}
            >
              <View style={[styles.chevronIconCircle, { backgroundColor: Colors.onSurfaceVariant + '23' }]}>
                <Ionicons name="pencil" size={16} color={Colors.onSurfaceVariant} />
              </View>
              <Text style={[styles.chevronLabel, { color: Colors.onSurface }]}>Editar perfil</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar />

      <Modal visible={showEditAlert} transparent animationType="fade">
        <View style={styles.alertOverlay}>
          <View style={[styles.alertContent, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <Text style={[styles.alertTitle, { color: Colors.onSurface }]}>Editar nombre</Text>
            <TextInput
              style={[styles.alertInput, { backgroundColor: Colors.surfaceContainerLow, color: Colors.onSurface }]}
              value={newNameInput}
              onChangeText={setNewNameInput}
              placeholder="Nombre completo"
              placeholderTextColor={Colors.onSurfaceVariant}
            />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  if (newNameInput.trim()) setNombre(newNameInput.trim());
                  setShowEditAlert(false);
                }}
                style={[styles.alertButton, { backgroundColor: Colors.appPrimary }]}
              >
                <Text style={[styles.alertButtonText, { color: Colors.onPrimary }]}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowEditAlert(false)}
                style={[styles.alertCancelButton, { borderColor: Colors.outlineVariant }]}
              >
                <Text style={[styles.alertCancelText, { color: Colors.onSurfaceVariant }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showTarjetaSheet && (
        <TarjetaFormSheet
          onGuardar={(numero) => {
            const ultimos4 = numero.replace(/\D/g, '').slice(-4);
            setMetodoPagoGuardado(ultimos4);
            setShowTarjetaSheet(false);
          }}
          onClose={() => setShowTarjetaSheet(false)}
        />
      )}

      {showCarnetScanner && (
        <CarnetScannerView
          onCapture={() => {
            setCarnetVerificado(true);
            setShowCarnetScanner(false);
          }}
          onClose={() => setShowCarnetScanner(false)}
        />
      )}
    </View>
  );
}

function ToggleRow({ icon, iconColor, label, isOn, onToggle }: any) {
  return (
    <View style={styles.toggleRow}>
      <View style={[styles.toggleIconCircle, { backgroundColor: iconColor + '23' }]}>
        <Ionicons name={icon as any} size={16} color={iconColor} />
      </View>
      <Text style={[styles.toggleLabel, { color: Colors.onSurface }]}>{label}</Text>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        onPress={() => onToggle(!isOn)}
        style={[styles.toggleTrack, { backgroundColor: isOn ? Colors.appPrimary : Colors.outlineVariant }]}
      >
        <View style={[styles.toggleThumb, { transform: [{ translateX: isOn ? 18 : 2 }], backgroundColor: Colors.onPrimary }]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.appBackground },
  scrollContent: { paddingBottom: 80 },
  heroContainer: {
    height: 420,
    overflow: 'hidden',
  },
  heroGradient: {
    flex: 1,
  },
  heroDecoration1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.onPrimary + '1A',
    top: -70,
    right: -50,
  },
  heroDecoration2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.onPrimary + '0F',
    bottom: 50,
    left: -50,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBorder: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 39,
    borderWidth: 3,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: Typography.fontHankenGrotesk,
  },
  heroName: {
    fontSize: Typography.headlineLgMobile.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineLgMobile.fontWeight,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  roleText: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  verifiedText: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  walletLabel: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabel,
    marginBottom: 10,
  },
  walletCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.onPrimary + '40',
  },
  walletCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Typography.fontBeVietnam,
  },
  walletCardSubtitle: {
    fontSize: 10,
    fontFamily: Typography.fontBeVietnam,
    marginTop: 2,
  },
  statsCardContainer: {
    marginTop: -45,
    paddingHorizontal: 20,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: Typography.displayNumberMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayNumberMd.fontWeight,
  },
  statLabel: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  statDivider: {
    width: 1,
    height: 36,
  },
  preferencesLabel: {
    fontSize: Typography.labelCapsLg.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsLg.fontWeight,
    letterSpacing: AppTracking.wideLabel,
    paddingHorizontal: 4,
  },
  preferencesCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  preferenceDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 56,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
  },
  toggleIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleLabel: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  chevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
  },
  chevronIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronLabel: {
    flex: 1,
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  alertOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000066',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  alertContent: {
    borderRadius: 20,
    padding: 24,
    gap: 16,
    width: '100%',
  },
  alertTitle: {
    fontSize: Typography.displayLg.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayLg.fontWeight,
    textAlign: 'center',
  },
  alertInput: {
    borderRadius: 12,
    padding: 12,
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
  },
  alertButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
  },
  alertButtonText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  alertCancelButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
  },
  alertCancelText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
});
