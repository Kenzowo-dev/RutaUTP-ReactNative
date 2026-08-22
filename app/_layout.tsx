/**
 * =============================================================================
 * ROOT LAYOUT — Layout raíz de la aplicación (expo-router)
 * =============================================================================
 *
 * PROPÓSITO:
 * Configura la estructura base de la aplicación: carga las fuentes tipográficas,
 * define el navigator de pantallas y envuelve todo en el RouterProvider.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Carga de fuentes: useFonts carga las fuentes locales antes de renderizar
 *   para evitar FOIT (Flash of Invisible Text) y garantizar consistencia visual.
 * - Stack Navigator: define la navegación tipo pila (push/pop) entre pantallas.
 * - headerShown: false oculta el header nativo porque usamos TopAppBar custom.
 * - RouterProvider: contexto de navegación personalizado (actualmente placeholder).
 * - Splash screen: retorna null mientras cargan las fuentes (evita texto sin estilo).
 *
 * PANTALLAS REGISTRADAS:
 * - index: bienvenida (onboarding inicial)
 * - mapa: vista del mapa con transporte
 * - rutas: lista de rutas disponibles
 * - guardado: lugares y líneas guardadas
 * - seguridad: reportes y rutas seguras
 * - perfil: datos del usuario
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RouterProvider } from '@/shared/hooks/useRouter';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  /** Carga de fuentes tipográficas personalizadas
   *  fontsLoaded: true cuando todas las fuentes están disponibles
   *  fontError: true si alguna fuente no pudo cargarse */
  const [fontsLoaded, fontError] = useFonts({
    'HankenGrotesk': require('../assets/fonts/HankenGrotesk-Regular.ttf'),
    'HankenGrotesk-Bold': require('../assets/fonts/HankenGrotesk-Bold.ttf'),
    'HankenGrotesk-ExtraBold': require('../assets/fonts/HankenGrotesk-ExtraBold.ttf'),
    'BeVietnamPro': require('../assets/fonts/BeVietnamPro-Regular.ttf'),
    'BeVietnamPro-Medium': require('../assets/fonts/BeVietnamPro-Medium.ttf'),
    'BeVietnamPro-SemiBold': require('../assets/fonts/BeVietnamPro-SemiBold.ttf'),
    'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-SemiBold': require('../assets/fonts/JetBrainsMono-SemiBold.ttf'),
  });

  /** Muestra null (pantalla en blanco) mientras cargan las fuentes
   *  Si hay error, igual renderiza para usar fallback del sistema */
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <RouterProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#f7f9fb' } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="mapa" />
        <Stack.Screen name="rutas" />
        <Stack.Screen name="guardado" />
        <Stack.Screen name="seguridad" />
        <Stack.Screen name="perfil" />
      </Stack>
      <StatusBar style="auto" />
    </RouterProvider>
  );
}
