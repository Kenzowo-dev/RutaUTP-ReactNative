/**
 * =============================================================================
 * PANTALLA DE MAPA — Vista principal con transporte en tiempo real
 * =============================================================================
 *
 * PROPÓSITO:
 * Pantalla central de la app que muestra un mapa interactivo con la ubicación
 * del usuario, la UTP, y los buses simulados en tiempo real. Incluye búsqueda
 * de destinos, chips de acceso rápido y lista de buses cercanos.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Patrón pantalla-delgada: el archivo solo conecta ViewModel con View.
 * - useMapaViewModel: maneja todo el estado del mapa (búsqueda, buses, región).
 * - Mapa interactivo: react-native-maps con proveedor Google.
 * - Simulación de buses: setInterval mueve buses en coordenadas aleatorias.
 */
import { useMapaViewModel } from '@/features/mapa/viewmodels/useMapaViewModel';
import { MapaView } from '@/features/mapa/MapaView';

export default function MapaScreen() {
  const viewModel = useMapaViewModel();
  return <MapaView viewModel={viewModel} />;
}
