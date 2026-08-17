import React from 'react';
import { useRouter as useExpoRouter, useSegments } from 'expo-router';
import { useCallback } from 'react';
import { AppScreen } from '../types';

const SEGMENT_TO_SCREEN: Record<string, AppScreen> = {
  index: 'bienvenida',
  mapa: 'mapaPrincipal',
  rutas: 'rutas',
  guardado: 'guardado',
  seguridad: 'seguridad',
  perfil: 'perfil',
};

const SCREEN_TO_SEGMENT: Record<AppScreen, string> = {
  bienvenida: 'index',
  mapaPrincipal: 'mapa',
  rutas: 'rutas',
  guardado: 'guardado',
  seguridad: 'seguridad',
  perfil: 'perfil',
};

export function RouterProvider({ children }: { children: React.ReactNode }) {
  return React.createElement(React.Fragment, null, children);
}

export function useRouter() {
  const expoRouter = useExpoRouter();
  const segments = useSegments();

  const currentScreen = segments.length > 0 ? SEGMENT_TO_SCREEN[segments[0]] || 'bienvenida' : 'bienvenida';

  const navigate = useCallback(
    (screen: AppScreen) => {
      const segment = SCREEN_TO_SEGMENT[screen];
      if (segment) {
        expoRouter.navigate(segment as Parameters<typeof expoRouter.navigate>[0]);
      }
    },
    [expoRouter]
  );

  const reset = useCallback(() => {
    expoRouter.replace('index' as Parameters<typeof expoRouter.replace>[0]);
  }, [expoRouter]);

  return { currentScreen, navigate, reset };
}
