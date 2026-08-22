/**
 * =============================================================================
 * FEATURE CARD — Tarjeta de característica destacada
 * =============================================================================
 *
 * PROPÓSITO:
 * Muestra una característica de la app con icono, etiqueta y título descriptivo.
 * Usada en la pantalla de bienvenida para destacar funcionalidades principales.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Grid de 2 columnas: se muestra junto a otra FeatureCard en fila.
 * - Icono circular: fondo con opacidad del color para suavidad visual.
 * - Label en caps: etiqueta descriptiva corta (ej: "SEGURIDAD", "AHORRO").
 * - Radio grande: border-radius de 26px para estilo moderno y amigable.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, AppTracking } from '../constants';

interface FeatureCardProps {
  icon: string;
  iconColor: string;
  label: string;
  title: string;
}

export default function FeatureCard({ icon, iconColor, label, title }: FeatureCardProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={24} color={iconColor} style={{ marginBottom: 2 }} />
      <Text style={[styles.label, { color: Colors.onSurface }]}>{label}</Text>
      <Text style={[styles.title, { color: Colors.onSurfaceVariant }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.containerPadding,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 26,
    minHeight: 168,
    gap: 10,
  },
  label: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabelMd,
  },
  title: {
    fontSize: Typography.bodyLg.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyLg.fontWeight,
    lineHeight: 22,
  },
});
