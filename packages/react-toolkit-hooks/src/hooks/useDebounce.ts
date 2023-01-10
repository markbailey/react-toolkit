import { useEffect } from 'react';
import useTimeout from './useTimeout';

// Hook that uses a timeout to trigger a callback. When the dependencies change,
// the timeout is reset.
// Example: typing into a search box delaying the api call until you stop typing.
// params: {function} callback - This function to trigger when timeout elapses.
// params: {number} delay - The value in milleseconds to set as the timeout.
// params: {array} dependencies - An array of variables that when updated cause the timeout to reset.
function useDebounce<T>(callback: () => void, delay: number, dependencies: T[]) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]);
}

export default useDebounce;
