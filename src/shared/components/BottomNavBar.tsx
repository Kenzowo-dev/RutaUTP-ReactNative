/**
 * =============================================================================
 * BOTTOM NAV BAR — Barra de navegación inferior con 5 pestañas
 * =============================================================================
 *
 * PROPÓSITO:
 * Barra inferior fija que permite navegar entre las 5 secciones principales
 * de la app: Mapa, Rutas, Guardado, Seguridad y Perfil.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Navegación principal: es el punto de entrada a todas las funcionalidades.
 * - Estado activo: resalta visualmente la pestaña correspondiente a la pantalla
 *   actual usando colores y opacidad diferenciados.
 * - Ocultamiento inteligente: en la pantalla de bienvenida (onboarding) la
 *   barra no se muestra para no distraer al usuario.
 * - Iconos duales: cada pestaña tiene un icono "active" (relleno) y "inactive"
 *   (contorno) para feedback visual inmediato.
 *
 * PESTAÑAS:
 * - mapa: vista del mapa con transporte en tiempo real
 * - rutas: lista de rutas disponibles con detalles
 * - guardado: lugares y líneas guardadas por el usuario
 * - seguridad: reportes comunitarios y rutas seguras
 * - perfil: datos del usuario, billetera y preferencias
 *
 * USO:
 * Se renderiza automáticamente en cada pantalla. No requiere props.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants';
import { useRouter } from '../hooks/useRouter';
import { NavTab } from '../types';

/** Orden de las pestañas en la barra (de izquierda a derecha) */
const NAV_TABS: NavTab[] = ['mapa', 'rutas', 'guardado', 'seguridad', 'perfil'];

/** Texto descriptivo de cada pestaña */
const TAB_LABELS: Record<NavTab, string> = {
  mapa: 'Mapa',
  rutas: 'Rutas',
  guardado: 'Guardado',
  seguridad: 'Seguridad',
  perfil: 'Perfil',
};

/** Iconos para estado activo e inactivo de cada pestaña */
const TAB_ICONS: Record<NavTab, { active: string; inactive: string }> = {
  mapa: { active: 'map', inactive: 'map-outline' },
  rutas: { active: 'bus', inactive: 'bus-outline' },
  guardado: { active: 'bookmark', inactive: 'bookmark-outline' },
  seguridad: { active: 'lock', inactive: 'lock-open-outline' },
  perfil: { active: 'person', inactive: 'person-outline' },
};

export default function BottomNavBar() {
  const router = useRouter();

  /** Determina qué pestaña está activa según la pantalla actual
   *  Retorna null si estamos en bienvenida (para ocultar la barra) */
  const getActiveTab = (): NavTab | null => {
    const { currentScreen } = router;
    if (currentScreen === 'bienvenida') return null;
    if (currentScreen === 'mapaPrincipal') return 'mapa';
    if (currentScreen === 'rutas') return 'rutas';
    if (currentScreen === 'guardado') return 'guardado';
    if (currentScreen === 'seguridad') return 'seguridad';
    if (currentScreen === 'perfil') return 'perfil';
    return null;
  };

  const activeTab = getActiveTab();

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <View style={styles.tabRow}>
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tabItem}
              onPress={() => router.navigate(tab === 'mapa' ? 'mapaPrincipal' : tab)}
              accessibilityLabel={TAB_LABELS[tab]}
            >
              <Ionicons
                name={isActive ? TAB_ICONS[tab].active as any : TAB_ICONS[tab].inactive as any}
                size={22}
                color={isActive ? Colors.appPrimary : Colors.onSurfaceVariant}
                style={{ opacity: isActive ? 1 : 0.65 }}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? Colors.appPrimary : Colors.onSurfaceVariant,
                    opacity: isActive ? 1 : 0.65,
                  },
                ]}
                numberOfLines={1}
              >
                {TAB_LABELS[tab]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appSurface,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.outlineVariant,
    opacity: 0.2,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
    lineHeight: 14,
  },
});
