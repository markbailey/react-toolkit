import { useState } from 'react';

interface UseCopyToClipboard {
  value: string | undefined;
  error: Error | null;
  isSuccessful: boolean;
  copyToClipboard(text: string): void;
}

// Hook to copy text to the clipboard.
// @return Readonly<{
//  value: string | undefined;
//  error: Error | null;
//  isSuccessful: boolean;
//  copyToClipboard(text: string): void;
// }>
function useCopyToClipboard(): Readonly<UseCopyToClipboard> {
  const [value, setValue] = useState<string>();
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onSuccess = (text: string) => {
    setValue(text);
    setIsSuccessful(true);
    setError(null);
  };

  const onError = <E extends Error>(error: E) => {
    console.error('Async: Could not copy text: ', error);
    setIsSuccessful(false);
    setError(error);
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard === undefined)
      throw new Error("Your browser does not support 'clipboard'");
    navigator.clipboard
      .writeText(text)
      .then(() => onSuccess(text))
      .catch(<E extends Error>(error: E) => onError(error));
  };

  return Object.freeze({
    value,
    error,
    isSuccessful,
    copyToClipboard,
  });
}

export default useCopyToClipboard;
