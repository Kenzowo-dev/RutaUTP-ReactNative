/**
 * =============================================================================
 * ESPACIADO Y RADIOS — Sistema de spacing basado en grid de 4px
 * =============================================================================
 *
 * PROPÓSITO:
 * Define el sistema de espaciado y bordes redondeados usado en toda la app.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Grid de 4px: sistema estándar de diseño que garantiza alineación visual
 *   consistente. Todos los espaciados son múltiplos de 4.
 * - Escala predecible: stackGap (12), gutter (16), containerPadding (20)
 *   cubren los casos de uso más comunes.
 * - Touch target mínimo (48px): cumple con las guías de accesibilidad de
 *   Android e iOS (mínimo 44-48px para áreas táctiles).
 * - Radios con nombre semántico: small/medium/large/xl/card/cardLarge/pill
 *   permite aplicar bordes redondeados de forma intuitiva.
 *
 * USO:
 * import { Spacing, Radius } from '@/shared/constants';
 * padding: Spacing.gutter, borderRadius: Radius.card
 */
export const Spacing = {
  unit: 4,                  // Unidad base del grid (4px)
  stackGap: 12,            // Espaciado entre elementos en stack (3 unidades)
  gutter: 16,              // Margen lateral estándar (4 unidades)
  containerPadding: 20,    // Padding de contenedores principales
  touchTargetMin: 48,      // Área táctil mínima (accesibilidad)
};

export const Radius = {
  small: 4,                // Bordes sutiles (badges, inputs pequeños)
  medium: 8,               // Bordes estándar (botones, cards pequeñas)
  large: 12,               // Bordes medianos (cards, paneles)
  xl: 16,                  // Bordes grandes (CTA buttons, modals)
  card: 20,                // Bordes de tarjetas principales
  cardLarge: 26,           // Bordes hero y cards destacadas
  pill: 9999,              // Bordes completamente redondos (píldoras, chips)
};
