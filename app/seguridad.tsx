import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, AppTracking } from '../constants';
import { useRouter } from '../hooks/useRouter';
import { ReporteComunidad, RutaSegura, TipoReporte } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import TopAppBar from '../components/TopAppBar';

const REPORTES: ReporteComunidad[] = [
  {
    id: '1',
    iniciales: 'JD',
    nombre: 'Jorge D.',
    hace: 'HACE 5 MIN',
    tipo: 'ALERTA',
    cuerpo: 'Micro lleno en Av. Larco. Pasaron 3 sin parar hacia la UTP.',
    utiles: 12,
    comentarios: 2,
    utilMarcado: false,
    avatarColor: Colors.surfaceContainerHigh,
    avatarForeground: Colors.onSurfaceVariant,
  },
  {
    id: '2',
    iniciales: 'MA',
    nombre: 'Maria A.',
    hace: 'HACE 15 MIN',
    tipo: 'TRÁFICO',
    cuerpo: 'Demora en Óvalo Papal por obras. Considerar 10 min adicionales.',
    utiles: 45,
    comentarios: 8,
    utilMarcado: true,
    avatarColor: Colors.secondaryContainer,
    avatarForeground: Colors.onSecondaryContainer,
  },
  {
    id: '3',
    iniciales: 'RC',
    nombre: 'Rosa C.',
    hace: 'HACE 1 HORA',
    tipo: 'SUGERENCIA',
    cuerpo: 'Tomar Av. Miraflores a las 7:30 AM evita el tráfico de España.',
    utiles: 28,
    comentarios: 5,
    utilMarcado: false,
    avatarColor: Colors.tertiaryContainer,
    avatarForeground: Colors.onTertiaryContainer,
  },
];

const RUTAS_SEGURAS: RutaSegura[] = [
  {
    id: 0,
    titulo: 'Zona Segura: Óvalo Papal',
    descripcion: 'Patrullaje activo y alta iluminación hasta las 11:00 PM.',
    icono: 'moon',
    iconoBg: Colors.tertiary,
    iconoFg: Colors.onTertiary,
    accent: Colors.tertiary,
  },
  {
    id: 1,
    titulo: 'Paradero UTP (Entrada)',
    descripcion: 'Monitoreo por cámaras de seguridad municipal.',
    icono: 'eye',
    iconoBg: Colors.secondary,
    iconoFg: Colors.onSecondary,
    accent: null,
  },
];

export default function SeguridadView() {
  const router = useRouter();
  const [showReportarSheet, setShowReportarSheet] = useState(false);
  const [showLlamarAlert, setShowLlamarAlert] = useState(false);
  const [selectedReporte, setSelectedReporte] = useState<ReporteComunidad | null>(null);
  const [selectedRutaIndex, setSelectedRutaIndex] = useState<number | null>(null);

  const saludoDinamico = useMemo(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Buenos días';
    if (h >= 12 && h < 19) return 'Buenas tardes';
    return 'Buenas noches';
  }, []);

  const fechaActual = useMemo(() => {
    const f = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const es: any = { ...options };
    return f.toLocaleDateString('es-PE', es);
  }, []);

  return (
    <View style={styles.container}>
      <TopAppBar
        leading="menu"
        title="Seguridad"
        titleColor={Colors.appPrimary}
        trailingIcon="warning"
        trailingAction={() => setShowReportarSheet(true)}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryBar}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.summaryText, { color: Colors.onSurface }]}>
              Alertas hoy: <Text style={{ fontWeight: '600' }}>2</Text>
            </Text>
            <Text style={[styles.summaryText, { color: Colors.onSurface }]}>
              Paraderos iluminados: <Text style={{ fontWeight: '600' }}>24</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowLlamarAlert(true)}
            style={[styles.llamarButton, { backgroundColor: Colors.surfaceContainerHigh }]}
          >
            <Text style={[styles.llamarText, { color: Colors.onSurface }]}>Llamar 105</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 28, paddingHorizontal: 20, paddingTop: 16 }}>
          <View style={[styles.greetingCard, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <View style={[styles.greetingIcon, { backgroundColor: Colors.tertiary + '1A' }]}>
              <Ionicons name="calendar" size={22} color={Colors.tertiary} />
            </View>
            <View>
              <Text style={[styles.greetingTitle, { color: Colors.onSurface }]}>{saludoDinamico}</Text>
              <Text style={[styles.greetingDate, { color: Colors.onSurfaceVariant }]}>{fechaActual}</Text>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={[styles.sectionTitle, { color: Colors.onSurface }]}>Lugares Guardados</Text>
              <TouchableOpacity onPress={() => router.navigate('guardado')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Ionicons name="pencil" size={14} color={Colors.onSurfaceVariant} />
                  <Text style={[styles.editText, { color: Colors.onSurfaceVariant }]}>EDITAR</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                onPress={() => router.navigate('guardado')}
                style={[styles.lugarTile, { backgroundColor: Colors.surfaceContainerLowest }]}
              >
                <View style={[styles.lugarTileIcon, { backgroundColor: Colors.primaryContainer + '1A' }]}>
                  <Ionicons name="home" size={22} color={Colors.appPrimary} />
                </View>
                <Text style={[styles.lugarTileLabel, { color: Colors.onSurface }]}>Casa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.navigate('mapaPrincipal')}
                style={[styles.lugarTile, { backgroundColor: Colors.surfaceContainerLowest }]}
              >
                <View style={[styles.lugarTileIcon, { backgroundColor: Colors.appPrimary }]}>
                  <Ionicons name="school" size={22} color={Colors.onPrimary} />
                </View>
                <Text style={[styles.lugarTileLabel, { color: Colors.onSurface }]}>UTP Trujillo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.navigate('guardado')}
                style={[styles.lugarTile, { backgroundColor: Colors.surfaceContainerLowest }]}
              >
                <View style={[styles.lugarTileIconDashed, { borderColor: Colors.outline + '66' }]}>
                  <Ionicons name="add" size={22} color={Colors.outline} />
                </View>
                <Text style={[styles.lugarTileLabel, { color: Colors.onSurface }]}>Añadir</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="shield" size={20} color={Colors.tertiary} />
              <Text style={[styles.sectionTitle, { color: Colors.onSurface }]}>Rutas Seguras Hoy</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.navigate('mapaPrincipal')}
              style={styles.rutaSeguraMapCard}
            >
              <LinearGradient
                colors={[Colors.tertiary + 'A6', Colors.secondary + '73']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <View style={{ flex: 1 }}>
                <View style={{ height: 192, position: 'relative' }}>
                  <View style={StyleSheet.absoluteFill}>
                    <MapView
                      style={StyleSheet.absoluteFill}
                      provider="google"
                      region={{
                        latitude: -8.1116,
                        longitude: -79.0287,
                        latitudeDelta: 0.035,
                        longitudeDelta: 0.035,
                      }}
                      scrollEnabled={false}
                      zoomEnabled={false}
                    >
                      <Polyline
                        coordinates={[
                          { latitude: -8.1090, longitude: -79.0270 },
                          { latitude: -8.1070, longitude: -79.0250 },
                          { latitude: -8.1050, longitude: -79.0230 },
                          { latitude: -8.1030, longitude: -79.0210 },
                          { latitude: -8.1010, longitude: -79.0200 },
                        ]}
                        strokeColor={Colors.tertiaryFixedDim}
                        strokeWidth={3}
                        lineCap="round"
                      />
                    </MapView>
                  </View>
                </View>
              </View>
              <View style={[styles.rutaSeguraBadge, { backgroundColor: 'rgba(255,255,255,0.85)' }]}>
                <Ionicons name="bulb" size={16} color={Colors.tertiary} />
                <Text style={[styles.rutaSeguraBadgeText, { color: Colors.onSurface }]}>Paraderos iluminados activos: 24</Text>
              </View>
            </TouchableOpacity>

            <View style={{ gap: 12 }}>
              {RUTAS_SEGURAS.map((ruta) => (
                <TouchableOpacity
                  key={ruta.id}
                  onPress={() => setSelectedRutaIndex(ruta.id)}
                  style={[styles.rutaSeguraRow, { backgroundColor: Colors.surfaceContainerLowest }]}
                >
                  {ruta.accent && <View style={[styles.rutaSeguraAccent, { backgroundColor: ruta.accent }]} />}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 14 }}>
                    <View style={[styles.rutaSeguraIcon, { backgroundColor: ruta.iconoBg }]}>
                      <Ionicons name={ruta.icono as any} size={18} color={ruta.iconoFg} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.rutaSeguraTitulo, { color: Colors.onSurface }]}>{ruta.titulo}</Text>
                      <Text style={[styles.rutaSeguraDesc, { color: Colors.onSurfaceVariant }]}>{ruta.descripcion}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={14} color={Colors.onSurfaceVariant} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="people" size={20} color={Colors.appPrimary} />
                <Text style={[styles.sectionTitle, { color: Colors.onSurface }]}>Comunidad</Text>
              </View>
              <TouchableOpacity onPress={() => setShowReportarSheet(true)}>
                <Text style={[styles.addReportText, { color: Colors.appPrimary }]}>AÑADIR</Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 12 }}>
              {REPORTES.map((reporte) => (
                <TouchableOpacity
                  key={reporte.id}
                  onPress={() => setSelectedReporte(reporte)}
                  style={[styles.reporteCard, { backgroundColor: Colors.surfaceContainerLowest }]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <View style={[styles.reporteAvatar, { backgroundColor: reporte.avatarColor }]}>
                      <Text style={[styles.reporteAvatarText, { color: reporte.avatarForeground }]}>
                        {reporte.iniciales}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.reporteNombre, { color: Colors.onSurface }]}>{reporte.nombre}</Text>
                      <Text style={[styles.reporteHace, { color: Colors.onSurfaceVariant }]}>{reporte.hace}</Text>
                    </View>
                    <View style={[styles.reporteTipoBadge, { backgroundColor: getTipoBg(reporte.tipo) }]}>
                      <Text style={[styles.reporteTipoText, { color: getTipoFg(reporte.tipo) }]}>
                        {reporte.tipo}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.reporteCuerpo, { color: Colors.onSurface }]}>{reporte.cuerpo}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Ionicons
                        name={reporte.utilMarcado ? 'thumbs-up' : 'thumbs-up-outline'}
                        size={14}
                        color={reporte.utilMarcado ? Colors.appPrimary : Colors.onSurfaceVariant}
                      />
                      <Text style={[styles.reporteMeta, { color: Colors.onSurfaceVariant }]}>
                        Útil ({reporte.utiles})
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Ionicons name="chatbubble-outline" size={14} color={Colors.onSurfaceVariant} />
                      <Text style={[styles.reporteMeta, { color: Colors.onSurfaceVariant }]}>
                        {reporte.comentarios}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <Ionicons name="chevron-forward" size={14} color={Colors.onSurfaceVariant} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar />

      {showReportarSheet && (
        <Modal visible transparent animationType="slide">
          <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setShowReportarSheet(false)} />
          <View style={[styles.reportSheet, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <Text style={[styles.reportSheetTitle, { color: Colors.onSurface }]}>Reportar incidente</Text>
            <Text style={[styles.reportSheetLabel, { color: Colors.onSurfaceVariant }]}>TIPO DE REPORTE</Text>
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
            <Text style={[styles.reportSheetLabel, { color: Colors.onSurfaceVariant }]}>DESCRIPCIÓN</Text>
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
                Alert.alert('Reporte enviado', 'Gracias por colaborar con la comunidad.');
              }}
            >
              <Text style={[styles.submitText, { color: Colors.onPrimary }]}>Enviar reporte</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {selectedReporte && (
        <Modal visible transparent animationType="slide">
          <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setSelectedReporte(null)} />
          <View style={[styles.reporteDetailSheet, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <View style={{ padding: 20, gap: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={[styles.reporteAvatar, { backgroundColor: selectedReporte.avatarColor, width: 48, height: 48 }]}>
                  <Text style={[styles.reporteAvatarText, { color: selectedReporte.avatarForeground, fontSize: 16 }]}>
                    {selectedReporte.iniciales}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.reporteNombre, { color: Colors.onSurface, fontSize: 16 }]}>{selectedReporte.nombre}</Text>
                  <Text style={[styles.reporteHace, { color: Colors.onSurfaceVariant }]}>{selectedReporte.hace}</Text>
                </View>
                <View style={[styles.reporteTipoBadge, { backgroundColor: getTipoBg(selectedReporte.tipo) }]}>
                  <Text style={[styles.reporteTipoText, { color: getTipoFg(selectedReporte.tipo) }]}>
                    {selectedReporte.tipo}
                  </Text>
                </View>
              </View>
              <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: Colors.outlineVariant, opacity: 0.25 }} />
              <Text style={[styles.reporteCuerpo, { color: Colors.onSurface, fontSize: 18 }]}>{selectedReporte.cuerpo}</Text>
              <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: Colors.outlineVariant, opacity: 0.25 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons
                    name={selectedReporte.utilMarcado ? 'thumbs-up' : 'thumbs-up-outline'}
                    size={16}
                    color={selectedReporte.utilMarcado ? Colors.appPrimary : Colors.onSurfaceVariant}
                  />
                  <Text style={[styles.reporteMeta, { color: Colors.onSurfaceVariant, fontSize: 16 }]}>
                    Útil ({selectedReporte.utiles})
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="chatbubble-outline" size={16} color={Colors.onSurfaceVariant} />
                  <Text style={[styles.reporteMeta, { color: Colors.onSurfaceVariant, fontSize: 16 }]}>
                    {selectedReporte.comentarios}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedReporte(null)}
                style={[styles.submitButton, { backgroundColor: Colors.appPrimary }]}
              >
                <Text style={[styles.submitText, { color: Colors.onPrimary }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <Modal visible={selectedRutaIndex !== null} transparent animationType="fade">
        <View style={styles.alertOverlay}>
          <View style={[styles.alertContent, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <Text style={[styles.alertTitle, { color: Colors.onSurface }]}>
              {selectedRutaIndex !== null ? RUTAS_SEGURAS[selectedRutaIndex]?.titulo : ''}
            </Text>
            <Text style={[styles.alertMessage, { color: Colors.onSurface }]}>
              {selectedRutaIndex !== null ? RUTAS_SEGURAS[selectedRutaIndex]?.descripcion : ''}
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedRutaIndex(null);
                  router.navigate('mapaPrincipal');
                }}
                style={[styles.alertButton, { backgroundColor: Colors.appPrimary }]}
              >
                <Text style={[styles.alertButtonText, { color: Colors.onPrimary }]}>Ver en mapa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedRutaIndex(null)}
                style={[styles.alertCancelButton, { borderColor: Colors.outlineVariant }]}
              >
                <Text style={[styles.alertCancelText, { color: Colors.onSurfaceVariant }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getTipoBg(tipo: TipoReporte): string {
  switch (tipo) {
    case 'ALERTA': return Colors.errorContainer;
    case 'TRÁFICO': return Colors.secondaryContainer;
    case 'SUGERENCIA': return Colors.tertiaryContainer;
    default: return Colors.surfaceContainerHigh;
  }
}

function getTipoFg(tipo: TipoReporte): string {
  switch (tipo) {
    case 'ALERTA': return Colors.onErrorContainer;
    case 'TRÁFICO': return Colors.onSecondaryContainer;
    case 'SUGERENCIA': return Colors.onTertiaryContainer;
    default: return Colors.onSurfaceVariant;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.appBackground },
  scrollContent: { paddingBottom: 80 },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainer,
  },
  summaryText: {
    fontSize: Typography.bodySmMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySmMedium.fontWeight,
  },
  llamarButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  llamarText: {
    fontSize: Typography.bodyXsMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyXsMedium.fontWeight,
  },
  greetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  greetingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingTitle: {
    fontSize: Typography.headlineBody.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineBody.fontWeight,
  },
  greetingDate: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  sectionTitle: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  editText: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  lugarTile: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  lugarTileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lugarTileIconDashed: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  lugarTileLabel: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
    textAlign: 'center',
  },
  rutaSeguraMapCard: {
    height: 192,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  rutaSeguraBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  rutaSeguraBadgeText: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  rutaSeguraRow: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  rutaSeguraAccent: {
    width: 4,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  rutaSeguraIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rutaSeguraTitulo: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  rutaSeguraDesc: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  addReportText: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  reporteCard: {
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  reporteAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reporteAvatarText: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  reporteNombre: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  reporteHace: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  reporteTipoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  reporteTipoText: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  reporteCuerpo: {
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMd.fontWeight,
  },
  reporteMeta: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000AA',
  },
  reportSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 16,
    maxHeight: '70%',
  },
  reportSheetTitle: {
    fontSize: Typography.headlineMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineMd.fontWeight,
  },
  reportSheetLabel: {
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
  reporteDetailSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    flex: 1,
  },
  alertButtonText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  alertCancelButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
  },
  alertCancelText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
});
