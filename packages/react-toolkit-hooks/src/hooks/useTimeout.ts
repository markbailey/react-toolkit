import { useCallback, useEffect, useRef } from 'react';

const { setTimeout, clearTimeout } = window;

// Hook that setups a timeout that will trigger a callback after a specified
// amount of time. This hook returns a reset and clear function for resetting
// and clearing the timeout.
// params: {function} callback - This function to trigger when timeout elapses.
// params: {number} delay - The value in milleseconds to set as the timeout.
function useTimeout(callback: () => void, delay: number) {
  const timeoutRef = useRef<number>();

  const clear = useCallback(() => clearTimeout(timeoutRef.current), []);
  const set = useCallback(() => {
    clear();
    timeoutRef.current = setTimeout(callback, delay);
  }, [delay, callback]);

  useEffect(() => {
    set();
    return clear;
  }, [set, clear]);

  return Object.freeze({ reset: set, clear });
}

export default useTimeout;
