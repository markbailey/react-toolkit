import { useState } from 'react';
import useEventListener from './useEventListener';

// Hook that will keep track of the online status of the device.
// @return boolean;
function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEventListener('online', () => setOnline(navigator.onLine));
  useEventListener('offline', () => setOnline(navigator.onLine));

  return online;
}

export default useOnlineStatus;
