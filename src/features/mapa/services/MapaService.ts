/**
 * =============================================================================
 * MAPA SERVICE — Datos estáticos y simulación de buses para el mapa
 * =============================================================================
 *
 * PROPÓSITO:
 * Provee los destinos, rutas disponibles, coordenadas de marcadores y la
 * lógica de simulación de buses en el mapa.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Destinos frecuentes: coordenadas GPS reales de lugares comunes (Casa, UTP, Trabajo).
 * - Rutas de transporte: líneas con datos de empresa, tiempo, costo y congestión.
 * - Simulación de buses: genera 6 buses alrededor de un destino en círculo,
 *  con ángulo y velocidad aleatorios para simular movimiento.
 * - Coordenadas UTP/usuario: puntos fijos para marcadores del mapa.
 *
 * SIMULACIÓN:
 * Los buses se generan en un radio de 0.008-0.012 grados alrededor del destino.
 * Cada bus tiene un ángulo inicial (0°, 60°, 120°, etc.) y se mueve en línea
 * recta con una probabilidad del 0.2% de cambiar de dirección por tick.
 */
import { DestinoChip, RutaOpcion } from '@/shared/types';
import { Colors } from '@/shared/constants';

export interface BusSimulado {
  id: number;
  lat: number;
  lon: number;
  linea: string;
  angulo: number;
  velocidad: number;
}

export class MapaService {
  static getDestinos(): DestinoChip[] {
    return [
      { id: 1, label: 'Casa', icon: 'home', lat: -8.1180, lon: -79.0350 },
      { id: 2, label: 'UTP', icon: 'school', lat: -8.1116, lon: -79.0287 },
      { id: 3, label: 'Trabajo', icon: 'briefcase', lat: -8.1050, lon: -79.0200 },
      { id: 4, label: 'Centro', icon: 'business', lat: -8.1090, lon: -79.0270 },
      { id: 5, label: 'Huanchaco', icon: 'water', lat: -8.0825, lon: -79.1197 },
    ];
  }

  static getRutasOpciones(): RutaOpcion[] {
    return [
      {
        id: 1,
        linea: 'B',
        empresa: 'Empresa Salaverry',
        recorrido: 'Salaverry → UTP → Centro',
        llegaEn: '4 min',
        tiempo: '20 min',
        costo: 'S/ 1.50',
        congestion: 'Media',
        colorLinea: Colors.appPrimary,
      },
      {
        id: 2,
        linea: '10',
        empresa: 'El Cortijo',
        recorrido: 'El Cortijo → Av. España → UTP',
        llegaEn: '7 min',
        tiempo: '25 min',
        costo: 'S/ 1.00',
        congestion: 'Baja',
        colorLinea: Colors.secondary,
      },
      {
        id: 3,
        linea: '4',
        empresa: 'Trans Salaverry',
        recorrido: 'Huanchaco → Centro → UTP',
        llegaEn: '12 min',
        tiempo: '30 min',
        costo: 'S/ 1.50',
        congestion: 'Alta',
        colorLinea: Colors.tertiary,
      },
    ];
  }

  static getBusLineasSimuladas(): string[] {
    return ['B', '10', '4', 'C', '7', 'A'];
  }

  static spawnBuses(destino: DestinoChip): BusSimulado[] {
    const lineas = MapaService.getBusLineasSimuladas();
    const nuevos: BusSimulado[] = [];
    for (let i = 0; i < 6; i++) {
      const angulo = i * 60;
      const radio = 0.008 + Math.random() * 0.004;
      const rad = (angulo * Math.PI) / 180;
      nuevos.push({
        id: i,
        lat: destino.lat + Math.sin(rad) * radio,
        lon: destino.lon + Math.cos(rad) * radio,
        linea: lineas[i % lineas.length],
        angulo,
        velocidad: 0.0001 + Math.random() * 0.00005,
      });
    }
    return nuevos;
  }

  static getUTPMarker() {
    return { latitude: -8.1116, longitude: -79.0287 };
  }

  static getUserMarker() {
    return { latitude: -8.1180, longitude: -79.0350 };
  }
}
