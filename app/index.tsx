/**
 * =============================================================================
 * PANTALLA DE BIENVENIDA — Punto de entrada a la app
 * =============================================================================
 *
 * PROPÓSITO:
 * Pantalla de onboarding que muestra al usuario las características principales
 * de la app antes de navegar al mapa. Incluye un CTA "Comenzar" y términos de servicio.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Pantalla delgada (thin screen): solo instancia el ViewModel y renderiza la View.
 * - Separación MVVM: la lógica de estado está en useBienvenidaViewModel,
 *   la presentación en BienvenidaView.
 * - Primer contacto: el usuario ve un resumen de seguridad y ahorro antes de usar la app.
 */
import { useBienvenidaViewModel } from '@/features/bienvenida/viewmodels/useBienvenidaViewModel';
import BienvenidaView from '@/features/bienvenida/BienvenidaView';

export default function BienvenidaScreen() {
  const viewModel = useBienvenidaViewModel();
  return <BienvenidaView viewModel={viewModel} />;
}
