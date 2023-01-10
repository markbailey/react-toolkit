import { useState } from 'react';

type KeyValuePair = [string, string];
export interface UseCookie {
  value: string | undefined;
  exists: boolean;
  setCookie(value?: string, days?: number): void;
  deleteCookie(): void;
}

const ONE_DAY = 24 * 60 * 60 * 1000;

function getAllCookies() {
  const keyValuePairs = document.cookie.split(';');
  const cookies = keyValuePairs.reduce(
    (acc: KeyValuePair[], current: string) => {
      const [key, value] = current.split('=');
      return acc.concat([[key.trim(), value.trim()]]);
    },
    []
  );

  return cookies;
}

// Hook for reading and writing cookies.
// params: {string} name - The key or name of the cookie. Used in setting key, value pair.
// @return Readonly<{
//  value?: string;
//  exists: boolean;
//  setCookie(value?: string, days?: number): void;
//  deleteCooke(): void;
// }>
function useCookie(name: string): Readonly<UseCookie> {
  const [value, setValue] = useState<string | undefined>(
    () => getCookie()?.[1]
  );

  const getCookie = () => getAllCookies().find((cookie) => cookie[0] === name);
  const deleteCookie = () => setCookie(undefined, 0);

  const setCookie = (value?: string, days?: number) => {
    let expires = '';
    if (days !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + days * ONE_DAY);
      expires = `expires=${date.toUTCString()}; `;
    }

    document.cookie = `${name}=${value ?? ''}; ${expires}path=/`;
    setValue(value);
  };

  return Object.freeze({
    value,
    exists: value !== undefined,
    setCookie,
    deleteCookie,
  });
}

export default useCookie;
