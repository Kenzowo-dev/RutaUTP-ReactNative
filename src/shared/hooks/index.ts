/**
 * =============================================================================
 * BARRIL DE HOOKS — Re-exportación centralizada de hooks compartidos
 * =============================================================================
 *
 * Permite importar hooks desde '@/shared/hooks' sin conocer la estructura
 * interna de carpetas.
 *
 * USO:
 * import { useRouter, RouterProvider } from '@/shared/hooks';
 */
export { RouterProvider, useRouter } from './useRouter';
