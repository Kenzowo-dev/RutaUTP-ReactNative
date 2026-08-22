/**
 * =============================================================================
 * PALETA DE COLORES — Sistema de diseño estilo Material 3
 * =============================================================================
 *
 * PROPÓSITO:
 * Define todos los colores de la aplicación siguiendo el sistema de diseño
 * Material Design 3 de Google, adaptado a la identidad visual de Ruta UTP.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Consistencia visual: centralizar colores evita variaciones accidentales
 *   de tonos en diferentes componentes.
 * - Semántica de colores: la nomenclatura sigue el patrón Material 3:
 *   - appPrimary: color principal (rojo UTP #a80033)
 *   - Container: contenedores asociados al color
 *   - On: texto/iconos sobre un color de fondo
 *   - Fixed: variantes fijas que no cambian con el tema
 *   - Inverse: colores invertidos para contraste
 * - Tema claro: todos los valores están optimizados para fondo claro.
 *   Para tema oscuro se crearían variables alternativas.
 * - Escalabilidad: permite ajustar toda la identidad visual editando un archivo.
 *
 * IDENTIDAD UTP:
 * - appPrimary (#a80033): rojo institucional de la Universidad Tecnológica del Perú
 * - secondary (#3c5d9c): azul complementario para elementos secundarios
 * - tertiary (#005b6e): verde-azulado para acentos terciarios
 *
 * USO EN COMPONENTES:
 * Los componentes importan Colors desde '@/shared/constants' y aplican
 * estos tokens en sus estilos. NUNCA se deben usar colores hardcodeados.
 */
export const Colors = {
  /** Color principal — Rojo institucional UTP */
  appPrimary: '#a80033',
  primaryContainer: '#d31245',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#ffe8e8',
  primaryFixed: '#ffdadb',
  primaryFixedDim: '#ffb2b7',
  inversePrimary: '#ffb2b7',

  /** Color secundario — Azul complementario */
  secondary: '#3c5d9c',
  secondaryContainer: '#99b8fe',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#244885',

  /** Color terciario — Verde-azulado para acentos */
  tertiary: '#005b6e',
  tertiaryContainer: '#00758d',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#d1f2ff',
  tertiaryFixed: '#b3ebff',
  tertiaryFixedDim: '#4cd6fb',

  /** Fondos y superficies */
  appBackground: '#f7f9fb',
  appSurface: '#f7f9fb',
  surfaceContainer: '#eceef0',
  surfaceContainerLow: '#f2f4f6',
  surfaceContainerHigh: '#e6e8ea',
  surfaceContainerHighest: '#e0e3e5',
  surfaceContainerLowest: '#ffffff',
  surfaceDim: '#d8dadc',
  surfaceBright: '#f7f9fb',
  surfaceVariant: '#e4bdbf',

  /** Textos sobre superficie */
  onSurface: '#191c1e',
  onSurfaceVariant: '#5c3f41',
  inverseSurface: '#2d3133',
  inverseOnSurface: '#eff1f3',

  /** Líneas y bordes */
  outline: '#906f70',
  outlineVariant: '#e4bdbf',

  /** Colores de error */
  appError: '#ba1a1a',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
};
