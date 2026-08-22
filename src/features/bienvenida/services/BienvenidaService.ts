/**
 * =============================================================================
 * BIENVENIDA SERVICE — Datos estáticos para la pantalla de bienvenida
 * =============================================================================
 *
 * PROPÓSITO:
 * Provee el texto legal y las tarjetas de características que se muestran
 * en la pantalla de onboarding.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Texto centralizado: el texto de términos y privacidad vive aquí para
 *   fácil modificación sin tocar la vista.
 * - Feature cards data: define iconos, colores, labels y títulos de las 2 cards.
 * - Clase estática: no requiere instanciación, se usa directamente BienvenidaService.getLegalText().
 *
 * NOTA: Los datos de feature cards también están hardcodeados en la vista.
 * Este servicio podría refactorizarse como única fuente de verdad.
 */
import { Colors } from '@/shared/constants';

interface FeatureCardData {
  icon: string;
  iconColor: string;
  label: string;
  title: string;
}

export class BienvenidaService {
  static getLegalText(): string {
    return 'Ruta UTP Trujillo es una aplicación prototipo que facilita la orientación de transporte público hacia el campus de la Universidad Tecnológica del Perú (sede Trujillo). Al usar esta app aceptas las condiciones aquí descritas. Los datos de ubicación y reportes comunitarios son simulados para efectos de demostración. No se comparte información con terceros.';
  }

  static getFeatureCards(): FeatureCardData[] {
    return [
      {
        icon: 'heart',
        iconColor: Colors.appPrimary,
        label: 'SEGURIDAD',
        title: 'Rutas nocturnas monitoreadas.',
      },
      {
        icon: 'card',
        iconColor: Colors.tertiary,
        label: 'AHORRO',
        title: 'Precios de micros y combis actualizados.',
      },
    ];
  }
}
