/**
 * =============================================================================
 * BARRIL DE CONSTANTES — Re-exportación centralizada
 * =============================================================================
 *
 * PROPÓSITO:
 * Punto de entrada único para todas las constantes de la aplicación.
 * Permite importar cualquier constante desde '@/shared/constants'.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Simplifica imports: en lugar de importar desde cada archivo individual,
 *   se importa todo desde un solo archivo.
 * - Refactorización segura: si cambia la estructura interna de carpetas,
 *   solo se actualiza este archivo.
 *
 * USO:
 * import { Colors, Typography, Spacing, Radius, AppTracking } from '@/shared/constants';
 */
export { Colors } from './Colors';
export { Typography, AppTracking } from './Typography';
export { Spacing, Radius } from './Spacing';
