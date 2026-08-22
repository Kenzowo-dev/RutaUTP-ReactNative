/**
 * =============================================================================
 * PANTALLA DE RUTAS — Lista y detalle de rutas de transporte
 * =============================================================================
 *
 * PROPÓSITO:
 * Muestra las rutas de transporte público disponibles y permite ver el detalle
 * de cada una (mapa de la ruta, estadísticas, instrucciones paso a paso).
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Navegación maestro-detalle: lista de rutas → detalle con navegación simulada.
 * - useRutasViewModel: controla la selección de ruta y estado de navegación.
 * - Navegación CarPlay: modal que simula navegación paso a paso con progreso.
 */
import { useRutasViewModel } from '@/features/rutas/viewmodels/useRutasViewModel';
import RutasView from '@/features/rutas/RutasView';

export default function RutasScreen() {
  const viewModel = useRutasViewModel();
  return <RutasView viewModel={viewModel} />;
}
