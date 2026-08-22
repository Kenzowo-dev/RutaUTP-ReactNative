/**
 * =============================================================================
 * TIPOGRAFÍA — Escala tipográfica y tracking de letras
 * =============================================================================
 *
 * PROPÓSITO:
 * Define la escala tipográfica completa de la aplicación, incluyendo
 * familias de fuentes, tamaños, pesos y espaciado entre letras (tracking).
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Consistencia tipográfica: garantiza que todos los textos sigan la misma
 *   escala visual jerárquica.
 * - Separación de responsabilidades:
 *   - HankenGrotesk: títulos y displays (fuente de alto impacto visual)
 *   - BeVietnamPro: cuerpo de texto (legibilidad en pantallas)
 *   - JetBrainsMono: etiquetas en mayúsculas y datos numéricos (monoespaciada)
 * - Tracking personalizado: las etiquetas en mayúsculas llevan espaciado
 *   adicional entre letras para mejorar legibilidad (estilo UI moderno).
 * - Responsive: displayLgPhone es una versión reducida de displayLg para
 *   pantallas pequeñas (ej: bienvenida).
 *
 * JERARQUÍA TIPOGRÁFICA:
 * - Display: números grandes y títulos hero
 * - Headline: títulos de sección (Lg → Xs)
 * - Body: texto de lectura (Lg → Xs, con variantes Medium)
 * - Label: etiquetas en mayúsculas con JetBrainsMono (Lg → Sm)
 *
 * USO:
 * import { Typography, AppTracking } from '@/shared/constants';
 * style={{ ...Typography.headlineMd }} // aplica fontFamily, fontSize, fontWeight
 */
export const Typography = {
  /** Familias de fuentes disponibles (deben cargarse en app/_layout.tsx) */
  fontHankenGrotesk: 'HankenGrotesk',
  fontBeVietnam: 'BeVietnamPro',
  fontJetBrainsMono: 'JetBrainsMono',

  /** Display — Títulos hero y pantallas principales */
  displayLg: { fontFamily: 'HankenGrotesk', fontSize: 32, fontWeight: '900' as const },
  displayLgPhone: { fontFamily: 'HankenGrotesk', fontSize: 28, fontWeight: '900' as const },

  /** Headline — Títulos de sección (de mayor a menor jerarquía) */
  headlineLgMobile: { fontFamily: 'HankenGrotesk', fontSize: 28, fontWeight: '800' as const },
  headlineMd: { fontFamily: 'HankenGrotesk', fontSize: 24, fontWeight: '700' as const },
  headlineSm: { fontFamily: 'HankenGrotesk', fontSize: 20, fontWeight: '700' as const },
  headlineXs: { fontFamily: 'HankenGrotesk', fontSize: 18, fontWeight: '700' as const },
  headlineBody: { fontFamily: 'HankenGrotesk', fontSize: 16, fontWeight: '700' as const },

  /** Display numérico — Estadísticas y datos destacados */
  displayNumberLg: { fontFamily: 'HankenGrotesk', fontSize: 42, fontWeight: '900' as const },
  displayNumberMd: { fontFamily: 'HankenGrotesk', fontSize: 24, fontWeight: '700' as const },

  /** Body — Texto de lectura regular */
  bodyLg: { fontFamily: 'BeVietnamPro', fontSize: 18, fontWeight: '400' as const },
  bodyMd: { fontFamily: 'BeVietnamPro', fontSize: 16, fontWeight: '400' as const },
  bodySm: { fontFamily: 'BeVietnamPro', fontSize: 14, fontWeight: '400' as const },
  bodyXs: { fontFamily: 'BeVietnamPro', fontSize: 13, fontWeight: '400' as const },
  bodyMdMedium: { fontFamily: 'BeVietnamPro', fontSize: 16, fontWeight: '500' as const },
  bodySmMedium: { fontFamily: 'BeVietnamPro', fontSize: 15, fontWeight: '500' as const },
  bodyXsMedium: { fontFamily: 'BeVietnamPro', fontSize: 13, fontWeight: '500' as const },

  /** Label — Etiquetas en mayúsculas (JetBrainsMono para estilo técnico) */
  labelCapsLg: { fontFamily: 'JetBrainsMono', fontSize: 14, fontWeight: '600' as const },
  labelCapsMd: { fontFamily: 'JetBrainsMono', fontSize: 12, fontWeight: '600' as const },
  labelCapsSm: { fontFamily: 'JetBrainsMono', fontSize: 11, fontWeight: '600' as const },
};

/** Valores de letter-spacing (tracking) para etiquetas y displays */
export const AppTracking = {
  wideLabel: 1.5,      // Tracking para etiquetas medianas
  wideLabelMd: 1.8,    // Tracking para etiquetas pequeñas
  wideLabelCaps: 2.4,  // Tracking para etiquetas en mayúsculas
  displayTight: -0.6,  // Tracking negativo para displays (más compacto)
};
