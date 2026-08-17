import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../constants';

interface Props {
  onCapture: () => void;
  onClose: () => void;
}

export default function CarnetScannerView({ onCapture, onClose }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [didCapture, setDidCapture] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    if (permission === null) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleCapture = () => {
    if (didCapture) return;
    setDidCapture(true);
    setShowCheckmark(true);
    setTimeout(() => {
      onCapture();
    }, 1500);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Solicitando permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Ionicons name="camera" size={60} color="#fff" style={{ opacity: 0.5 }} />
        <Text style={[styles.deniedTitle, { color: '#fff' }]}>Acceso a la cámara denegado</Text>
        <Text style={[styles.deniedMessage, { color: '#fffB3' }]}>
          Necesitamos acceso a la cámara para escanear tu carnet universitario.
        </Text>
        <TouchableOpacity onPress={onClose} style={[styles.settingsButton, { backgroundColor: Colors.appPrimary }]}>
          <Text style={[styles.settingsButtonText, { color: '#fff' }]}>Abrir Ajustes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} facing="back">
        <View style={styles.cameraOverlay}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerContent}>
            <Text style={styles.scanText}>Encuadra tu carnet aquí</Text>
            <View style={styles.scanFrame}>
              <Corner position="topLeft" />
              <Corner position="topRight" />
              <Corner position="bottomLeft" />
              <Corner position="bottomRight" />
              {showCheckmark && (
                <View style={styles.checkmarkContainer}>
                  <Ionicons name="checkmark-circle" size={80} color={Colors.tertiary} />
                </View>
              )}
            </View>
          </View>
          <View style={styles.bottomBar}>
            <Text style={styles.bottomText}>Asegúrate que el texto sea legible</Text>
            <TouchableOpacity onPress={handleCapture} style={styles.captureButton} disabled={didCapture}>
              <View style={styles.captureOuter}>
                <View style={styles.captureInner} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

function Corner({ position }: { position: string }) {
  let style: any = { position: 'absolute', width: 20, height: 20 };
  if (position === 'topLeft') {
    style.top = 0;
    style.left = 0;
    style.borderTopWidth = 3;
    style.borderLeftWidth = 3;
  } else if (position === 'topRight') {
    style.top = 0;
    style.right = 0;
    style.borderTopWidth = 3;
    style.borderRightWidth = 3;
  } else if (position === 'bottomLeft') {
    style.bottom = 0;
    style.left = 0;
    style.borderBottomWidth = 3;
    style.borderLeftWidth = 3;
  } else {
    style.bottom = 0;
    style.right = 0;
    style.borderBottomWidth = 3;
    style.borderRightWidth = 3;
  }
  style.borderColor = Colors.appPrimary;
  return <View style={style} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraOverlay: { flex: 1, justifyContent: 'space-between' },
  topBar: { paddingTop: 16, paddingHorizontal: 20, alignItems: 'flex-end' },
  cancelButton: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.2)' },
  cancelText: { color: '#fff', fontSize: Typography.bodyMdMedium.fontSize, fontFamily: Typography.fontBeVietnam, fontWeight: Typography.bodyMdMedium.fontWeight },
  centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  scanText: { color: '#fff', fontSize: 15, fontWeight: '500', fontFamily: Typography.fontBeVietnam },
  scanFrame: { width: 280, height: 170, position: 'relative' },
  checkmarkContainer: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  bottomBar: { alignItems: 'center', paddingBottom: 40, gap: 12 },
  bottomText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: Typography.fontBeVietnam },
  captureButton: { width: 72, height: 72, borderRadius: 36, borderWidth: 4, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  captureOuter: { width: 72, height: 72, borderRadius: 36, borderWidth: 4, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  captureInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff' },
  deniedTitle: { fontSize: Typography.headlineSm.fontSize, fontFamily: Typography.fontHankenGrotesk, fontWeight: Typography.headlineSm.fontWeight, textAlign: 'center', marginTop: 20 },
  deniedMessage: { fontSize: Typography.bodySm.fontSize, fontFamily: Typography.fontBeVietnam, fontWeight: Typography.bodySm.fontWeight, textAlign: 'center', paddingHorizontal: 40, marginTop: 8 },
  settingsButton: { marginTop: 20, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  settingsButtonText: { fontSize: Typography.headlineSm.fontSize, fontFamily: Typography.fontHankenGrotesk, fontWeight: Typography.headlineSm.fontWeight },
});
