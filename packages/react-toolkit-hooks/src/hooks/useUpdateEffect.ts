import { useEffect, useRef } from 'react';

// Hook to only trigger the callback when the dependencies change and not on first render.
// @param {function} callback - The function to execute when event is triggered.
// @param {array} dependencies - An array of dependencies used to trigger the useEffect.
function useUpdateEffect<Deps>(callback: () => void, dependencies: Deps[]) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    return callback();
  }, dependencies);
}

export default useUpdateEffect;
