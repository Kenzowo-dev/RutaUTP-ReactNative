/**
 * =============================================================================
 * PERFIL VIEW — Pantalla de perfil del usuario
 * =============================================================================
 *
 * PROPÓSITO:
 * Muestra y permite editar el perfil del usuario: avatar, nombre, estadísticas,
 * billetera (tarjeta + carnet), preferencias y toggles.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Hero con gradiente: encabezado visual con avatar, nombre, badges.
 * - Iniciales dinámicas: calculadas desde el nombre (primer letra de cada palabra).
 * - Billetera: acceso a tarjeta de pago (TarjetaFormSheet) y carnet (CarnetScannerView).
 * - ToggleRow: componente interno reutilizable para preferencias.
 * - Stats: tarjeta con viajes, rutas y logros del usuario.
 *
 * ESTRUCTURA:
 * 1. Hero (gradiente + avatar + nombre + badges + billetera)
 * 2. Stats card (viajes, rutas, logros)
 * 3. Preferencias (toggles + editar nombre/perfil)
 * 4. Modales (editar nombre, tarjeta, carnet)
 */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, AppTracking } from '@/shared/constants';
import { TarjetaFormSheet, CarnetScannerView, BottomNavBar } from '@/shared/components';

import { usePerfilViewModel } from './viewmodels/usePerfilViewModel';
import { styles } from './styles';

export interface PerfilViewProps {
  viewModel: ReturnType<typeof usePerfilViewModel>;
}

export default function PerfilView({ viewModel }: PerfilViewProps) {
  const {
    nombre,
    notifOn,
    ubicacionOn,
    ecoOff,
    showEditAlert,
    newNameInput,
    showTarjetaSheet,
    showCarnetScanner,
    carnetVerificado,
    metodoPagoGuardado,
    setNotifOn,
    setUbicacionOn,
    setEcoOff,
    setShowEditAlert,
    setNewNameInput,
    setShowTarjetaSheet,
    setShowCarnetScanner,
    onSaveName,
    onSaveCard,
    onCaptureCarnet,
  } = viewModel;

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
                onPress={() => onSaveName(newNameInput)}
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
          onGuardar={onSaveCard}
          onClose={() => setShowTarjetaSheet(false)}
        />
      )}

      {showCarnetScanner && (
        <CarnetScannerView
          onCapture={onCaptureCarnet}
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
