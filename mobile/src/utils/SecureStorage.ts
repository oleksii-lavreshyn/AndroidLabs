import * as SecureStore from 'expo-secure-store';
const keys = { tmdbToken: 'tmdb_bearer_token', sessionToken: 'backend_session_token' } as const;
export type SecureStorageKey = keyof typeof keys;
export const SecureStorage = {
  get: (key: SecureStorageKey) => SecureStore.getItemAsync(keys[key]),
  set: (key: SecureStorageKey, value: string) => SecureStore.setItemAsync(keys[key], value, { keychainAccessible: SecureStore.WHEN_UNLOCKED }),
  delete: (key: SecureStorageKey) => SecureStore.deleteItemAsync(keys[key]),
};
