/**
 * =============================================================================
 * BIENVENIDA STYLES — Estilos de la pantalla de bienvenida
 * =============================================================================
 *
 * PROPÓSITO:
 * Define todos los estilos usados en BienvenidaView. Centralizados para
 * mantener separación entre lógica (View) y presentación (styles).
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Separación de concerns: la vista contiene JSX, los styles contienen CSS-in-JS.
 * - Reutilización de tokens: importa colores, tipografía y spacing del sistema.
 * - StyleSheet.create: optimización de React Native que crea un objeto único.
 */
import { Colors, Typography, Spacing, AppTracking } from '@/shared/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  progressBar: {
    height: 4,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.containerPadding,
    height: 56,
    backgroundColor: Colors.appBackground,
  },
  headerTitle: {
    fontSize: Typography.headlineLgMobile.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineLgMobile.fontWeight,
  },
  skipButton: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
  },
  content: {
    paddingHorizontal: Spacing.gutter,
    gap: 24,
    maxWidth: 428,
    alignSelf: 'center',
    width: '100%',
  },
  arrivalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 30,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  arrivingLabel: {
    fontSize: Typography.labelCapsSm.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsSm.fontWeight,
    letterSpacing: AppTracking.wideLabelCaps,
  },
  arrivalTime: {
    fontSize: Typography.displayNumberLg.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayNumberLg.fontWeight,
    lineHeight: 40,
  },
  busImageContainer: {
    height: 290,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 22,
    elevation: 12,
  },
  heroTextContainer: {
    paddingHorizontal: Spacing.gutter,
    gap: 12,
  },
  heroTitle: {
    fontSize: Typography.displayLgPhone.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayLgPhone.fontWeight,
    textAlign: 'center',
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: Typography.bodyLg.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyLg.fontWeight,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  pageDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dotActive: {
    width: 40,
    height: 8,
    borderRadius: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featureGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  ctaText: {
    fontSize: Typography.displayLgPhone.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.displayLgPhone.fontWeight,
  },
  legalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  legalText: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
    textAlign: 'center',
    lineHeight: 20,
  },
  legalLink: {
    fontSize: Typography.bodySm.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodySm.fontWeight,
    textDecorationLine: 'underline',
  },
  sheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000AA',
  },
  sheetContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '70%',
    gap: 16,
  },
  sheetTitle: {
    fontSize: Typography.headlineMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineMd.fontWeight,
  },
  sheetText: {
    fontSize: Typography.bodyMd.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMd.fontWeight,
    lineHeight: 22,
  },
  sheetSubtitle: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
    marginTop: 8,
  },
  sheetCloseButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  sheetCloseText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
});

export default styles;
