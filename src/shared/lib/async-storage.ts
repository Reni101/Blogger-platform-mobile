import NativeAsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorage {
  static async set<T>(key: string, value: T) {
    const serializedValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    await NativeAsyncStorage.setItem(key, serializedValue);
  }

  static async get<T>(key: string) {
    const value = await NativeAsyncStorage.getItem(key);

    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  static async remove(key: string) {
    await NativeAsyncStorage.removeItem(key);
  }
}