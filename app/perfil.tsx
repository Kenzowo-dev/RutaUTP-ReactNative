/**
 * =============================================================================
 * PANTALLA DE PERFIL — Datos del usuario, billetera y preferencias
 * =============================================================================
 *
 * PROPÓSITO:
 * Muestra y permite editar el perfil del usuario: nombre, notificaciones,
 * ubicación, modo económico, método de pago y verificación de carnet.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Hero con gradiente: encabezado visual con avatar, nombre y badges.
 * - Billetera: acceso a tarjeta de pago y escáner de carnet universitario.
 * - Preferencias: toggles para configuraciones de la app.
 * - Verificación: flujo de escaneo de carnet con cámara (CarnetScannerView).
 */
import { usePerfilViewModel } from '@/features/perfil/viewmodels/usePerfilViewModel';
import PerfilView from '@/features/perfil/PerfilView';

export default function PerfilScreen() {
  const viewModel = usePerfilViewModel();
  return <PerfilView viewModel={viewModel} />;
}
