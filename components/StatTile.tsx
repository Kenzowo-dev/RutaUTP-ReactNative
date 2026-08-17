import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, AppTracking } from '../constants';

interface StatTileProps {
  icon: string;
  iconColor: string;
  label: string;
  value: string;
}

export default function StatTile({ icon, iconColor, label, value }: StatTileProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.iconCircle, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={icon as any} size={16} color={iconColor} />
        </View>
        <View style={styles.textColumn}>
          <Text style={[styles.label, { color: Colors.onSurfaceVariant }]}>{label}</Text>
          <Text
            style={[
              styles.value,
              {
                color: iconColor === Colors.secondary ? Colors.secondary : Colors.onSurface,
              },
            ]}
          >
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  value: {
    fontSize: Typography.headlineXs.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineXs.fontWeight,
  },
});
