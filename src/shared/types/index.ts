/**
 * =============================================================================
 * TIPOS DEL DOMINIO — Definiciones centralizadas de tipos
 * =============================================================================
 *
 * PROPÓSITO:
 * Centraliza todas las interfaces, tipos y enumeraciones que representan
 * las entidades del negocio. Esto garantiza consistencia en todo el código
 * y facilita el mantenimiento (un cambio aquí se propaga a todo el proyecto).
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Única fuente de verdad: evita definiciones duplicadas o inconsistentes
 *   entre features. Si la estructura de 'Ruta' cambia, solo se edita aquí.
 * - Type Safety: TypeScript usa estos tipos para detectar errores en tiempo
 *   de compilación (ej: pasar un string donde se espera un número).
 * - Documentación implícita: los nombres descriptivos y la estructura
 *   tipada sirven como documentación del dominio del problema.
 *
 * ENTIDADES PRINCIPALES:
 * - Ruta: representa una línea de transporte público con sus datos operativos
 * - LugarGuardado: ubicación que el usuario marcó como favorita
 * - LineaGuardada: ruta de transporte que el usuario guardó para acceso rápido
 * - ReporteComunidad: incidente o alerta reportado por un usuario
 *
 * TIPOS AUXILIARES:
 * - DestinoChip: coordenadas para los botones de acceso rápido en el mapa
 * - RutaOpción: opción de ruta disponible para un trayecto
 * - RutaSegura: zona o trayecto con monitoreo de seguridad
 */
/** Tipos de vehículos de transporte público en Perú */
export type TipoVehiculo = 'Micro' | 'Combi' | 'Bus';

/** Representa una línea de transporte público con sus datos operativos */
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

/** Ubicación guardada por el usuario como favorita */
export interface LugarGuardado {
  id: string;
  nombre: string;
  direccion: string;
  categoria: CategoriaLugar;
  esFrecuente: boolean;
  colorBadge: string;
}

/** Categorías disponibles para clasificar un lugar guardado */
export type CategoriaLugar =
  | 'Universidad'
  | 'Hogar'
  | 'Tienda'
  | 'Restaurante'
  | 'Plaza'
  | 'Playa'
  | 'Otro';

/** Mapeo de cada categoría a su icono representativo de Ionicons */
export const CategoriaLugarIcon: Record<CategoriaLugar, string> = {
  Universidad: 'school',
  Hogar: 'home',
  Tienda: 'storefront',
  Restaurante: 'restaurant',
  Plaza: 'business',
  Playa: 'water',
  Otro: 'pin',
};

/** Línea de transporte público guardada por el usuario */
export interface LineaGuardada {
  id: string;
  letra: string;
  nombre: string;
  recorrido: string;
  tiempoEstimado: string;
  color: string;
}

/** Tipos de reportes que la comunidad puede crear */
export type TipoReporte = 'ALERTA' | 'TRÁFICO' | 'SUGERENCIA' | 'OTRO';

/** Reporte o incidente compartido por un usuario de la comunidad */
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

/** Pantallas principales de la app (vista del router) */
export type AppScreen =
  | 'bienvenida'
  | 'mapaPrincipal'
  | 'rutas'
  | 'guardado'
  | 'seguridad'
  | 'perfil';

/** Destino con coordenadas para los chips de acceso rápido en el mapa */
export interface DestinoChip {
  id: number;
  label: string;
  icon: string;
  lat: number;
  lon: number;
}

/** Opción de ruta disponible para un trayecto */
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

/** Zona o trayecto con monitoreo de seguridad activo */
export interface RutaSegura {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  iconoBg: string;
  iconoFg: string;
  accent: string | null;
}

/** Pestañas de navegación de la barra inferior */
export type NavTab = 'mapa' | 'rutas' | 'guardado' | 'seguridad' | 'perfil';

/** Mapeo de pestañas de navegación a pantallas del router */
export const NavTabScreenMap: Record<NavTab, AppScreen> = {
  mapa: 'mapaPrincipal',
  rutas: 'rutas',
  guardado: 'guardado',
  seguridad: 'seguridad',
  perfil: 'perfil',
};
