import React, { useCallback, useEffect, useRef } from 'react';

import { createKeyboardTracker } from './keyboardNavigation/createKeyboardTracker';
import useMutationObserver from './useMutationObserver';
import { KeyboardTracker, KeyboardTrackerProps } from './keyboardNavigation';

type RefListener = (element: HTMLElement | null) => React.MutableRefObject<HTMLElement | null>;

type KeyboardTrackerHookProps = KeyboardTrackerProps & {
  autoUpdateOnMutation?: boolean;
  autoUpdateOnRender?: boolean;
};

function useKeyboardNavigation(props: KeyboardTrackerHookProps = {}) {
  const { autoUpdateOnMutation, autoUpdateOnRender, ...trackerProps } = props;
  const observedElementRef = useRef<HTMLElement | null>(null);
  const tracker = useRef<KeyboardTracker | null>(null);
  const mutationListener = useCallback(() => {
    if (!autoUpdateOnMutation) {
      return;
    }
    if (!observedElementRef.current || !tracker.current) {
      return;
    }
    tracker.current.refresh();
  }, [autoUpdateOnMutation]);
  const mutationObserver = useMutationObserver(mutationListener);
  const refListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      observedElementRef.current = observedElement;
      if (!observedElement || observedElement !== observedElementRef.current) {
        if (tracker.current) {
          tracker.current.dispose();
          tracker.current = null;
        }
        observedElementRef.current = null;
      }
      if (observedElement) {
        tracker.current = createKeyboardTracker(observedElement, trackerProps);
        if (autoUpdateOnMutation) {
          mutationObserver.connect(observedElement);
        }
      }
      return observedElementRef;
    },
    [observedElementRef, autoUpdateOnMutation],
  );

  const cleanUp = useCallback(() => {
    if (tracker.current) {
      tracker.current.dispose();
      tracker.current = null;
    }
    mutationObserver.disconnect();
  }, []);

  useEffect(() => {
    if (autoUpdateOnRender) {
      if (tracker.current) {
        tracker.current.refresh();
      }
    }
  });

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return {
    setFocusedElementByIndex: (index: number | number[]) => {
      return tracker.current ? tracker.current.setFocusedElementByIndex(index) : undefined;
    },
    ref: refListener,
    refresh: () => {
      return tracker.current ? tracker.current.refresh() : undefined;
    },
    setFocusToElementDataOrPath: (...args: Parameters<KeyboardTracker['setFocusToElementDataOrPath']>) => {
      return tracker.current ? tracker.current.setFocusToElementDataOrPath(...args) : undefined;
    },
    getElement: () => {
      return observedElementRef.current;
    },
    setKeys: (...args: Parameters<KeyboardTracker['setKeys']>) => {
      return tracker.current ? tracker.current.setKeys(...args) : undefined;
    },
  };
}
export default useKeyboardNavigation;
