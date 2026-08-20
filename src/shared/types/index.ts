export type TipoVehiculo = 'Micro' | 'Combi' | 'Bus';

export interface Ruta {
  id: string;
  linea: string;
  nombre: string;
  empresa: string;
  tipo: TipoVehiculo;
  placa: string;
  minutosLlegada: number;
  colorIdentificador: string;
}

export interface LugarGuardado {
  id: string;
  nombre: string;
  direccion: string;
  categoria: CategoriaLugar;
  esFrecuente: boolean;
  colorBadge: string;
}

export type CategoriaLugar =
  | 'Universidad'
  | 'Hogar'
  | 'Tienda'
  | 'Restaurante'
  | 'Plaza'
  | 'Playa'
  | 'Otro';

export const CategoriaLugarIcon: Record<CategoriaLugar, string> = {
  Universidad: 'school',
  Hogar: 'home',
  Tienda: 'storefront',
  Restaurante: 'restaurant',
  Plaza: 'business',
  Playa: 'water',
  Otro: 'pin',
};

export interface LineaGuardada {
  id: string;
  letra: string;
  nombre: string;
  recorrido: string;
  tiempoEstimado: string;
  color: string;
}

export type TipoReporte = 'ALERTA' | 'TRÁFICO' | 'SUGERENCIA' | 'OTRO';

export interface ReporteComunidad {
  id: string;
  iniciales: string;
  nombre: string;
  hace: string;
  tipo: TipoReporte;
  cuerpo: string;
  utiles: number;
  comentarios: number;
  utilMarcado: boolean;
  avatarColor: string;
  avatarForeground: string;
}

export type AppScreen =
  | 'bienvenida'
  | 'mapaPrincipal'
  | 'rutas'
  | 'guardado'
  | 'seguridad'
  | 'perfil';

export interface DestinoChip {
  id: number;
  label: string;
  icon: string;
  lat: number;
  lon: number;
}

export interface RutaOpcion {
  id: number;
  linea: string;
  empresa: string;
  recorrido: string;
  llegaEn: string;
  tiempo: string;
  costo: string;
  congestion: string;
  colorLinea: string;
}

export interface RutaSegura {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  iconoBg: string;
  iconoFg: string;
  accent: string | null;
}

export type NavTab = 'mapa' | 'rutas' | 'guardado' | 'seguridad' | 'perfil';

export const NavTabScreenMap: Record<NavTab, AppScreen> = {
  mapa: 'mapaPrincipal',
  rutas: 'rutas',
  guardado: 'guardado',
  seguridad: 'seguridad',
  perfil: 'perfil',
};
