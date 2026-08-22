/**
 * =============================================================================
 * BASE REPOSITORY — Interfaz base para repositorios de datos
 * =============================================================================
 *
 * PROPÓSITO:
 * Define el contrato genérico CRUD (Create, Read, Update, Delete) que deben
 * implementar todos los repositorios de la aplicación. Al ser una interfaz
 * genérica, permite reutilizar la misma estructura para cualquier entidad
 * del dominio (rutas, lugares, usuarios, etc.).
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Patrón Repository: abstrae el origen de datos (API, AsyncStorage, SQLite)
 *   para que el resto del código no dependa de la implementación concreta.
 * - Genéricos <T, ID>: evita duplicar interfaces para cada entidad. T representa
 *   el tipo de dato y ID el tipo de su identificador.
 * - Promise: todas las operaciones son asíncronas porque el almacenamiento
 *   local (AsyncStorage) y las APIs remotas trabajan de forma asíncrona.
 *
 * NOTA IMPORTANTE:
 * Actualmente esta interfaz NO está implementada en el codebase. Los servicios
 * utilizan datos estáticos (mock) en lugar de persistencia real. Es una base
 * preparada para futuras integraciones con backend o almacenamiento local.
 */
export interface BaseRepository<T, ID> {
  /** Obtiene todos los registros de la entidad */
  getAll(): Promise<T[]>;
  /** Busca un registro por su identificador único */
  getById(id: ID): Promise<T | null>;
  /** Crea o actualiza un registro */
  save(item: T): Promise<void>;
  /** Elimina un registro por su identificador único */
  deleteById(id: ID): Promise<void>;
}
