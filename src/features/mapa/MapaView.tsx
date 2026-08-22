/**
 * =============================================================================
 * MAPA VIEW — Pantalla principal con mapa y transporte en tiempo real
 * =============================================================================
 *
 * PROPÓSITO:
 * Pantalla central de la app que muestra un mapa con marcadores (UTP, usuario,
 * buses simulados), barra de búsqueda, chips de destinos y lista de buses cercanos.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Mapa interactivo: react-native-maps con proveedor Google.
 * - Marcadores custom: UTP (rojo), usuario (azul), buses (con número de línea).
 * - Simulación de buses: se mueven en intervalos regulares (50ms).
 * - Búsqueda: campo de texto con botón de limpiar y chips de acceso rápido.
 * - Drawer: menú lateral con opciones de navegación y cerrar sesión.
 * - Modales: reportar incidente y confirmación de envío.
 *
 * ESTRUCTURA:
 * 1. Mapa de fondo (Google Maps)
 * 2. UI overlay (barra de búsqueda, chips)
 * 3. Panel inferior (botón reportar, buses cercanos)
 * 4. Drawer modal (menú lateral)
 * 5. Modales (reportar, confirmación)
 */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '@/shared/constants';
import { BusCard, BottomNavBar, TopAppBar } from '@/shared/components';
import { MapaService } from '@/features/mapa/services/MapaService';
import { useMapaViewModel } from '@/features/mapa/viewmodels/useMapaViewModel';
import { styles } from '@/features/mapa/styles';

const DESTINOS = MapaService.getDestinos();
const RUTAS_OPCIONES = MapaService.getRutasOpciones();

export function MapaView({ viewModel }: { viewModel: ReturnType<typeof useMapaViewModel> }) {
  const {
    mostrarDrawer,
    setMostrarDrawer,
    showReportarSheet,
    setShowReportarSheet,
    showReportSuccess,
    setShowReportSuccess,
    textoBusqueda,
    setTextoBusqueda,
    destinoSeleccionado,
    region,
    setRegion,
    buses,
    campoEnfocado,
    setCampoEnfocado,
    seleccionarDestino,
    buscarTexto,
    limpiar,
    chipActivo,
    router,
  } = viewModel;

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider="google"
        region={region}
        onRegionChangeComplete={setRegion}
      >
        <Marker coordinate={MapaService.getUTPMarker()} title="UTP Trujillo">
          <View style={styles.utpMarker}>
            <Text style={styles.utpLabel}>UTP Trujillo</Text>
            <View style={[styles.utpCircle, { backgroundColor: Colors.appPrimary }]}>
              <Ionicons name="school" size={16} color={Colors.onPrimary} />
            </View>
          </View>
        </Marker>
        <Marker coordinate={MapaService.getUserMarker()}>
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
