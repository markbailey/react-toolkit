import {
  useCallback,
  useEffect,
  useRef,
} from 'react';

const { setTimeout, clearTimeout } = window;

// Hook that setups a timeout that will trigger a callback after a specified
// amount of time. This hook returns a reset and clear function for resetting
// and clearing the timeout.
// params: {function} callback - This function to trigger when timeout elapses.
// params: {number} delay - The value in milleseconds to set as the timeout.
function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number>();

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(callbackRef.current, delay);
  }, [delay]);

  const clear = useCallback(() => clearTimeout(timeoutRef.current), []);
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    set();
    return clear;
  }, [set, clear]);

  return { reset, clear };
}

export default useTimeout;
