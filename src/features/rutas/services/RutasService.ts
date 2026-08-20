import { RutaOpcion } from '@/shared/types';
import { Colors } from '@/shared/constants';

export class RutasService {
  static getRutas(): RutaOpcion[] {
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
      {
        id: 4,
        linea: 'C',
        empresa: 'Trans Moche',
        recorrido: 'Moche → Av. España → Plaza Mayor',
        llegaEn: '18 min',
        tiempo: '35 min',
        costo: 'S/ 1.00',
        congestion: 'Media',
        colorLinea: '#6750a4',
      },
    ];
  }

  static getCoordenadasLineas(): Record<string, { latitude: number; longitude: number }[]> {
    return {
      B: [
        { latitude: -8.1200, longitude: -79.0350 },
        { latitude: -8.1170, longitude: -79.0330 },
        { latitude: -8.1145, longitude: -79.0310 },
        { latitude: -8.1116, longitude: -79.0287 },
      ],
      '10': [
        { latitude: -8.0780, longitude: -79.0420 },
        { latitude: -8.0850, longitude: -79.0390 },
        { latitude: -8.0920, longitude: -79.0360 },
        { latitude: -8.0990, longitude: -79.0330 },
        { latitude: -8.1040, longitude: -79.0310 },
        { latitude: -8.1080, longitude: -79.0295 },
        { latitude: -8.1116, longitude: -79.0287 },
      ],
      '4': [
        { latitude: -8.0825, longitude: -79.1197 },
        { latitude: -8.0920, longitude: -79.0900 },
        { latitude: -8.1000, longitude: -79.0600 },
        { latitude: -8.1050, longitude: -79.0400 },
        { latitude: -8.1090, longitude: -79.0320 },
        { latitude: -8.1116, longitude: -79.0287 },
      ],
      C: [
        { latitude: -8.1200, longitude: -79.0350 },
        { latitude: -8.1170, longitude: -79.0330 },
        { latitude: -8.1145, longitude: -79.0310 },
        { latitude: -8.1116, longitude: -79.0287 },
      ],
      '7': [
        { latitude: -8.0825, longitude: -79.1197 },
        { latitude: -8.0920, longitude: -79.0900 },
        { latitude: -8.1000, longitude: -79.0600 },
        { latitude: -8.1050, longitude: -79.0400 },
        { latitude: -8.1090, longitude: -79.0320 },
        { latitude: -8.1116, longitude: -79.0287 },
      ],
      A: [
        { latitude: -8.1200, longitude: -79.0350 },
        { latitude: -8.1170, longitude: -79.0330 },
        { latitude: -8.1145, longitude: -79.0310 },
        { latitude: -8.1116, longitude: -79.0287 },
      ],
    };
  }

  static getCarInstrucciones() {
    return [
      { texto: 'Camina 250m hasta Av. España', distancia: '250 m', icono: 'walk' },
      { texto: 'Sube al bus Línea B en el paradero', distancia: '15 min', icono: 'bus' },
      { texto: 'Continúa por Av. España por 1.5 km', distancia: '1.5 km', icono: 'arrow-up' },
      { texto: 'Baja en el frontis de UTP Trujillo', distancia: '200 m', icono: 'arrow-down' },
      { texto: 'Llegaste a tu destino!', distancia: '', icono: 'checkmark-circle' },
    ];
  }
}
