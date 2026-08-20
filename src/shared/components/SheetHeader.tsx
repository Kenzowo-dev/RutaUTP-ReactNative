import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../constants';

interface SheetHeaderProps {
  icon: string;
  iconColor: string;
  title: string;
}

export default function SheetHeader({ icon, iconColor, title }: SheetHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: iconColor + '1A' }]}>
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <Text style={[styles.title, { color: Colors.onSurface }]}>{title}</Text>
      <View style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.headlineMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineMd.fontWeight,
  },
});
