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
