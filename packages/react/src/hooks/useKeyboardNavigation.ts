import React, { useCallback, useEffect, useRef } from 'react';

import { KeyboardTrackerProps, createKeyboardTracker, KeyboardTracker } from './createKeyboardTracker';
import useMutationObserver from './useMutationObserver';

type RefListener = (element: HTMLElement | null) => React.MutableRefObject<HTMLElement | null>;
type KeyboardTrackerHookProps = KeyboardTrackerProps & {
  autoUpdateOnMutation?: boolean;
  autoUpdateOnRender?: boolean;
};
function useKeyboardNavigation(props: KeyboardTrackerHookProps = {}) {
  const { autoUpdateOnMutation, autoUpdateOnRender, ...trackerProps } = props;
  const observedElementRef = useRef<HTMLElement | null>(null);
  const tracker = useRef<KeyboardTracker | undefined>(undefined);
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
      tracker.current = undefined;
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
    setFocusedElementByIndex: (index: number) => {
      if (!tracker.current) {
        return;
      }
      tracker.current.setFocusedElementByIndex(index);
    },
    ref: refListener,
    refresh: () => {
      if (!tracker.current) {
        return;
      }
      tracker.current.refresh();
    },
  };
}
export default useKeyboardNavigation;
