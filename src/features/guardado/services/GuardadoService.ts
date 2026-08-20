import { Colors } from '@/shared/constants';
import { LugarGuardado, CategoriaLugar, LineaGuardada } from '@/shared/types';

export class GuardadoService {
  static getSampleLugares(): LugarGuardado[] {
    return [
      { id: '1', nombre: 'UTP', direccion: 'Av. España 123, Trujillo', categoria: 'Universidad', esFrecuente: true, colorBadge: Colors.appPrimary },
      { id: '2', nombre: 'Casa', direccion: 'Urb. El Recreo, Trujillo', categoria: 'Hogar', esFrecuente: false, colorBadge: Colors.appPrimary },
      { id: '3', nombre: 'Centro Comercial', direccion: 'Mall Plaza Trujillo', categoria: 'Tienda', esFrecuente: false, colorBadge: Colors.appPrimary },
      { id: '4', nombre: 'Pastelería Dulce Lima', direccion: 'Av. Larco 456', categoria: 'Restaurante', esFrecuente: false, colorBadge: Colors.appPrimary },
      { id: '5', nombre: 'Plaza de Armas', direccion: 'Centro Histórico', categoria: 'Plaza', esFrecuente: false, colorBadge: Colors.appPrimary },
      { id: '6', nombre: 'Playa Huanchaco', direccion: 'Malecón Huanchaco', categoria: 'Playa', esFrecuente: false, colorBadge: Colors.appPrimary },
    ];
  }

  static getLineas(): LineaGuardada[] {
    return [
      {
        id: 'B',
        letra: 'B',
        nombre: 'Línea B — Empresa Salaverry',
        recorrido: 'Salaverry → UTP → Centro',
        tiempoEstimado: '~4 min',
        color: Colors.tertiary,
      },
      {
        id: '7',
        letra: '7',
        nombre: 'Línea 7 — El Esfuerzo',
        recorrido: 'Huanchaco → Centro → La Esperanza',
        tiempoEstimado: '~12 min',
        color: Colors.tertiary,
      },
      {
        id: 'C',
        letra: 'C',
        nombre: 'Línea C — Trans Moche',
        recorrido: 'Moche → Av. España → Plaza Mayor',
        tiempoEstimado: '~20 min',
        color: Colors.onSurfaceVariant,
      },
    ];
  }

  static getCategoriaIcon(categoria: CategoriaLugar): string {
    switch (categoria) {
      case 'Universidad':
        return 'school';
      case 'Hogar':
        return 'home';
      case 'Tienda':
        return 'storefront';
      case 'Restaurante':
        return 'restaurant';
      case 'Plaza':
        return 'business';
      case 'Playa':
        return 'water';
      default:
        return 'location';
    }
  }
}
