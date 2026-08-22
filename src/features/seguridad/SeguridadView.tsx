/**
 * =============================================================================
 * SEGURIDAD VIEW — Pantalla de reportes y rutas seguras
 * =============================================================================
 *
 * PROPÓSITO:
 * Centraliza la información de seguridad: reportes comunitarios, rutas seguras
 * con monitoreo, y acceso a emergencias (llamada al 105).
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Feed de reportes: cards con avatar, tipo, votos y comentarios.
 * - Rutas seguras: lista con iconos y descripciones de zonas monitoreadas.
 * - Mini mapa: mapa estático con polilínea de ruta segura.
 * - Saludo dinámico: cambia según hora del día.
 * - Modales: reportar incidente, detalle de reporte, detalle de ruta segura.
 *
 * ESTRUCTURA:
 * 1. Summary bar (alertas hoy, paraderos iluminados, botón llamar 105)
 * 2. Greeting card (saludo dinámico + fecha)
 * 3. Lugares guardados (tiles: Casa, UTP, Añadir)
 * 4. Rutas seguras hoy (mapa + lista de rutas)
 * 5. Comunidad (feed de reportes)
 * 6. Modales (reportar, detalle reporte, detalle ruta)
 */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/shared/constants';
import { ReporteComunidad, RutaSegura, TipoReporte } from '@/shared/types';
import BottomNavBar from '@/shared/components/BottomNavBar';
import TopAppBar from '@/shared/components/TopAppBar';
import { SeguridadViewModelReturn } from './viewmodels/useSeguridadViewModel';
import { SeguridadService } from './services/SeguridadService';
import { styles } from './styles';

const REPORTES = SeguridadService.getReportes();
const RUTAS_SEGURAS = SeguridadService.getRutasSeguras();

interface SeguridadViewProps {
  viewModel: SeguridadViewModelReturn;
}

export function SeguridadView({ viewModel }: SeguridadViewProps) {
  const {
    showReportarSheet,
    setShowReportarSheet,
    showLlamarAlert,
    setShowLlamarAlert,
    selectedReporte,
    setSelectedReporte,
    selectedRutaIndex,
    setSelectedRutaIndex,
    saludoDinamico,
    fechaActual,
    getTipoBg,
    getTipoFg,
    router,
  } = viewModel;

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
