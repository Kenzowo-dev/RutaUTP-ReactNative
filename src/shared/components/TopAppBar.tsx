/**
 * =============================================================================
 * TOP APP BAR — Barra de navegación superior reutilizable
 * =============================================================================
 *
 * PROPÓSITO:
 * Barra superior estándar que se muestra en todas las pantallas principales.
 * Muestra un título, un botón leading (menú o volver) y un botón trailing
 * opcional para acciones contextuales.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Reutilizabilidad: evita repetir la estructura de la barra en cada pantalla.
 * - Configurable: mediante props se adapta a diferentes contextos:
 *   - leading: 'none' (sin botón), 'menu' (hamburguesa), 'back' (flecha volver)
 *   - trailingIcon + trailingAction: botón contextual (ej: añadir, buscar)
 * - Accesibilidad: incluye accessibilityLabel para lectores de pantalla.
 * - Estilo Material: sombra sutil y borde inferior para separación visual.
 *
 * USO:
 * <TopAppBar leading="menu" title="Mapa" trailingIcon="add" trailingAction={handleAdd} />
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants';
import { useRouter } from '../hooks/useRouter';

interface TopAppBarProps {
  leading?: 'none' | 'menu' | 'back';
  title?: string;
  trailingIcon?: string;
  trailingAction?: () => void;
  titleColor?: string;
}

export default function TopAppBar({
  leading = 'none',
  title,
  trailingIcon,
  trailingAction,
  titleColor = Colors.appPrimary,
}: TopAppBarProps) {
  const router = useRouter();

  /** Renderiza el botón izquierdo según el tipo configurado */
  const renderLeading = () => {
    switch (leading) {
      case 'menu':
        return (
          <TouchableOpacity
            onPress={() => {
              // Open drawer - handled in MapaView
            }}
            style={styles.iconButton}
            accessibilityLabel="Abrir menú"
          >
            <Ionicons name="menu" size={22} color={Colors.onSurface} />
          </TouchableOpacity>
        );
      case 'back':
        return (
          <TouchableOpacity
            onPress={() => router.navigate('mapaPrincipal')}
            style={styles.iconButton}
            accessibilityLabel="Volver"
          >
            <Ionicons name="arrow-back" size={22} color={Colors.onSurface} />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderLeading()}
      {title && (
        <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
          {title}
        </Text>
      )}
      <View style={{ flex: 1 }} />
      {trailingIcon && trailingAction && (
        <TouchableOpacity onPress={trailingAction} style={styles.iconButton} accessibilityLabel="Acción">
          <Ionicons name={trailingIcon as any} size={20} color={Colors.onSurface} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.gutter,
    height: 56,
    maxWidth: '100%',
    backgroundColor: Colors.appSurface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: Typography.headlineLgMobile.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineLgMobile.fontWeight,
    lineHeight: 32,
  },
  iconButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
