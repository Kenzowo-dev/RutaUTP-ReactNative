import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, AppTracking } from '../constants';

interface BusCardProps {
  linea: string;
  empresa: string;
  minutos: string;
  tipo: string;
  placa: string;
  colorLinea: string;
  onPress?: () => void;
}

export default function BusCard({ linea, empresa, minutos, tipo, placa, colorLinea, onPress }: BusCardProps) {
  const isPrimary = colorLinea === Colors.appPrimary;
  const badgeBg = isPrimary ? Colors.primaryContainer : Colors.secondaryContainer;
  const badgeFg = isPrimary ? Colors.onPrimaryContainer : Colors.onSecondaryContainer;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.linea, { color: Colors.onSurfaceVariant }]}>{linea}</Text>
        <Text style={[styles.empresa, { color: Colors.onSurface }]} numberOfLines={1}>
          {empresa}
        </Text>
        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.badgeText, { color: badgeFg }]}>{minutos}</Text>
          </View>
          <Text style={[styles.metaText, { color: Colors.onSurfaceVariant }]}>
            {tipo} · {placa}
          </Text>
        </View>
      </View>
      <View style={styles.accentLine}>
        <View style={[styles.accentBar, { backgroundColor: colorLinea }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 256,
    height: 100,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
    marginRight: 12,
  },
  content: {
    flex: 1,
    padding: 14,
    gap: 6,
  },
  linea: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  empresa: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  metaText: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  accentBar: {
    width: 4,
    height: 56,
    borderRadius: 2,
  },
});
