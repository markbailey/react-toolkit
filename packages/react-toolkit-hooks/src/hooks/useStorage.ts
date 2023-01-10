import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

interface UseStorage<T> {
  value?: T;
  setValue: Dispatch<SetStateAction<T | undefined>>;
  remove: () => void;
}

// Hook that provides access to the machines storage api's
// params: {Storage} storage - The storage API.
// params: {string} key - The key for setting storage item.
// params: {T} defaultValue - The default value for setting in the storage item.
function useStorage<T>(storage: Storage, key?: string, defaultValue?: T): UseStorage<T> {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = key !== undefined ? storage.getItem(key) : null;
    if (jsonValue !== null) return JSON.parse(jsonValue);
    if (typeof defaultValue === 'function') return defaultValue();
    return defaultValue;
  });

  const remove = useCallback(() => setValue(undefined), []);

  useEffect(() => {
    if (key === undefined) return;
    if (value === undefined) return storage.removeItem(key);
    storage.setItem(key, JSON.stringify(value));
  }, [key, value, storage]);

  return { value, setValue, remove };
}

// Hook that provides access to the machines session storage api
// params: {string} key - The key for setting storage item.
// params: {T} defaultValue - The default value for setting in the storage item.
export const useSessionStorage = <T extends unknown>(key?: string, defaultvalue?: T) =>
  useStorage(window.sessionStorage, key, defaultvalue);

// Hook that provides access to the machines local storage api
// params: {string} key - The key for setting storage item.
// params: {T} defaultValue - The default value for setting in the storage item.
export const useLocalStorage = <T extends unknown>(key?: string, defaultvalue?: T) =>
  useStorage(window.localStorage, key, defaultvalue);
