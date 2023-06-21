import React, { useCallback, useEffect, useRef } from 'react';

import { KeyboardTrackerProps, createKeyboardTracker, KeyboardTracker } from './createKeyboardTracker';

type RefListener = (element: HTMLElement | null) => React.MutableRefObject<HTMLElement | null>;

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
    setFocusedElementByIndex: (index: number) => {
      if (!tracker.current) {
        return;
      }
      tracker.current.setFocusedElementByIndex(index);
    },
    ref: refListener,
  };
}
export default useKeyboardNavigation;
