/**
 * =============================================================================
 * RUTAS VIEW — Pantalla de rutas de transporte y navegación
 * =============================================================================
 *
 * PROPÓSITO:
 * Muestra la lista de rutas disponibles y el detalle de cada una con mapa,
 * estadísticas e instrucciones paso a paso. Incluye navegación simulada tipo CarPlay.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Maestro-detalle: lista de rutas → detalle con polilínea en el mapa.
 * - Navegación CarPlay: modal que simula indicaciones de voz con progreso.
 * - Componentes internos: DetalleRutaView, PasoRow, CarPlayView definidos
 *   como funciones auxiliares dentro del mismo archivo (scope limitado).
 *
 * ESTRUCTURA:
 * 1. Vista lista: mapa estático + cards de rutas
 * 2. Vista detalle: mapa con polilínea + stats + pasos + CTA navegación
 * 3. CarPlay: navegación simulada con instrucciones que avanzan cada 4s
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, AppTracking } from '@/shared/constants';
import { RutaOpcion } from '@/shared/types';
import StatTile from '@/shared/components/StatTile';
import BottomNavBar from '@/shared/components/BottomNavBar';
import TopAppBar from '@/shared/components/TopAppBar';
import { useRutasViewModel } from '@/features/rutas/viewmodels/useRutasViewModel';
import { RutasService } from '@/features/rutas/services/RutasService';
import { styles } from './styles';

const RUTAS = RutasService.getRutas();
const COORDENADAS_LINEAS = RutasService.getCoordenadasLineas();

interface RutasViewProps {
  viewModel: ReturnType<typeof useRutasViewModel>;
}

export default function RutasView({ viewModel }: RutasViewProps) {
  const { rutaSeleccionada, onSelectRuta, onBack, showNav, onStartNav, onFinishNav } = viewModel;

  return (
    <View style={styles.container}>
      {rutaSeleccionada ? (
        <DetalleRutaView ruta={rutaSeleccionada} onBack={onBack} showNav={showNav} onStartNav={onStartNav} onFinishNav={onFinishNav} />
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
                  onPress={() => onSelectRuta(ruta)}
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

function DetalleRutaView({ ruta, onBack, showNav, onStartNav, onFinishNav }: { ruta: RutaOpcion; onBack: () => void; showNav: boolean; onStartNav: () => void; onFinishNav: () => void }) {
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
            onPress={onStartNav}
            style={[styles.ctaButton, { backgroundColor: Colors.primaryContainer }]}
          >
            <Ionicons name="navigate" size={22} color={Colors.onPrimaryContainer} />
            <Text style={[styles.ctaText, { color: Colors.onPrimaryContainer }]}>Iniciar Navegación</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showNav} animationType="slide">
        <CarPlayView rutaNombre={`Ruta ${ruta.linea} - ${ruta.empresa}`} onFinish={onFinishNav} />
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

function CarPlayView({ rutaNombre, onFinish }: { rutaNombre: string; onFinish: () => void }) {
  const [instructionIndex, setInstructionIndex] = useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const instrucciones = RutasService.getCarInstrucciones();

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
    <View style={styles.carContainer}>
      <View style={[styles.carTopBar, { backgroundColor: Colors.appPrimary }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.carNavLabel}>NAVEGANDO</Text>
          <Text style={styles.carRutaNombre}>{rutaNombre}</Text>
        </View>
        <TouchableOpacity onPress={onFinish} style={styles.carFinishButton}>
          <Ionicons name="close" size={12} color={Colors.onPrimary} />
          <Text style={styles.carFinishText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.carMapContainer}>
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
            <View style={[styles.carMarkerDot, { backgroundColor: Colors.appPrimary }]}>
              <Ionicons name="school" size={12} color={Colors.onPrimary} />
            </View>
          </Marker>
        </MapView>
      </View>
      <View style={[styles.carBottomPanel, { backgroundColor: '#1a1a1a' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={[styles.carInstructionIcon, { backgroundColor: Colors.appPrimary + '33' }]}>
            <Ionicons name={actual.icono as any} size={26} color={Colors.appPrimary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.carInstructionText} numberOfLines={2}>
              {actual.texto}
            </Text>
            {actual.distancia ? (
              <Text style={styles.carInstructionDist}>{actual.distancia}</Text>
            ) : null}
          </View>
        </View>
        <View style={{ paddingVertical: 4 }}>
          <View style={styles.carProgressTrack}>
            <View style={[styles.carProgressFill, { width: `${progreso * 100}%`, backgroundColor: Colors.appPrimary }]} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.carMetaLabel}>TIEMPO</Text>
            <Text style={styles.carMetaValue}>{tiempoRestante}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.carMetaLabel}>DISTANCIA</Text>
            <Text style={styles.carMetaValue}>{distanciaRestante}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
