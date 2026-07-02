import * as Keychain from 'react-native-keychain';

export class SecureStorage {
  static async set<T>(key: string, value: T) {
    const serializedValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    await Keychain.setGenericPassword(key, serializedValue, {
      service: key,
    });
  }

  static async get<T>(key: string) {
    const credentials = await Keychain.getGenericPassword({
      service: key,
    });

    if (!credentials) {
      return null;
    }

    try {
      return JSON.parse(credentials.password) as T;
    } catch {
      return credentials.password as T;
    }
  }

  static async remove(key: string) {
    await Keychain.resetGenericPassword({
      service: key,
    });
  }
}