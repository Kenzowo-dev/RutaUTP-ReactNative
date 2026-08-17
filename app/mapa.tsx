import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, AppTracking } from '../constants';
import { useRouter } from '../hooks/useRouter';
import { DestinoChip, RutaOpcion } from '../types';
import BusCard from '../components/BusCard';
import BottomNavBar from '../components/BottomNavBar';
import TopAppBar from '../components/TopAppBar';

const DESTINOS: DestinoChip[] = [
  { id: 1, label: 'Casa', icon: 'home', lat: -8.1180, lon: -79.0350 },
  { id: 2, label: 'UTP', icon: 'school', lat: -8.1116, lon: -79.0287 },
  { id: 3, label: 'Trabajo', icon: 'briefcase', lat: -8.1050, lon: -79.0200 },
  { id: 4, label: 'Centro', icon: 'business', lat: -8.1090, lon: -79.0270 },
  { id: 5, label: 'Huanchaco', icon: 'water', lat: -8.0825, lon: -79.1197 },
];

const RUTAS_OPCIONES: RutaOpcion[] = [
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
];

const BUS_SIMULADOS_LINEAS = ['B', '10', '4', 'C', '7', 'A'];

interface BusSimulado {
  id: number;
  lat: number;
  lon: number;
  linea: string;
  angulo: number;
  velocidad: number;
}

export default function MapaView() {
  const router = useRouter();
  const [mostrarDrawer, setMostrarDrawer] = useState(false);
  const [showReportarSheet, setShowReportarSheet] = useState(false);
  const [showReportSuccess, setShowReportSuccess] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [destinoSeleccionado, setDestinoSeleccionado] = useState<DestinoChip | null>(null);
  const [region, setRegion] = useState({
    latitude: -8.1116,
    longitude: -79.0287,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
  });
  const [buses, setBuses] = useState<BusSimulado[]>([]);
  const [campoEnfocado, setCampoEnfocado] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const spawnBuses = (destino: DestinoChip) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const nuevos: BusSimulado[] = [];
    for (let i = 0; i < 6; i++) {
      const angulo = i * 60;
      const radio = 0.008 + Math.random() * 0.004;
      const rad = (angulo * Math.PI) / 180;
      nuevos.push({
        id: i,
        lat: destino.lat + Math.sin(rad) * radio,
        lon: destino.lon + Math.cos(rad) * radio,
        linea: BUS_SIMULADOS_LINEAS[i % BUS_SIMULADOS_LINEAS.length],
        angulo,
        velocidad: 0.0001 + Math.random() * 0.00005,
      });
    }
    setBuses(nuevos);
    timerRef.current = setInterval(() => {
      setBuses((prev) =>
        prev.map((b) => {
          const rad = (b.angulo * Math.PI) / 180;
          return {
            ...b,
            lat: b.lat + Math.sin(rad) * b.velocidad,
            lon: b.lon + Math.cos(rad) * b.velocidad,
            angulo: Math.random() < 0.002 ? Math.random() * 360 : b.angulo,
          };
        })
      );
    }, 50);
  };

  const seleccionarDestino = (destino: DestinoChip) => {
    setCampoEnfocado(false);
    if (destinoSeleccionado?.id === destino.id) return;
    setDestinoSeleccionado(destino);
    setTextoBusqueda(destino.label);
    setRegion({
      latitude: destino.lat,
      longitude: destino.lon,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    });
    spawnBuses(destino);
  };

  const buscarTexto = (texto: string) => {
    const t = texto.trim();
    if (!t) return;
    const match = DESTINOS.find((d) => d.label.toLowerCase().includes(t.toLowerCase()));
    if (match) seleccionarDestino(match);
  };

  const limpiar = () => {
    setTextoBusqueda('');
    setDestinoSeleccionado(null);
    setBuses([]);
    if (timerRef.current) clearInterval(timerRef.current);
    setRegion({
      latitude: -8.1116,
      longitude: -79.0287,
      latitudeDelta: 0.035,
      longitudeDelta: 0.035,
    });
  };

  const chipActivo = (destino: DestinoChip) => destinoSeleccionado?.id === destino.id;

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider="google"
        region={region}
        onRegionChangeComplete={setRegion}
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
        {buses.map((bus) => (
          <Marker key={bus.id} coordinate={{ latitude: bus.lat, longitude: bus.lon }}>
            <View style={styles.busMarkerContainer}>
              <View style={[styles.busPulse, { borderColor: Colors.appPrimary + '40' }]} />
              <View style={[styles.busDot, { backgroundColor: Colors.appPrimary }]}>
                <Text style={styles.busLineText}>{bus.linea}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.uiContainer}>
        <TopAppBar leading="menu" title="Mapa" />

        <View style={styles.searchPanel}>
          <View style={[styles.searchBar, { backgroundColor: Colors.surfaceContainerLow }]}>
            <Ionicons name="search" size={16} color={Colors.onSurfaceVariant} />
            <TextInput
              style={[styles.searchInput, { color: Colors.onSurface }]}
              placeholder="¿A dónde vas hoy?"
              placeholderTextColor={Colors.onSurfaceVariant}
              value={textoBusqueda}
              onChangeText={setTextoBusqueda}
              onFocus={() => setCampoEnfocado(true)}
              onBlur={() => setCampoEnfocado(false)}
              onSubmitEditing={() => buscarTexto(textoBusqueda)}
            />
            {textoBusqueda.length > 0 && (
              <TouchableOpacity onPress={limpiar}>
                <Ionicons name="close-circle" size={20} color={Colors.onSurfaceVariant} />
              </TouchableOpacity>
            )}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {DESTINOS.map((destino) => (
              <TouchableOpacity
                key={destino.id}
                onPress={() => seleccionarDestino(destino)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: chipActivo(destino) ? Colors.secondaryContainer : Colors.surfaceContainerHighest,
                  },
                ]}
              >
                <Ionicons
                  name={destino.icon as any}
                  size={12}
                  color={chipActivo(destino) ? Colors.onSecondaryContainer : Colors.onSurface}
                />
                <Text
                  style={[
                    styles.chipText,
                    { color: chipActivo(destino) ? Colors.onSecondaryContainer : Colors.onSurface },
                  ]}
                >
                  {destino.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.bottomPanel}>
          <View style={styles.bottomHeader}>
            <TouchableOpacity
              onPress={() => setShowReportarSheet(true)}
              style={[styles.reportarButton, { backgroundColor: Colors.appPrimary }]}
            >
              <Ionicons name="warning" size={14} color={Colors.onPrimary} />
              <Text style={[styles.reportarText, { color: Colors.onPrimary }]}>REPORTAR</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <View style={[styles.liveBadge, { backgroundColor: Colors.primaryFixed }]}>
              <View style={[styles.liveDot, { backgroundColor: Colors.appPrimary }]} />
              <Text style={[styles.liveText, { color: Colors.appPrimary }]}>En vivo</Text>
            </View>
            <Text style={[styles.transportTitle, { color: Colors.onSurface }]}>Transportes cercanos</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.busesRow}>
            {RUTAS_OPCIONES.map((ruta) => (
              <BusCard
                key={ruta.id}
                linea={`LÍNEA ${ruta.linea}`}
                empresa={ruta.empresa}
                minutos={`${ruta.llegaEn}`}
                tipo={ruta.linea === 'B' ? 'Micro' : ruta.linea === '10' ? 'Micro' : 'Combi'}
                placa={ruta.linea === 'B' ? 'T1B-721' : ruta.linea === '10' ? 'T1B-721' : 'A6N-450'}
                colorLinea={ruta.colorLinea}
                onPress={() => router.navigate('rutas')}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <BottomNavBar />

      <Modal visible={mostrarDrawer} transparent animationType="slide">
        <TouchableOpacity
          style={styles.drawerBackdrop}
          activeOpacity={1}
          onPress={() => setMostrarDrawer(false)}
        >
          <View style={styles.drawerBackdrop} />
        </TouchableOpacity>
        <View style={styles.drawerPanel}>
          <View style={[styles.drawerHeader, { backgroundColor: Colors.appPrimary }]}>
            <View style={styles.drawerAvatar}>
              <Text style={styles.drawerAvatarText}>JD</Text>
            </View>
            <Text style={styles.drawerTitle}>Ruta UTP Trujillo</Text>
            <Text style={styles.drawerSubtitle}>Menú principal</Text>
          </View>
          <ScrollView style={styles.drawerContent}>
            {[
              { icon: 'notifications', label: 'Notificaciones', color: Colors.tertiary },
              { icon: 'business', label: 'Ciudad', color: Colors.secondary },
              { icon: 'settings', label: 'Ajustes', color: Colors.onSurfaceVariant },
              { icon: 'headset', label: 'Soporte', color: Colors.onSurfaceVariant },
              { icon: 'information-circle', label: 'Sobre Nosotros', color: Colors.onSurfaceVariant },
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.drawerItem}
                onPress={() => setMostrarDrawer(false)}
              >
                <Ionicons name={item.icon as any} size={20} color={item.color} style={{ width: 28 }} />
                <Text style={[styles.drawerItemText, { color: Colors.onSurface }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                setMostrarDrawer(false);
                Alert.alert('Cerrar sesión', '¿Te vas?', [
                  { text: 'Cerrar sesión', style: 'destructive' },
                  { text: 'Cancelar', style: 'cancel' },
                ]);
              }}
            >
              <Ionicons name="exit" size={20} color={Colors.appPrimary} style={{ width: 28 }} />
              <Text style={[styles.drawerItemText, { color: Colors.appPrimary }]}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <Modal visible={showReportarSheet} transparent animationType="slide">
        <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setShowReportarSheet(false)} />
        <View style={[styles.reportSheet, { backgroundColor: Colors.surfaceContainerLowest }]}>
          <Text style={[styles.sheetTitle, { color: Colors.onSurface }]}>Reportar incidente</Text>
          <Text style={[styles.sheetLabel, { color: Colors.onSurfaceVariant }]}>TIPO DE REPORTE</Text>
          <View style={styles.segmentedControl}>
            {['Alerta', 'Tráfico', 'Sugerencia'].map((tipo, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.segmentItem,
                  { backgroundColor: i === 0 ? Colors.appPrimary : Colors.surfaceContainerLow },
                ]}
              >
                <Text style={[styles.segmentText, { color: i === 0 ? Colors.onPrimary : Colors.onSurface }]}>
                  {tipo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.sheetLabel, { color: Colors.onSurfaceVariant }]}>DESCRIPCIÓN</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: Colors.surfaceContainerLow, color: Colors.onSurface }]}
            placeholder="¿Qué sucede?"
            placeholderTextColor={Colors.onSurfaceVariant}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: Colors.appPrimary }]}
            onPress={() => {
              setShowReportarSheet(false);
              setShowReportSuccess(true);
            }}
          >
            <Text style={[styles.submitText, { color: Colors.onPrimary }]}>Enviar reporte</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={showReportSuccess} transparent animationType="fade">
        <View style={styles.alertOverlay}>
          <View style={[styles.alertContent, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <Text style={[styles.alertTitle, { color: Colors.onSurface }]}>Reporte enviado</Text>
            <Text style={[styles.alertMessage, { color: Colors.onSurface }]}>
              Tu reporte fue enviado a la comunidad. Gracias por colaborar.
            </Text>
            <TouchableOpacity
              onPress={() => setShowReportSuccess(false)}
              style={[styles.alertButton, { backgroundColor: Colors.appPrimary }]}
            >
              <Text style={[styles.alertButtonText, { color: Colors.onPrimary }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  uiContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  searchPanel: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: Typography.fontBeVietnam,
  },
  chipsRow: {
    paddingHorizontal: 2,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 9999,
  },
  chipText: {
    fontSize: 13,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: '500',
  },
  bottomPanel: {
    paddingBottom: 80,
    gap: 10,
  },
  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  reportarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 9999,
    shadowColor: Colors.appPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  reportarText: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
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
  transportTitle: {
    fontSize: 16,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: '700',
    opacity: 0.85,
  },
  busesRow: {
    paddingHorizontal: 20,
    gap: 12,
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
  busMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },
  busPulse: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  busDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  busLineText: {
    fontSize: 6,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: '#00000055',
  },
  drawerPanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: Colors.appSurface,
  },
  drawerHeader: {
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 24,
    gap: 6,
  },
  drawerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.onPrimary + '30',
    borderWidth: 2,
    borderColor: Colors.onPrimary + '8C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  drawerTitle: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
    color: Colors.onPrimary,
    marginTop: 6,
  },
  drawerSubtitle: {
    fontSize: Typography.bodyXs.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyXs.fontWeight,
    color: Colors.onPrimary + 'BF',
  },
  drawerContent: {
    flex: 1,
    paddingVertical: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 16,
  },
  drawerItemText: {
    fontSize: Typography.bodySmMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySmMedium.fontWeight,
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000AA',
  },
  reportSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 16,
    maxHeight: '70%',
  },
  sheetTitle: {
    fontSize: Typography.headlineMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineMd.fontWeight,
  },
  sheetLabel: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMd.fontWeight,
  },
  textArea: {
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  alertOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000066',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  alertContent: {
    borderRadius: 20,
    padding: 24,
    gap: 16,
    width: '100%',
  },
  alertTitle: {
    fontSize: Typography.displayLg.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayLg.fontWeight,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMd.fontWeight,
    textAlign: 'center',
    lineHeight: 22,
  },
  alertButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  alertButtonText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
});
