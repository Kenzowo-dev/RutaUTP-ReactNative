/**
 * =============================================================================
 * ROUTER PERSONALIZADO — Abstracción sobre expo-router
 * =============================================================================
 *
 * PROPÓSITO:
 * Proporciona una capa de abstracción sobre expo-router para gestionar
 * la navegación entre pantallas de forma tipada y centralizada.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Desacoplamiento: si en el futuro se cambia expo-router por otra librería
 *   (React Navigation, Native Navigation), solo se modifica este archivo.
 * - Tipado fuerte: AppScreen y NavTabScreenMap garantizan que solo se navegue
 *   a pantallas válidas (TypeScript detecta errores en tiempo de compilación).
 * - Mapeo bidireccional: SEGMENT_TO_SCREEN y SCREEN_TO_PERMITEN convertir
 *   entre nombres de archivo (segmentos de URL) y nombres de pantalla lógicos.
 * - Estado de pantalla actual: currentScreen permite saber en qué pantalla
 *   está el usuario (útil para resaltar la pestaña activa en BottomNavBar).
 *
 * ESTRUCTURA DE MAPEOS:
 * - index → bienvenida (pantalla inicial/onboarding)
 * - mapa → mapaPrincipal (vista del mapa con transporte)
 * - rutas → rutas (lista de rutas disponibles)
 * - guardado → guardado (lugares y líneas guardadas)
 * - seguridad → seguridad (reportes y rutas seguras)
 * - perfil → perfil (datos del usuario)
 *
 * RouterProvider:
 * Actualmente es un placeholder (Fragment vacío). En el futuro puede
 * implementarse como un Context para proveer estado global de navegación.
 */
import React from 'react';
import { useRouter as useExpoRouter, useSegments } from 'expo-router';
import { useCallback } from 'react';
import { AppScreen } from '../types';

/** Mapeo de segmentos de ruta (nombres de archivo) a pantallas lógicas */
const SEGMENT_TO_SCREEN: Record<string, AppScreen> = {
  index: 'bienvenida',
  mapa: 'mapaPrincipal',
  rutas: 'rutas',
  guardado: 'guardado',
  seguridad: 'seguridad',
  perfil: 'perfil',
};

/** Mapeo inverso: pantallas lógicas a segmentos de ruta (para navegación) */
const SCREEN_TO_SEGMENT: Record<AppScreen, string> = {
  bienvenida: 'index',
  mapaPrincipal: 'mapa',
  rutas: 'rutas',
  guardado: 'guardado',
  seguridad: 'seguridad',
  perfil: 'perfil',
};

/** Provider de navegación — placeholder para futura implementación como Context */
export function RouterProvider({ children }: { children: React.ReactNode }) {
  return React.createElement(React.Fragment, null, children);
}

/** Hook principal de navegación — expone currentScreen, navigate y reset */
export function useRouter() {
  const expoRouter = useExpoRouter();
  const segments = useSegments();

  /** Determina la pantalla actual basándose en el primer segmento de la ruta */
  const currentScreen = segments.length > 0 ? SEGMENT_TO_SCREEN[segments[0]] || 'bienvenida' : 'bienvenida';

  /** Navega a una pantalla específica usando su nombre lógico de AppScreen */
  const navigate = useCallback(
    (screen: AppScreen) => {
      const segment = SCREEN_TO_SEGMENT[screen];
      if (segment) {
        expoRouter.navigate(segment as Parameters<typeof expoRouter.navigate>[0]);
      }
    },
    [expoRouter]
  );

  /** Reinicia la navegación a la pantalla de bienvenida (replace evita volver atrás) */
  const reset = useCallback(() => {
    expoRouter.replace('index' as Parameters<typeof expoRouter.replace>[0]);
  }, [expoRouter]);

  return { currentScreen, navigate, reset };
}
