import { MutableRefObject } from 'react';
import useEventListener from './useEventListener';

declare type Callback = (event: Event) => void;

// Hook to add an 'click' & 'keyup' event to document that triggers a callback.
// A use case would be a dropdown menu that can be dismissed by clicking outside of it.
// @param {Callback} callback - The function to execute when event is triggered.
function useClickOutside<E extends Element>(ref: MutableRefObject<E | null>, callback: Callback) {
  const onEvent = (event: Event) => {
    if (ref.current?.contains(event.target as Node))
      return;
    callback(event);
  };

  useEventListener('click', onEvent, document.body);
  useEventListener('keyup', onEvent, document.body);
}

export default useClickOutside;
