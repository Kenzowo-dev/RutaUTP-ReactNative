/**
 * =============================================================================
 * PERFIL SERVICE — Datos y utilidades del perfil de usuario
 * =============================================================================
 *
 * PROPÓSITO:
 * Provee el perfil por defecto y utilidades para validar nombre,
 * formatear números de tarjeta y extraer últimos 4 dígitos.
 *
 * POR QUÉ SE HIZO ASÍ:
 * - getDefaultProfile: retorna un objeto con valores por defecto del perfil.
 * - validateName: simple validación de nombre no vacío.
 * - formatCardNumber: formatea número en grupos de 4 dígitos (0000 0000 0000 0000).
 * - getLast4Digits: extrae últimos 4 dígitos para mostrar "Visa •••• 1234".
 *
 * NOTA: Este servicio no está integrado en el ViewModel. Las funciones
 * de formateo se usan directamente en TarjetaFormSheet.
 */
export class PerfilService {
  static getDefaultProfile() {
    return {
      nombre: 'Joaquín Díaz',
      notifOn: true,
      ubicacionOn: true,
      ecoOff: false,
      carnetVerificado: false,
      metodoPagoGuardado: null as string | null,
    };
  }

  static validateName(name: string): boolean {
    return name.trim().length > 0;
  }

  static formatCardNumber(numero: string): string {
    const digits = numero.replace(/\D/g, '');
    const parts: string[] = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.slice(i, i + 4));
    }
    return parts.join(' ');
  }

  static getLast4Digits(numero: string): string {
    return numero.replace(/\D/g, '').slice(-4);
  }
}
