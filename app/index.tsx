import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, AppTracking } from '../constants';
import { useRouter } from '../hooks/useRouter';
import FeatureCard from '../components/FeatureCard';

export default function BienvenidaView() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [showLegalSheet, setShowLegalSheet] = useState(false);

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
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
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
            <TouchableOpacity onPress={() => setShowLegalSheet(true)}>
              <Text style={[styles.legalLink, { color: Colors.appPrimary }]}>Términos de Servicio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {showLegalSheet && (
        <View style={styles.sheetOverlay}>
          <TouchableOpacity style={styles.sheetBackdrop} onPress={() => setShowLegalSheet(false)} />
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
              onPress={() => setShowLegalSheet(false)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  progressBar: {
    height: 4,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.containerPadding,
    height: 56,
    backgroundColor: Colors.appBackground,
  },
  headerTitle: {
    fontSize: Typography.headlineLgMobile.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineLgMobile.fontWeight,
  },
  skipButton: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  content: {
    paddingHorizontal: Spacing.gutter,
    gap: 24,
    maxWidth: 428,
    alignSelf: 'center',
    width: '100%',
  },
  arrivalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 30,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  arrivingLabel: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabelCaps,
  },
  arrivalTime: {
    fontSize: Typography.displayNumberLg.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayNumberLg.fontWeight,
    lineHeight: 40,
  },
  busImageContainer: {
    height: 290,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 22,
    elevation: 12,
  },
  heroTextContainer: {
    paddingHorizontal: Spacing.gutter,
    gap: 12,
  },
  heroTitle: {
    fontSize: Typography.displayLgPhone.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayLgPhone.fontWeight,
    textAlign: 'center',
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: Typography.bodyLg.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyLg.fontWeight,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  pageDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dotActive: {
    width: 40,
    height: 8,
    borderRadius: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featureGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  ctaText: {
    fontSize: Typography.displayLgPhone.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayLgPhone.fontWeight,
  },
  legalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  legalText: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
    textAlign: 'center',
    lineHeight: 20,
  },
  legalLink: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
    textDecorationLine: 'underline',
  },
  sheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000AA',
  },
  sheetContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '70%',
    gap: 16,
  },
  sheetTitle: {
    fontSize: Typography.headlineMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineMd.fontWeight,
  },
  sheetText: {
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMd.fontWeight,
    lineHeight: 22,
  },
  sheetSubtitle: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
    marginTop: 8,
  },
  sheetCloseButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  sheetCloseText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
});
