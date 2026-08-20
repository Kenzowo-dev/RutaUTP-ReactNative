import { ReporteComunidad, RutaSegura, TipoReporte } from '@/shared/types';
import { Colors } from '@/shared/constants';

export const REPORTES: ReporteComunidad[] = [
  {
    id: '1',
    iniciales: 'JD',
    nombre: 'Jorge D.',
    hace: 'HACE 5 MIN',
    tipo: 'ALERTA',
    cuerpo: 'Micro lleno en Av. Larco. Pasaron 3 sin parar hacia la UTP.',
    utiles: 12,
    comentarios: 2,
    utilMarcado: false,
    avatarColor: Colors.surfaceContainerHigh,
    avatarForeground: Colors.onSurfaceVariant,
  },
  {
    id: '2',
    iniciales: 'MA',
    nombre: 'Maria A.',
    hace: 'HACE 15 MIN',
    tipo: 'TRÁFICO',
    cuerpo: 'Demora en Óvalo Papal por obras. Considerar 10 min adicionales.',
    utiles: 45,
    comentarios: 8,
    utilMarcado: true,
    avatarColor: Colors.secondaryContainer,
    avatarForeground: Colors.onSecondaryContainer,
  },
  {
    id: '3',
    iniciales: 'RC',
    nombre: 'Rosa C.',
    hace: 'HACE 1 HORA',
    tipo: 'SUGERENCIA',
    cuerpo: 'Tomar Av. Miraflores a las 7:30 AM evita el tráfico de España.',
    utiles: 28,
    comentarios: 5,
    utilMarcado: false,
    avatarColor: Colors.tertiaryContainer,
    avatarForeground: Colors.onTertiaryContainer,
  },
];

export const RUTAS_SEGURAS: RutaSegura[] = [
  {
    id: 0,
    titulo: 'Zona Segura: Óvalo Papal',
    descripcion: 'Patrullaje activo y alta iluminación hasta las 11:00 PM.',
    icono: 'moon',
    iconoBg: Colors.tertiary,
    iconoFg: Colors.onTertiary,
    accent: Colors.tertiary,
  },
  {
    id: 1,
    titulo: 'Paradero UTP (Entrada)',
    descripcion: 'Monitoreo por cámaras de seguridad municipal.',
    icono: 'eye',
    iconoBg: Colors.secondary,
    iconoFg: Colors.onSecondary,
    accent: null,
  },
];

export class SeguridadService {
  static getReportes(): ReporteComunidad[] {
    return REPORTES;
  }

  static getRutasSeguras(): RutaSegura[] {
    return RUTAS_SEGURAS;
  }

  static getTipoBg(tipo: TipoReporte): string {
    switch (tipo) {
      case 'ALERTA': return Colors.errorContainer;
      case 'TRÁFICO': return Colors.secondaryContainer;
      case 'SUGERENCIA': return Colors.tertiaryContainer;
      default: return Colors.surfaceContainerHigh;
    }
  }

  static getTipoFg(tipo: TipoReporte): string {
    switch (tipo) {
      case 'ALERTA': return Colors.onErrorContainer;
      case 'TRÁFICO': return Colors.onSecondaryContainer;
      case 'SUGERENCIA': return Colors.onTertiaryContainer;
      default: return Colors.onSurfaceVariant;
    }
  }
}
