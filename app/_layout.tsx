import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RouterProvider } from '@/shared/hooks/useRouter';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
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
