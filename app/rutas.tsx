import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, AppTracking } from '../constants';
import { useRouter } from '../hooks/useRouter';
import { RutaOpcion } from '../types';
import StatTile from '../components/StatTile';
import BottomNavBar from '../components/BottomNavBar';
import TopAppBar from '../components/TopAppBar';

const RUTAS: RutaOpcion[] = [
  {
    id: 1,
    linea: 'B',
    empresa: 'Empresa Salaverry',
    recorrido: 'Salaverry → UTP → Centro',
    llegaEn: '4 min',
    tiempo: '20 min',
    costo: 'S/ 1.50',
    congestion: 'Media',
    colorLinea: Colors.appPrimary,
  },
  {
    id: 2,
    linea: '10',
    empresa: 'El Cortijo',
    recorrido: 'El Cortijo → Av. España → UTP',
    llegaEn: '7 min',
    tiempo: '25 min',
    costo: 'S/ 1.00',
    congestion: 'Baja',
    colorLinea: Colors.secondary,
  },
  {
    id: 3,
    linea: '4',
    empresa: 'Trans Salaverry',
    recorrido: 'Huanchaco → Centro → UTP',
    llegaEn: '12 min',
    tiempo: '30 min',
    costo: 'S/ 1.50',
    congestion: 'Alta',
    colorLinea: Colors.tertiary,
  },
  {
    id: 4,
    linea: 'C',
    empresa: 'Trans Moche',
    recorrido: 'Moche → Av. España → Plaza Mayor',
    llegaEn: '18 min',
    tiempo: '35 min',
    costo: 'S/ 1.00',
    congestion: 'Media',
    colorLinea: '#6750a4',
  },
];

const COORDENADAS_LINEAS: Record<string, { latitude: number; longitude: number }[]> = {
  B: [
    { latitude: -8.1200, longitude: -79.0350 },
    { latitude: -8.1170, longitude: -79.0330 },
    { latitude: -8.1145, longitude: -79.0310 },
    { latitude: -8.1116, longitude: -79.0287 },
  ],
  '10': [
    { latitude: -8.0780, longitude: -79.0420 },
    { latitude: -8.0850, longitude: -79.0390 },
    { latitude: -8.0920, longitude: -79.0360 },
    { latitude: -8.0990, longitude: -79.0330 },
    { latitude: -8.1040, longitude: -79.0310 },
    { latitude: -8.1080, longitude: -79.0295 },
    { latitude: -8.1116, longitude: -79.0287 },
  ],
  '4': [
    { latitude: -8.0825, longitude: -79.1197 },
    { latitude: -8.0920, longitude: -79.0900 },
    { latitude: -8.1000, longitude: -79.0600 },
    { latitude: -8.1050, longitude: -79.0400 },
    { latitude: -8.1090, longitude: -79.0320 },
    { latitude: -8.1116, longitude: -79.0287 },
  ],
  C: [
    { latitude: -8.1200, longitude: -79.0350 },
    { latitude: -8.1170, longitude: -79.0330 },
    { latitude: -8.1145, longitude: -79.0310 },
    { latitude: -8.1116, longitude: -79.0287 },
  ],
  '7': [
    { latitude: -8.0825, longitude: -79.1197 },
    { latitude: -8.0920, longitude: -79.0900 },
    { latitude: -8.1000, longitude: -79.0600 },
    { latitude: -8.1050, longitude: -79.0400 },
    { latitude: -8.1090, longitude: -79.0320 },
    { latitude: -8.1116, longitude: -79.0287 },
  ],
  A: [
    { latitude: -8.1200, longitude: -79.0350 },
    { latitude: -8.1170, longitude: -79.0330 },
    { latitude: -8.1145, longitude: -79.0310 },
    { latitude: -8.1116, longitude: -79.0287 },
  ],
};

export default function RutasView() {
  const router = useRouter();
  const [rutaSeleccionada, setRutaSeleccionada] = useState<RutaOpcion | null>(null);

  return (
    <View style={styles.container}>
      {rutaSeleccionada ? (
        <DetalleRutaView ruta={rutaSeleccionada} onBack={() => setRutaSeleccionada(null)} />
      ) : (
        <View style={{ flex: 1 }}>
          <TopAppBar
            leading="menu"
            title="Rutas"
            titleColor={Colors.appPrimary}
            trailingIcon="bus"
          />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.mapContainer}>
              <MapView
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                region={{
                  latitude: -8.1116,
                  longitude: -79.0287,
                  latitudeDelta: 0.035,
                  longitudeDelta: 0.035,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
              >
                <Marker coordinate={{ latitude: -8.1116, longitude: -79.0287 }} title="UTP Trujillo">
                  <View style={styles.utpMarker}>
                    <Text style={styles.utpLabel}>UTP Trujillo</Text>
                    <View style={[styles.utpCircle, { backgroundColor: Colors.appPrimary }]}>
                      <Ionicons name="school" size={16} color={Colors.onPrimary} />
                    </View>
                  </View>
                </Marker>
                <Marker coordinate={{ latitude: -8.1180, longitude: -79.0350 }}>
                  <View style={styles.userMarkerContainer}>
                    <View style={[styles.userPulse, { borderColor: Colors.secondaryContainer }]} />
                    <View style={[styles.userCircle, { backgroundColor: Colors.secondary }]}>
                      <Ionicons name="walk" size={9} color={Colors.onPrimary} />
                    </View>
                  </View>
                </Marker>
              </MapView>
              <LinearGradient
                colors={['transparent', Colors.appBackground + '99']}
                style={styles.mapGradient}
              />
            </View>

            <View style={styles.rutasList}>
              <View style={styles.rutasHeader}>
                <View>
                  <Text style={[styles.rutasTitle, { color: Colors.onSurface }]}>Elige tu ruta</Text>
                  <Text style={[styles.rutasSubtitle, { color: Colors.onSurfaceVariant }]}>
                    Toca una ruta para ver el detalle
                  </Text>
                </View>
                <View style={[styles.liveBadge, { backgroundColor: Colors.primaryFixed }]}>
                  <View style={[styles.liveDot, { backgroundColor: Colors.appPrimary }]} />
                  <Text style={[styles.liveText, { color: Colors.appPrimary }]}>EN VIVO</Text>
                </View>
              </View>

              {RUTAS.map((ruta) => (
                <TouchableOpacity
                  key={ruta.id}
                  onPress={() => setRutaSeleccionada(ruta)}
                  style={[styles.rutaCard, { backgroundColor: Colors.surfaceContainerLowest }]}
                >
                  <View style={[styles.rutaAccent, { backgroundColor: ruta.colorLinea }]} />
                  <View style={[styles.rutaIconCircle, { backgroundColor: ruta.colorLinea + '20' }]}>
                    <Text style={[styles.rutaIconText, { color: ruta.colorLinea }]}>{ruta.linea}</Text>
                  </View>
                  <View style={styles.rutaInfo}>
                    <Text style={[styles.rutaEmpresa, { color: Colors.onSurface }]}>{ruta.empresa}</Text>
                    <Text style={[styles.rutaRecorrido, { color: Colors.onSurfaceVariant }]} numberOfLines={1}>
                      {ruta.recorrido}
                    </Text>
                  </View>
                  <View style={styles.rutaRight}>
                    <Text style={[styles.rutaLlega, { color: ruta.colorLinea }]}>{ruta.llegaEn}</Text>
                    <Text style={[styles.rutaLlegaLabel, { color: Colors.onSurfaceVariant }]}>llegada</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={13} color={Colors.onSurfaceVariant} style={{ opacity: 0.4 }} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <BottomNavBar />
        </View>
      )}
    </View>
  );
}

function DetalleRutaView({ ruta, onBack }: { ruta: RutaOpcion; onBack: () => void }) {
  const [showNav, setShowNav] = useState(false);
  const coords = COORDENADAS_LINEAS[ruta.linea] || COORDENADAS_LINEAS['B'];

  return (
    <View style={styles.container}>
      <TopAppBar leading="back" title={`Ruta ${ruta.linea}`} titleColor={Colors.appPrimary} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mapContainer}>
          <MapView
            style={StyleSheet.absoluteFill}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: -8.1116,
              longitude: -79.0287,
              latitudeDelta: 0.025,
              longitudeDelta: 0.025,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
          >
            <Polyline
              coordinates={coords}
              strokeColor={ruta.colorLinea}
              strokeWidth={5}
              lineCap="round"
              lineJoin="round"
            />
            <Marker coordinate={coords[0]} title="Origen">
              <View style={[styles.originDot, { backgroundColor: ruta.colorLinea }]} />
            </Marker>
            <Marker coordinate={coords[coords.length - 1]} title="UTP Trujillo">
              <View style={[styles.destDot, { backgroundColor: '#e53935' }]}>
                <Ionicons name="school" size={12} color={Colors.onPrimary} />
              </View>
            </Marker>
          </MapView>
          <View style={styles.rutaSeguraBadge}>
            <Ionicons name="heart" size={13} color={Colors.onPrimary} />
            <Text style={[styles.rutaSeguraText, { color: Colors.onPrimary }]}>RUTA SEGURA</Text>
          </View>
        </View>

        <View style={styles.detailContent}>
          <View style={[styles.infoCard, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <View style={[styles.infoAccent, { backgroundColor: ruta.colorLinea }]} />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={[styles.infoEmpresa, { color: Colors.onSurface }]}>{ruta.empresa}</Text>
              <Text style={[styles.infoDestino, { color: Colors.onSurfaceVariant }]}>Destino: UTP Trujillo</Text>
            </View>
            <View style={[styles.llegaBadge, { backgroundColor: Colors.primaryContainer }]}>
              <Text style={[styles.llegaLabel, { color: Colors.onPrimaryContainer }]}>LLEGA EN</Text>
              <Text style={[styles.llegaValue, { color: Colors.onPrimaryContainer }]}>{ruta.llegaEn}</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <StatTile icon="time" iconColor={Colors.appPrimary} label="TIEMPO" value={ruta.tiempo} />
            <StatTile icon="card" iconColor={Colors.appPrimary} label="COSTO" value={ruta.costo} />
            <StatTile icon="refresh" iconColor={Colors.appPrimary} label="TRANSBORDOS" value="0" />
            <StatTile
              icon="bar-chart"
              iconColor={Colors.secondary}
              label="CONGESTIÓN"
              value={ruta.congestion}
            />
          </View>

          <View style={styles.pasosSection}>
            <Text style={[styles.pasosTitle, { color: Colors.onSurface }]}>Guía paso a paso</Text>
            <View style={{ gap: 18 }}>
              <PasoRow n="1" title="Camina al paradero Av. España" subtitle="250 metros · 3 min aprox." icon="walk" bg={Colors.surfaceContainerHighest} fg={Colors.onSurface} isLast={false} />
              <PasoRow n="2" title={`Sube a la línea ${ruta.linea}`} subtitle={`${ruta.empresa} · 15 min de viaje`} icon="bus" bg={Colors.appPrimary} fg={Colors.onPrimary} isLast={false} />
              <PasoRow n="3" title="Baja en frontis UTP" subtitle="Llegada a destino final" icon="school" bg={Colors.tertiary} fg={Colors.onTertiary} isLast={true} />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setShowNav(true)}
            style={[styles.ctaButton, { backgroundColor: Colors.primaryContainer }]}
          >
            <Ionicons name="navigate" size={22} color={Colors.onPrimaryContainer} />
            <Text style={[styles.ctaText, { color: Colors.onPrimaryContainer }]}>Iniciar Navegación</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showNav} animationType="slide">
        <CarPlayView rutaNombre={`Ruta ${ruta.linea} - ${ruta.empresa}`} onFinish={() => setShowNav(false)} />
      </Modal>
    </View>
  );
}

function PasoRow({ n, title, subtitle, icon, bg, fg, isLast }: any) {
  return (
    <View style={styles.pasoRow}>
      <View style={styles.pasoIconCol}>
        <View style={[styles.pasoCircle, { backgroundColor: bg }]}>
          <Ionicons name={icon as any} size={12} color={fg} />
        </View>
        {!isLast && <View style={[styles.pasoLine, { backgroundColor: Colors.surfaceContainerHighest }]} />}
      </View>
      <View style={{ flex: 1, paddingTop: 1 }}>
        <Text style={[styles.pasoTitle, { color: Colors.onSurface }]}>{n}. {title}</Text>
        <Text style={[styles.pasoSubtitle, { color: Colors.onSurfaceVariant }]}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.appBackground },
  scrollContent: { paddingBottom: 80 },
  mapContainer: {
    height: 280,
    position: 'relative',
  },
  mapGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
  utpMarker: {
    alignItems: 'center',
    gap: 2,
  },
  utpLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onPrimary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: Colors.appPrimary,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  utpCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  userMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  userPulse: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
  userCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  originDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  destDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  rutasList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  rutasHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 4,
  },
  rutasTitle: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  rutasSubtitle: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  liveText: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  rutaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  rutaAccent: {
    width: 4,
    height: 56,
    borderRadius: 2,
  },
  rutaIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rutaIconText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: Typography.fontHankenGrotesk,
  },
  rutaInfo: {
    flex: 1,
    gap: 3,
  },
  rutaEmpresa: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  rutaRecorrido: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  rutaRight: {
    alignItems: 'flex-end',
    gap: 2,
    marginRight: 8,
  },
  rutaLlega: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  rutaLlegaLabel: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  detailContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  infoAccent: {
    width: 6,
    height: 48,
    borderRadius: 3,
  },
  infoEmpresa: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  infoDestino: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  llegaBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  llegaLabel: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  llegaValue: {
    fontSize: Typography.displayNumberMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayNumberMd.fontWeight,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pasosSection: {
    gap: 12,
  },
  pasosTitle: {
    fontSize: Typography.headlineXs.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineXs.fontWeight,
  },
  pasoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  pasoIconCol: {
    alignItems: 'center',
    width: 24,
  },
  pasoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pasoLine: {
    width: 2,
    height: 36,
  },
  pasoTitle: {
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMd.fontWeight,
  },
  pasoSubtitle: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: Colors.primaryContainer,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaText: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  rutaSeguraBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 9999,
    backgroundColor: Colors.tertiary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  rutaSeguraText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

const carStyles = StyleSheet.create({
  carContainer: { flex: 1, backgroundColor: '#0a0a0a' },
  carTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  carNavLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onPrimary + 'B3',
    letterSpacing: 1.5,
  },
  carRutaNombre: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.onPrimary,
    fontFamily: Typography.fontHankenGrotesk,
  },
  carFinishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: Colors.onPrimary + '26',
  },
  carFinishText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onPrimary,
    letterSpacing: 0.5,
  },
  carMapContainer: {
    height: '60%',
  },
  carBottomPanel: {
    flex: 1,
    padding: 20,
    gap: 14,
  },
  carInstructionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carInstructionText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: Typography.fontHankenGrotesk,
  },
  carInstructionDist: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.onPrimary + '99',
    marginTop: 4,
  },
  carProgressTrack: {
    height: 4,
    backgroundColor: Colors.onPrimary + '33',
    borderRadius: 2,
    overflow: 'hidden',
  },
  carProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  carMetaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onPrimary + '80',
    letterSpacing: 1.5,
  },
  carMetaValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: Typography.fontHankenGrotesk,
  },
  carMarkerDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.onPrimary,
  },
});

function CarPlayView({ rutaNombre, onFinish }: { rutaNombre: string; onFinish: () => void }) {
  const [instructionIndex, setInstructionIndex] = useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const instrucciones = [
    { texto: 'Camina 250m hasta Av. España', distancia: '250 m', icono: 'walk' },
    { texto: 'Sube al bus Línea B en el paradero', distancia: '15 min', icono: 'bus' },
    { texto: 'Continúa por Av. España por 1.5 km', distancia: '1.5 km', icono: 'arrow-up' },
    { texto: 'Baja en el frontis de UTP Trujillo', distancia: '200 m', icono: 'arrow-down' },
    { texto: 'Llegaste a tu destino!', distancia: '', icono: 'checkmark-circle' },
  ];

  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setInstructionIndex((prev) => {
        if (prev >= instrucciones.length - 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const progreso = instructionIndex / Math.max(instrucciones.length - 1, 1);
  const tiempoRestante = ['4 min', '3 min', '2 min', '1 min', '0 min'][Math.min(instructionIndex, 4)];
  const distanciaRestante = ['2.0 km', '1.8 km', '1.5 km', '0.5 km', '0 m'][Math.min(instructionIndex, 4)];
  const actual = instrucciones[instructionIndex];

  return (
    <View style={carStyles.carContainer}>
      <View style={[carStyles.carTopBar, { backgroundColor: Colors.appPrimary }]}>
        <View style={{ flex: 1 }}>
          <Text style={carStyles.carNavLabel}>NAVEGANDO</Text>
          <Text style={carStyles.carRutaNombre}>{rutaNombre}</Text>
        </View>
        <TouchableOpacity onPress={onFinish} style={carStyles.carFinishButton}>
          <Ionicons name="close" size={12} color={Colors.onPrimary} />
          <Text style={carStyles.carFinishText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
      <View style={carStyles.carMapContainer}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: -8.1116,
            longitude: -79.0287,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
        >
          <Polyline
            coordinates={[
              { latitude: -8.1180, longitude: -79.0350 },
              { latitude: -8.1140, longitude: -79.0320 },
              { latitude: -8.1116, longitude: -79.0287 },
            ]}
            strokeColor={Colors.appPrimary}
            strokeWidth={6}
            lineCap="round"
          />
          <Marker coordinate={{ latitude: -8.1116, longitude: -79.0287 }}>
            <View style={[carStyles.carMarkerDot, { backgroundColor: Colors.appPrimary }]}>
              <Ionicons name="school" size={12} color={Colors.onPrimary} />
            </View>
          </Marker>
        </MapView>
      </View>
      <View style={[carStyles.carBottomPanel, { backgroundColor: '#1a1a1a' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={[carStyles.carInstructionIcon, { backgroundColor: Colors.appPrimary + '33' }]}>
            <Ionicons name={actual.icono as any} size={26} color={Colors.appPrimary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={carStyles.carInstructionText} numberOfLines={2}>
              {actual.texto}
            </Text>
            {actual.distancia ? (
              <Text style={carStyles.carInstructionDist}>{actual.distancia}</Text>
            ) : null}
          </View>
        </View>
        <View style={{ paddingVertical: 4 }}>
          <View style={carStyles.carProgressTrack}>
            <View style={[carStyles.carProgressFill, { width: `${progreso * 100}%`, backgroundColor: Colors.appPrimary }]} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={carStyles.carMetaLabel}>TIEMPO</Text>
            <Text style={carStyles.carMetaValue}>{tiempoRestante}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={carStyles.carMetaLabel}>DISTANCIA</Text>
            <Text style={carStyles.carMetaValue}>{distanciaRestante}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

