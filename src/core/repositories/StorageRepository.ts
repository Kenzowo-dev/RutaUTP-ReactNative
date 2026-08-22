/**
 * =============================================================================
 * STORAGE REPOSITORY — Envoltorio de AsyncStorage para persistencia local
 * =============================================================================
 *
 * PROPÓSITO:
 * Proporciona una capa de abstracción sobre AsyncStorage (almacenamiento local
 * de React Native) para guardar y recuperar datos del usuario de forma
 * tipada y centralizada.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - Centralización de claves: el objeto KEYS evita errores de tipeo al usar
 *   strings dispersos por el código. Todas las claves del storage viven aquí.
 * - Manejo de errores silencioso: los try/catch capturan errores de lectura/
 *   escritura sin crashear la app (útil en dispositivos con almacenamiento lleno).
 * - Valores por defecto: los métodos get devuelven '[]', '{}' o 'null' como
 *   fallback para evitar null/undefined en el renderizado.
 * - Serialización JSON: los datos se guardan como string (AsyncStorage solo
 *   acepta strings) y se parsean al leer.
 *
 * ESTRUCTURA DE CLAVES:
 * - @rutautp:saved_places → Lugares guardados por el usuario
 * - @rutautp:saved_lines  → Líneas de transporte guardadas
 * - @rutautp:user_profile → Perfil del usuario (nombre, preferencias)
 * - @rutautp:payment_method → Método de pago registrado
 *
 * NOTA IMPORTANTE:
 * Aunque el repositorio está completamente implementado, actualmente NO se usa
 * en los ViewModels. El estado se maneja con useState en memoria volátil.
 * Esto significa que los datos se pierden al cerrar la app. Para producción,
 * se debería integrar este repositorio con los ViewModels.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Claves centralizadas del almacenamiento local
 *  El prefijo '@rutautp:' identifica las keys de esta aplicación
 *  para evitar colisiones con otras apps o librerías */
const KEYS = {
  savedPlaces: '@rutautp:saved_places',
  savedLines: '@rutautp:saved_lines',
  userProfile: '@rutautp:user_profile',
  paymentMethod: '@rutautp:payment_method',
};

export class StorageRepository {
  /** Obtiene un valor string del storage por su clave
   *  Retorna null si no existe o hay error de lectura */
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  }

  /** Guarda un valor string en el storage
   *  Los errores se ignoran para no interrumpir la UX */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // storage error
    }
  }

  /** Elimina un valor del storage por su clave */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // storage error
    }
  }

  /** Obtiene lugares guardados como string JSON
   *  Retorna '[]' si no hay datos (lista vacía por defecto) */
  async getSavedPlaces(): Promise<string> {
    return (await this.getItem(KEYS.savedPlaces)) || '[]';
  }

  /** Serializa y guarda un array de lugares en el storage */
  async savePlaces(places: unknown): Promise<void> {
    await this.setItem(KEYS.savedPlaces, JSON.stringify(places));
  }

  /** Obtiene líneas guardadas como string JSON
   *  Retorna '[]' si no hay datos */
  async getSavedLines(): Promise<string> {
    return (await this.getItem(KEYS.savedLines)) || '[]';
  }

  /** Serializa y guarda un array de líneas en el storage */
  async saveLines(lines: unknown): Promise<void> {
    await this.setItem(KEYS.savedLines, JSON.stringify(lines));
  }

  /** Obtiene el perfil del usuario como string JSON
   *  Retorna '{}' si no hay datos (objeto vacío por defecto) */
  async getProfile(): Promise<string> {
    return (await this.getItem(KEYS.userProfile)) || '{}';
  }

  /** Serializa y guarda el perfil en el storage */
  async saveProfile(profile: unknown): Promise<void> {
    await this.setItem(KEYS.userProfile, JSON.stringify(profile));
  }

  /** Obtiene el método de pago como string JSON
   *  Retorna 'null' si no hay datos */
  async getPaymentMethod(): Promise<string> {
    return (await this.getItem(KEYS.paymentMethod)) || 'null';
  }

  /** Serializa y guarda los últimos 4 dígitos de la tarjeta */
  async savePaymentMethod(last4: string): Promise<void> {
    await this.setItem(KEYS.paymentMethod, JSON.stringify(last4));
  }
}
