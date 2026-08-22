/**
 * =============================================================================
 * PANTALLA DE GUARDADO — Lugares y líneas favoritas del usuario
 * =============================================================================
 *
 * PROPÓSITO:
 * Permite al usuario gestionar sus lugares guardados (casa, trabajo, etc.)
 * y sus líneas de transporte favoritas. Incluye tabs para alternar entre ambas vistas.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Spread de viewModel: {...viewModel} pasa todas las props directamente.
 * - GuardadoView recibe props individuales en vez del objeto viewModel.
 * - Tabs: alterna entre "Lugares" y "Líneas" con estado local.
 */
import { useGuardadoViewModel } from '@/features/guardado/viewmodels/useGuardadoViewModel';
import GuardadoView from '@/features/guardado/GuardadoView';

export default function GuardadoScreen() {
  const viewModel = useGuardadoViewModel();
  return <GuardadoView {...viewModel} />;
}
