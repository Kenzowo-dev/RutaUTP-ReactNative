export const MOCK_DESTINOS = [
  { id: 1, label: 'Casa', icon: 'home', lat: -8.1180, lon: -79.0350 },
  { id: 2, label: 'UTP', icon: 'school', lat: -8.1116, lon: -79.0287 },
  { id: 3, label: 'Trabajo', icon: 'briefcase', lat: -8.1050, lon: -79.0200 },
  { id: 4, label: 'Centro', icon: 'business', lat: -8.1090, lon: -79.0270 },
  { id: 5, label: 'Huanchaco', icon: 'water', lat: -8.0825, lon: -79.1197 },
];

export const MOCK_RUTAS_OPCIONES = [
  {
    id: 1,
    linea: 'B',
    empresa: 'Empresa Salaverry',
    recorrido: 'Salaverry → UTP → Centro',
    llegaEn: '4 min',
    tiempo: '20 min',
    costo: 'S/ 1.50',
    congestion: 'Media',
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
  },
];

export const MOCK_RUTAS = [
  {
    id: 1,
    linea: 'B',
    empresa: 'Empresa Salaverry',
    recorrido: 'Salaverry → UTP → Centro',
    llegaEn: '4 min',
    tiempo: '20 min',
    costo: 'S/ 1.50',
    congestion: 'Media',
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
  },
];

export const MOCK_COORDENADAS_LINEAS: Record<string, { latitude: number; longitude: number }[]> = {
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

export const MOCK_REPORTES = [
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
  },
];

export const MOCK_RUTAS_SEGURAS = [
  {
    id: 0,
    titulo: 'Zona Segura: Óvalo Papal',
    descripcion: 'Patrullaje activo y alta iluminación hasta las 11:00 PM.',
    icono: 'moon',
    iconoBg: '#005b6e',
    iconoFg: '#ffffff',
    accent: '#005b6e',
  },
  {
    id: 1,
    titulo: 'Paradero UTP (Entrada)',
    descripcion: 'Monitoreo por cámaras de seguridad municipal.',
    icono: 'eye',
    iconoBg: '#3c5d9c',
    iconoFg: '#ffffff',
    accent: null,
  },
];

export const MOCK_SAMPLE_LUGARES = [
  { id: '1', nombre: 'UTP', direccion: 'Av. España 123, Trujillo', categoria: 'Universidad', esFrecuente: true, colorBadge: '#a80033' },
  { id: '2', nombre: 'Casa', direccion: 'Urb. El Recreo, Trujillo', categoria: 'Hogar', esFrecuente: false, colorBadge: '#a80033' },
  { id: '3', nombre: 'Centro Comercial', direccion: 'Mall Plaza Trujillo', categoria: 'Tienda', esFrecuente: false, colorBadge: '#a80033' },
  { id: '4', nombre: 'Pastelería Dulce Lima', direccion: 'Av. Larco 456', categoria: 'Restaurante', esFrecuente: false, colorBadge: '#a80033' },
  { id: '5', nombre: 'Plaza de Armas', direccion: 'Centro Histórico', categoria: 'Plaza', esFrecuente: false, colorBadge: '#a80033' },
  { id: '6', nombre: 'Playa Huanchaco', direccion: 'Malecón Huanchaco', categoria: 'Playa', esFrecuente: false, colorBadge: '#a80033' },
];

export const MOCK_LINEAS = [
  {
    id: 'B',
    letra: 'B',
    nombre: 'Línea B — Empresa Salaverry',
    recorrido: 'Salaverry → UTP → Centro',
    tiempoEstimado: '~4 min',
    color: '#005b6e',
  },
  {
    id: '7',
    letra: '7',
    nombre: 'Línea 7 — El Esfuerzo',
    recorrido: 'Huanchaco → Centro → La Esperanza',
    tiempoEstimado: '~12 min',
    color: '#005b6e',
  },
  {
    id: 'C',
    letra: 'C',
    nombre: 'Línea C — Trans Moche',
    recorrido: 'Moche → Av. España → Plaza Mayor',
    tiempoEstimado: '~20 min',
    color: '#5c3f41',
  },
];

export const MOCK_CAR_INSTRUCCIONES = [
  { texto: 'Camina 250m hasta Av. España', distancia: '250 m', icono: 'walk' },
  { texto: 'Sube al bus Línea B en el paradero', distancia: '15 min', icono: 'bus' },
  { texto: 'Continúa por Av. España por 1.5 km', distancia: '1.5 km', icono: 'arrow-up' },
  { texto: 'Baja en el frontis de UTP Trujillo', distancia: '200 m', icono: 'arrow-down' },
  { texto: 'Llegaste a tu destino!', distancia: '', icono: 'checkmark-circle' },
];
