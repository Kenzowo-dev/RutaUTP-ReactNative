import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Colors, Typography, Spacing, AppTracking } from '../constants';
import { useRouter } from '../hooks/useRouter';
import { LugarGuardado, CategoriaLugar, LineaGuardada } from '../types';
import BottomNavBar from '../components/BottomNavBar';
import TopAppBar from '../components/TopAppBar';

type Tab = 'lugares' | 'lineas';

const LINEAS: LineaGuardada[] = [
  {
    id: 'B',
    letra: 'B',
    nombre: 'Línea B — Empresa Salaverry',
    recorrido: 'Salaverry → UTP → Centro',
    tiempoEstimado: '~4 min',
    color: Colors.tertiary,
  },
  {
    id: '7',
    letra: '7',
    nombre: 'Línea 7 — El Esfuerzo',
    recorrido: 'Huanchaco → Centro → La Esperanza',
    tiempoEstimado: '~12 min',
    color: Colors.tertiary,
  },
  {
    id: 'C',
    letra: 'C',
    nombre: 'Línea C — Trans Moche',
    recorrido: 'Moche → Av. España → Plaza Mayor',
    tiempoEstimado: '~20 min',
    color: Colors.onSurfaceVariant,
  },
];

const SAMPLE_LUGARES: LugarGuardado[] = [
  { id: '1', nombre: 'UTP', direccion: 'Av. España 123, Trujillo', categoria: 'Universidad', esFrecuente: true, colorBadge: Colors.appPrimary },
  { id: '2', nombre: 'Casa', direccion: 'Urb. El Recreo, Trujillo', categoria: 'Hogar', esFrecuente: false, colorBadge: Colors.appPrimary },
  { id: '3', nombre: 'Centro Comercial', direccion: 'Mall Plaza Trujillo', categoria: 'Tienda', esFrecuente: false, colorBadge: Colors.appPrimary },
  { id: '4', nombre: 'Pastelería Dulce Lima', direccion: 'Av. Larco 456', categoria: 'Restaurante', esFrecuente: false, colorBadge: Colors.appPrimary },
  { id: '5', nombre: 'Plaza de Armas', direccion: 'Centro Histórico', categoria: 'Plaza', esFrecuente: false, colorBadge: Colors.appPrimary },
  { id: '6', nombre: 'Playa Huanchaco', direccion: 'Malecón Huanchaco', categoria: 'Playa', esFrecuente: false, colorBadge: Colors.appPrimary },
];

export default function GuardadoView() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<Tab>('lugares');
  const [lugares, setLugares] = useState<LugarGuardado[]>(SAMPLE_LUGARES);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [selectedLugar, setSelectedLugar] = useState<LugarGuardado | null>(null);
  const [selectedLinea, setSelectedLinea] = useState<LineaGuardada | null>(null);

  return (
    <View style={styles.container}>
      <TopAppBar
        leading="menu"
        title="Guardado"
        titleColor={Colors.appPrimary}
        trailingIcon="add"
        trailingAction={() => setShowAddSheet(true)}
      />

      <View style={styles.tabsContainer}>
        {(['lugares', 'lineas'] as Tab[]).map((tab) => (
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
                    onPress={() => setSelectedLugar(lugar)}
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
            {LINEAS.map((linea) => (
              <TouchableOpacity
                key={linea.id}
                onPress={() => setSelectedLinea(linea)}
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
                  onPress={() => {
                    setLugares((prev) => prev.filter((l) => l.id !== selectedLugar.id));
                    setSelectedLugar(null);
                  }}
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
              <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: Colors.outlineVariant, opacity: 0.25 }} />
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

function getCategoriaIcon(categoria: CategoriaLugar): string {
  switch (categoria) {
    case 'Universidad': return 'school';
    case 'Hogar': return 'home';
    case 'Tienda': return 'storefront';
    case 'Restaurante': return 'restaurant';
    case 'Plaza': return 'business';
    case 'Playa': return 'water';
    default: return 'location';
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.appBackground },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.appSurface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.outlineVariant,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabLabel: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  tabUnderline: {
    height: 2,
    width: '100%',
    marginTop: 6,
  },
  scrollContent: { paddingBottom: 80 },
  lugaresSection: { paddingHorizontal: 20, paddingTop: 8, gap: 12 },
  lugaresHint: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 14,
  },
  emptyTitle: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  emptySubtitle: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  lugarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  lugarIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lugarNombre: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  lugarDireccion: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  frecuenteBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  frecuenteText: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  lineasSection: { paddingHorizontal: 20, paddingTop: 8, gap: 12 },
  lineaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  lineaIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineaIconText: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  lineaNombre: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  lineaRecorrido: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  lineaTiempoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  lineaTiempoText: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
    color: Colors.onPrimary,
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000AA',
  },
  addSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 12,
    maxHeight: '70%',
  },
  addSheetTitle: {
    fontSize: Typography.headlineMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineMd.fontWeight,
  },
  addSheetLabel: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  addInput: {
    borderRadius: 12,
    padding: 12,
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 12,
  },
  addSaveButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addSaveText: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  lugarDetailSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lugarMapContainer: {
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  lugarMapMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.onPrimary,
  },
  lugarDetailIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lugarDetailNombre: {
    fontSize: Typography.headlineMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineMd.fontWeight,
  },
  lugarDetailDireccion: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  lugarActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 12,
  },
  lugarActionText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
  lineaDetailSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineaDetailIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineaDetailText: {
    fontSize: Typography.displayNumberMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayNumberMd.fontWeight,
  },
  lineaDetailNombre: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  lineaDetailTiempo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  lineaDetailTiempoText: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  lineaDetailLabel: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  lineaDetailValue: {
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMd.fontWeight,
  },
  paradaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paradaText: {
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMd.fontWeight,
  },
  lineaActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 12,
  },
  lineaActionText: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  lineaCancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  lineaCancelText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
});
