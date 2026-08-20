import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  savedPlaces: '@rutautp:saved_places',
  savedLines: '@rutautp:saved_lines',
  userProfile: '@rutautp:user_profile',
  paymentMethod: '@rutautp:payment_method',
};

export class StorageRepository {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // storage error
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // storage error
    }
  }

  async getSavedPlaces(): Promise<string> {
    return (await this.getItem(KEYS.savedPlaces)) || '[]';
  }

  async savePlaces(places: unknown): Promise<void> {
    await this.setItem(KEYS.savedPlaces, JSON.stringify(places));
  }

  async getSavedLines(): Promise<string> {
    return (await this.getItem(KEYS.savedLines)) || '[]';
  }

  async saveLines(lines: unknown): Promise<void> {
    await this.setItem(KEYS.savedLines, JSON.stringify(lines));
  }

  async getProfile(): Promise<string> {
    return (await this.getItem(KEYS.userProfile)) || '{}';
  }

  async saveProfile(profile: unknown): Promise<void> {
    await this.setItem(KEYS.userProfile, JSON.stringify(profile));
  }

  async getPaymentMethod(): Promise<string> {
    return (await this.getItem(KEYS.paymentMethod)) || 'null';
  }

  async savePaymentMethod(last4: string): Promise<void> {
    await this.setItem(KEYS.paymentMethod, JSON.stringify(last4));
  }
}
