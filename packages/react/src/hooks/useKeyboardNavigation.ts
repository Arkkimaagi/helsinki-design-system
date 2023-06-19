import React, { useCallback, useEffect, useRef } from 'react';

import { KeyboardTrackerProps, createKeyboardTracker } from './createKeyboardTracker';

type RefListener = (element: HTMLElement | null) => React.MutableRefObject<HTMLElement | null>;

type KeyboardTracker = ReturnType<typeof createKeyboardTracker>;

function useKeyboardNavigation(props: KeyboardTrackerProps = {}) {
  const observedElementRef = useRef<HTMLElement | null>(null);
  const tracker = useRef<KeyboardTracker | undefined>(undefined);

  const refListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      observedElementRef.current = observedElement;
      if (observedElement) {
        tracker.current = createKeyboardTracker(observedElement, props);
      }
      return observedElementRef;
    },
    [observedElementRef],
  );

  const cleanUp = useCallback(() => {
    if (tracker.current) {
      tracker.current.dispose();
      tracker.current = undefined;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return {
    ref: refListener,
  };
}
export default useKeyboardNavigation;
