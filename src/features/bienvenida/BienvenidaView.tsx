import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, AppTracking } from '@/shared/constants';
import FeatureCard from '@/shared/components/FeatureCard';
import styles from './styles';

import { AppScreen } from '@/shared/types';

interface BienvenidaViewProps {
  viewModel: {
    isPressed: boolean;
    setIsPressed: (pressed: boolean) => void;
    showLegalSheet: boolean;
    setShowLegalSheet: (show: boolean) => void;
    router: {
      navigate: (screen: AppScreen) => void;
    };
  };
}

export default function BienvenidaView({ viewModel }: BienvenidaViewProps) {
  const { isPressed, showLegalSheet, router } = viewModel;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primaryFixed + '99', Colors.appPrimary + '99']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.progressBar}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: Colors.appPrimary }]}>Ruta UTP Trujillo</Text>
          <TouchableOpacity onPress={() => router.navigate('mapaPrincipal')}>
            <Text style={[styles.skipButton, { color: Colors.onSurfaceVariant }]}>Saltar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={[styles.arrivalCard, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <View style={[styles.iconCircle, { backgroundColor: Colors.appPrimary, shadowColor: Colors.appPrimary }]}>
              <Ionicons name="bus" size={22} color={Colors.onPrimary} />
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text style={[styles.arrivingLabel, { color: Colors.onSurfaceVariant }]}>LLEGANDO EN</Text>
              <Text style={[styles.arrivalTime, { color: Colors.appPrimary }]}>3 min</Text>
            </View>
          </View>

          <View style={[styles.busImageContainer, { backgroundColor: '#000', borderRadius: 34 }]}>
            <Ionicons name="bus" size={120} color={Colors.onPrimary} style={{ opacity: 0.85 }} />
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={[styles.heroTitle, { color: Colors.onSurface }]}>
              Llega a la UTP sin perderte
            </Text>
            <Text style={[styles.heroSubtitle, { color: Colors.onSurfaceVariant }]}>
              Encuentra la ruta exacta desde tu ubicación hasta el campus sin complicaciones.
            </Text>
          </View>

          <View style={styles.pageDots}>
            <View style={[styles.dotActive, { backgroundColor: Colors.appPrimary }]} />
            <View style={[styles.dot, { backgroundColor: Colors.onSurfaceVariant + '4D' }]} />
            <View style={[styles.dot, { backgroundColor: Colors.onSurfaceVariant + '4D' }]} />
          </View>

          <View style={styles.featureGrid}>
            <FeatureCard
              icon="heart"
              iconColor={Colors.appPrimary}
              label="SEGURIDAD"
              title="Rutas nocturnas monitoreadas."
            />
            <FeatureCard
              icon="card"
              iconColor={Colors.tertiary}
              label="AHORRO"
              title="Precios de micros y combis actualizados."
            />
          </View>

          <TouchableOpacity
            onPressIn={() => viewModel.setIsPressed(true)}
            onPressOut={() => viewModel.setIsPressed(false)}
            onPress={() => router.navigate('mapaPrincipal')}
            activeOpacity={0.9}
            accessibilityLabel="Comenzar a usar la aplicación"
          >
            <View
              style={[
                styles.ctaButton,
                {
                  backgroundColor: Colors.appPrimary,
                  shadowColor: Colors.appPrimary,
                  transform: [{ scale: isPressed ? 0.95 : 1 }],
                },
              ]}
            >
              <Text style={[styles.ctaText, { color: Colors.onPrimary }]}>Comenzar</Text>
              <Ionicons name="arrow-forward" size={22} color={Colors.onPrimary} />
            </View>
          </TouchableOpacity>

          <View style={styles.legalFooter}>
            <Text style={[styles.legalText, { color: Colors.onSurfaceVariant }]}>
              Al continuar, aceptas nuestros{' '}
            </Text>
            <TouchableOpacity onPress={() => viewModel.setShowLegalSheet(true)}>
              <Text style={[styles.legalLink, { color: Colors.appPrimary }]}>Términos de Servicio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {showLegalSheet && (
        <View style={styles.sheetOverlay}>
          <TouchableOpacity style={styles.sheetBackdrop} onPress={() => viewModel.setShowLegalSheet(false)} />
          <View style={[styles.sheetContent, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.sheetTitle, { color: Colors.onSurface }]}>Términos de Servicio</Text>
              <Text style={[styles.sheetText, { color: Colors.onSurface }]}>
                Ruta UTP Trujillo es una aplicación prototipo que facilita la orientación de transporte público
                hacia el campus de la Universidad Tecnológica del Perú (sede Trujillo). Al usar esta app aceptas
                las condiciones aquí descritas.
              </Text>
              <Text style={[styles.sheetSubtitle, { color: Colors.onSurface }]}>Privacidad</Text>
              <Text style={[styles.sheetText, { color: Colors.onSurface }]}>
                Los datos de ubicación y reportes comunitarios son simulados para efectos de demostración. No se
                comparte información con terceros.
              </Text>
            </ScrollView>
            <TouchableOpacity
              onPress={() => viewModel.setShowLegalSheet(false)}
              style={[styles.sheetCloseButton, { backgroundColor: Colors.appPrimary }]}
            >
              <Text style={[styles.sheetCloseText, { color: Colors.onPrimary }]}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
