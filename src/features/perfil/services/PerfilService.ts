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
