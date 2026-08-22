/**
 * =============================================================================
 * PANTALLA DE SEGURIDAD — Reportes comunitarios y rutas seguras
 * =============================================================================
 *
 * PROPÓSITO:
 * Centraliza la información de seguridad: reportes de la comunidad (alertas,
 * tráfico, sugerencias), rutas seguras con monitoreo y acceso a emergencias (105).
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Vista comunitaria: feed de reportes con sistema de votos y comentarios.
 * - Rutas seguras: muestra zonas con patrullaje e iluminación.
 * - Emergencia: acceso directo para llamar al 105 (policía en Perú).
 * - Saludo dinámico: cambia según hora del día (buenos días/tardes/noches).
 */
import { useSeguridadViewModel } from '@/features/seguridad/viewmodels/useSeguridadViewModel';
import { SeguridadView } from '@/features/seguridad/SeguridadView';

export default function SeguridadScreen() {
  const viewModel = useSeguridadViewModel();
  return <SeguridadView viewModel={viewModel} />;
}
