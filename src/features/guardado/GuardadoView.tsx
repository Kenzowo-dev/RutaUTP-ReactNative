/**
 * =============================================================================
 * GUARDADO VIEW — Pantalla de lugares y líneas guardadas
 * =============================================================================
 *
 * PROPÓSITO:
 * Permite al usuario gestionar sus lugares favoritos y líneas de transporte
 * guardadas. Incluye tabs para alternar entre ambas vistas.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Tabs: "Lugares" y "Líneas" con subrayado dinámico.
 * - Empty state: mensaje cuando no hay lugares guardados.
 * - Modales: agregar lugar, detalle de lugar, detalle de línea.
 * - Mapa en detalle: mini mapa con marcador del lugar seleccionado.
 *
 * ESTRUCTURA:
 * 1. TopAppBar (con botón + para añadir)
 * 2. Tabs (Lugares / Líneas)
 * 3. Lista de cards con navegación a detalle
 * 4. Modales (agregar, detalle lugar, detalle línea)
 */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '@/shared/constants';
import { LugarGuardado, LineaGuardada, CategoriaLugar } from '@/shared/types';
import { TopAppBar, BottomNavBar } from '@/shared/components';
import { styles } from './styles';

import { AppScreen } from '@/shared/types';

export interface GuardadoViewProps {
  selectedTab: 'lugares' | 'lineas';
  setSelectedTab: (tab: 'lugares' | 'lineas') => void;
  lugares: LugarGuardado[];
  showAddSheet: boolean;
  setShowAddSheet: (show: boolean) => void;
  selectedLugar: LugarGuardado | null;
  setSelectedLugar: (lugar: LugarGuardado | null) => void;
  selectedLinea: LineaGuardada | null;
  setSelectedLinea: (linea: LineaGuardada | null) => void;
  onAddPlace: () => void;
  onSelectLugar: (lugar: LugarGuardado) => void;
  onSelectLinea: (linea: LineaGuardada) => void;
  onDeleteLugar: () => void;
  router: { navigate: (screen: AppScreen) => void };
  lineas: LineaGuardada[];
  getCategoriaIcon: (categoria: CategoriaLugar) => string;
}

export default function GuardadoView({
  selectedTab,
  setSelectedTab,
  lugares,
  showAddSheet,
  setShowAddSheet,
  selectedLugar,
  setSelectedLugar,
  selectedLinea,
  setSelectedLinea,
  onAddPlace,
  onSelectLugar,
  onSelectLinea,
  onDeleteLugar,
  router,
  lineas,
  getCategoriaIcon,
}: GuardadoViewProps) {
  return (
    <View style={styles.container}>
      <TopAppBar
        leading="menu"
        title="Guardado"
        titleColor={Colors.appPrimary}
        trailingIcon="add"
        trailingAction={onAddPlace}
      />

      <View style={styles.tabsContainer}>
        {(['lugares', 'lineas'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabButton}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabLabel,
                {
                  color: selectedTab === tab ? Colors.appPrimary : Colors.onSurfaceVariant,
                },
              ]}
            >
              {tab === 'lugares' ? 'Lugares' : 'Líneas'}
            </Text>
            <View style={[styles.tabUnderline, { backgroundColor: selectedTab === tab ? Colors.appPrimary : 'transparent' }]} />
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {selectedTab === 'lugares' ? (
          <View style={styles.lugaresSection}>
            <Text style={[styles.lugaresHint, { color: Colors.onSurfaceVariant }]}>
              Toca un lugar para ver más opciones.
            </Text>
            {lugares.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="bookmark" size={48} color={Colors.onSurfaceVariant} style={{ opacity: 0.3 }} />
                <Text style={[styles.emptyTitle, { color: Colors.onSurface }]}>Aún no tienes lugares guardados</Text>
                <Text style={[styles.emptySubtitle, { color: Colors.onSurfaceVariant }]}>
                  Toca + Añadir para guardar tu primer lugar.
                </Text>
              </View>
            ) : (
              <View style={{ gap: 12 }}>
                {lugares.map((lugar) => (
                  <TouchableOpacity
                    key={lugar.id}
                    onPress={() => onSelectLugar(lugar)}
                    style={[styles.lugarCard, { backgroundColor: Colors.surfaceContainerLowest }]}
                  >
                    <View style={[styles.lugarIcon, { backgroundColor: lugar.nombre === 'UTP' ? Colors.appPrimary : Colors.primaryContainer + '26' }]}>
                      <Ionicons
                        name={getCategoriaIcon(lugar.categoria) as any}
                        size={22}
                        color={lugar.nombre === 'UTP' ? Colors.onPrimary : Colors.appPrimary}
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: 14 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={[styles.lugarNombre, { color: Colors.onSurface }]}>{lugar.nombre}</Text>
                        {lugar.esFrecuente && (
                          <View style={[styles.frecuenteBadge, { backgroundColor: Colors.tertiary }]}>
                            <Text style={[styles.frecuenteText, { color: Colors.onTertiary }]}>FRECUENTE</Text>
                          </View>
                        )}
                      </View>
                      <Text style={[styles.lugarDireccion, { color: Colors.onSurfaceVariant }]} numberOfLines={1}>
                        {lugar.direccion}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.onSurfaceVariant} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.lineasSection}>
            {lineas.map((linea) => (
              <TouchableOpacity
                key={linea.id}
                onPress={() => onSelectLinea(linea)}
                style={[styles.lineaCard, { backgroundColor: Colors.surfaceContainerLowest }]}
              >
                <View style={[styles.lineaIconCircle, { backgroundColor: Colors.primaryContainer }]}>
                  <Text style={[styles.lineaIconText, { color: Colors.onPrimaryContainer }]}>{linea.letra}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={[styles.lineaNombre, { color: Colors.onSurface }]}>{linea.nombre}</Text>
                  <Text style={[styles.lineaRecorrido, { color: Colors.onSurfaceVariant }]} numberOfLines={1}>
                    {linea.recorrido}
                  </Text>
                </View>
                <View style={[styles.lineaTiempoBadge, { backgroundColor: Colors.tertiary }]}>
                  <Text style={[styles.lineaTiempoText, { color: Colors.onTertiary }]}>{linea.tiempoEstimado}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNavBar />

      {showAddSheet && (
        <Modal visible transparent animationType="slide">
          <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setShowAddSheet(false)} />
          <View style={[styles.addSheet, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <Text style={[styles.addSheetTitle, { color: Colors.onSurface }]}>Guardar lugar</Text>
            <Text style={[styles.addSheetLabel, { color: Colors.onSurfaceVariant }]}>NOMBRE</Text>
            <TextInput
              style={[styles.addInput, { backgroundColor: Colors.surfaceContainerLow, color: Colors.onSurface }]}
              placeholder="Ej. Mi trabajo"
              placeholderTextColor={Colors.onSurfaceVariant}
            />
            <Text style={[styles.addSheetLabel, { color: Colors.onSurfaceVariant }]}>DIRECCIÓN</Text>
            <TextInput
              style={[styles.addInput, { backgroundColor: Colors.surfaceContainerLow, color: Colors.onSurface }]}
              placeholder="Ej. Av. España 123"
              placeholderTextColor={Colors.onSurfaceVariant}
            />
            <Text style={[styles.addSheetLabel, { color: Colors.onSurfaceVariant }]}>CATEGORÍA</Text>
            <View style={[styles.categoryRow, { backgroundColor: Colors.surfaceContainerLow }]}>
              <Text style={{ color: Colors.onSurface }}>Otro</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.onSurfaceVariant} />
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowAddSheet(false);
              }}
              style={[styles.addSaveButton, { backgroundColor: Colors.appPrimary }]}
            >
              <Text style={[styles.addSaveText, { color: Colors.onPrimary }]}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {selectedLugar && (
        <Modal visible transparent animationType="slide">
          <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setSelectedLugar(null)} />
          <View style={[styles.lugarDetailSheet, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <View style={styles.lugarMapContainer}>
                <MapView
                  style={StyleSheet.absoluteFill}
                provider="google"
                region={{
                  latitude: -8.1116,
                  longitude: -79.0289,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
              >
                <Marker coordinate={{ latitude: -8.1116, longitude: -79.0289 }}>
                  <View style={[styles.lugarMapMarker, { backgroundColor: Colors.appPrimary }]}>
                    <Ionicons name="location" size={16} color={Colors.onPrimary} />
                  </View>
                </Marker>
              </MapView>
            </View>
            <View style={{ padding: 20, gap: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <View style={[styles.lugarDetailIcon, { backgroundColor: selectedLugar.nombre === 'UTP' ? Colors.appPrimary : Colors.primaryContainer + '26' }]}>
                  <Ionicons
                    name={getCategoriaIcon(selectedLugar.categoria) as any}
                    size={28}
                    color={selectedLugar.nombre === 'UTP' ? Colors.onPrimary : Colors.appPrimary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={[styles.lugarDetailNombre, { color: Colors.onSurface }]}>{selectedLugar.nombre}</Text>
                    {selectedLugar.esFrecuente && (
                      <View style={[styles.frecuenteBadge, { backgroundColor: Colors.tertiary }]}>
                        <Text style={[styles.frecuenteText, { color: Colors.onTertiary }]}>FRECUENTE</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.lugarDetailDireccion, { color: Colors.onSurfaceVariant }]}>
                    {selectedLugar.direccion}
                  </Text>
                </View>
              </View>
              <View style={{ gap: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLugar(null);
                    router.navigate('mapaPrincipal');
                  }}
                  style={[styles.lugarActionButton, { backgroundColor: Colors.appPrimary }]}
                >
                  <Ionicons name="map" size={20} color={Colors.onPrimary} />
                  <Text style={[styles.lugarActionText, { color: Colors.onPrimary }]}>Ver ruta desde mi posición</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLugar(null);
                    router.navigate('rutas');
                  }}
                  style={[styles.lugarActionButton, { backgroundColor: Colors.primaryContainer }]}
                >
                  <Ionicons name="bus" size={20} color={Colors.onPrimaryContainer} />
                  <Text style={[styles.lugarActionText, { color: Colors.onPrimaryContainer }]}>Buscar transporte cercano</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onDeleteLugar}
                  style={[styles.lugarActionButton, { backgroundColor: Colors.errorContainer }]}
                >
                  <Ionicons name="trash" size={20} color={Colors.onErrorContainer} />
                  <Text style={[styles.lugarActionText, { color: Colors.onErrorContainer }]}>Eliminar de guardados</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {selectedLinea && (
        <Modal visible transparent animationType="slide">
          <TouchableOpacity style={styles.sheetBackdrop} activeOpacity={1} onPress={() => setSelectedLinea(null)} />
          <View style={[styles.lineaDetailSheet, { backgroundColor: Colors.surfaceContainerLowest }]}>
            <View style={{ padding: 20, gap: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <View style={[styles.lineaDetailIcon, { backgroundColor: Colors.primaryContainer }]}>
                  <Text style={[styles.lineaDetailText, { color: Colors.onPrimaryContainer }]}>{selectedLinea.letra}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.lineaDetailNombre, { color: Colors.onSurface }]}>{selectedLinea.nombre}</Text>
                  <View style={[styles.lineaDetailTiempo, { backgroundColor: Colors.tertiaryContainer }]}>
                    <Ionicons name="time" size={12} color={Colors.onTertiary} />
                    <Text style={[styles.lineaDetailTiempoText, { color: Colors.onTertiary }]}>{selectedLinea.tiempoEstimado}</Text>
                  </View>
                </View>
              </View>
              <View style={{ height: 1, backgroundColor: Colors.outlineVariant, opacity: 0.25 }} />
              <View style={{ gap: 12 }}>
                <Text style={[styles.lineaDetailLabel, { color: Colors.onSurfaceVariant }]}>RECORRIDO</Text>
                <Text style={[styles.lineaDetailValue, { color: Colors.onSurface }]}>{selectedLinea.recorrido}</Text>
              </View>
              <View style={{ gap: 12 }}>
                <Text style={[styles.lineaDetailLabel, { color: Colors.onSurfaceVariant }]}>PARADAS PRINCIPALES</Text>
                {['Av. España', 'Óvalo Papal', 'Plaza de Armas', 'UTP Trujillo'].map((parada, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={[styles.paradaDot, { backgroundColor: Colors.appPrimary }]} />
                    <Text style={[styles.paradaText, { color: Colors.onSurface }]}>{parada}</Text>
                  </View>
                ))}
              </View>
              <View style={{ gap: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLinea(null);
                    router.navigate('rutas');
                  }}
                  style={[styles.lineaActionButton, { backgroundColor: Colors.appPrimary }]}
                >
                  <Ionicons name="navigate" size={20} color={Colors.onPrimary} />
                  <Text style={[styles.lineaActionText, { color: Colors.onPrimary }]}>Ver ruta completa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedLinea(null)} style={styles.lineaCancelButton}>
                  <Text style={[styles.lineaCancelText, { color: Colors.onSurfaceVariant }]}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
