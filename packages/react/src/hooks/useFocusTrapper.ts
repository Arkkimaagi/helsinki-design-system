import React, { useCallback, useEffect, useRef } from 'react';

import { FocusTrapper, createFocusTrapper, FocusTrapperProps, Position } from './focusTrapper/createFocusTrapper';

type RefListener = (element: HTMLElement | null) => React.MutableRefObject<HTMLElement | null>;

function useFocusTrapper(props: FocusTrapperProps) {
  const firstTrapperRef = useRef<HTMLElement | null>(null);
  const lastTrapperRef = useRef<HTMLElement | null>(null);
  const tracker = useRef<FocusTrapper | undefined>(undefined);

  const assignElement = (position: Position, element: HTMLElement | null) => {
    if (!tracker.current) {
      tracker.current = createFocusTrapper(props);
    }
    tracker.current.registerTrackerElement(position, element);
  };

  const firstTrapperRefListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      firstTrapperRef.current = observedElement;
      assignElement('first', observedElement);
      return firstTrapperRef;
    },
    [tracker],
  );

  const lastTrapperRefListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      lastTrapperRef.current = observedElement;
      assignElement('last', observedElement);
      return lastTrapperRef;
    },
    [tracker],
  );

  const cleanUp = useCallback(() => {
    if (tracker.current) {
      tracker.current.dispose();
      firstTrapperRef.current = null;
      lastTrapperRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return {
    refForFirstTrapper: firstTrapperRefListener,
    refForLastTrapper: lastTrapperRefListener,
    disableElements: () => {
      if (tracker.current) {
        tracker.current.disableTracking();
      }
    },
    enableElements: () => {
      if (tracker.current) {
        tracker.current.enableTracking();
      }
    },
    getElementPosition: (element?: HTMLElement | Node | EventTarget | null): Position | undefined => {
      if (tracker.current) {
        return tracker.current.getElementPosition(element);
      }
      return undefined;
    },
  };
}
export default useFocusTrapper;
