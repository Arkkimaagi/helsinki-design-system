import React, { useCallback, useEffect, useRef } from 'react';

type FocusableElement = HTMLElement;
type SelectorResult = FocusableElement | Node | EventTarget;
type ElementGetter = () => SelectorResult[];
type ElementSelector = string | ElementGetter;
type RefListener = (element: HTMLElement) => React.MutableRefObject<HTMLElement | null>;
type EventListener = (e: Event) => void;
type EventType = 'escape' | 'focusOut' | 'focusIn' | 'next' | 'previous' | 'levelDown' | 'levelUp';
type KeyboardTracker = ReturnType<typeof createKeyboardTracker>;
type Props = {
  childSelector?: ElementSelector;
  escapeSelector?: ElementSelector;
  subLevelSelector?: ElementSelector;
  keys?: {
    nextSibling: string[];
    previousSibling: string[];
    nextLevel?: string[];
    previousLevel?: string[];
    escape?: string[];
  };
  loop?: boolean;
  forceFocus?: boolean;
  disableOnMultiKeyDown?: boolean;
  onChange?: (type: EventType, element?: HTMLElement) => void;
};

const defaultProps: Props = {
  childSelector: 'a',
  keys: {
    nextSibling: ['ArrowDown'],
    previousSibling: ['ArrowUp'],
  },
  loop: false,
  forceFocus: true,
  disableOnMultiKeyDown: true,
};

function forceFocusToElement(element?: SelectorResult) {
  if (!element || !(element as FocusableElement).focus) {
    return false;
  }
  if (document.activeElement === element) {
    return true;
  }
  const focusableElement = element as FocusableElement;
  focusableElement.focus();
  if (document.activeElement !== element) {
    focusableElement.setAttribute('tabindex', '-1');
    focusableElement.focus();
  }
  return document.activeElement !== element;
}

function createFocusTracker() {
  const loop = true;
  let currentIndex = -1;
  let elements: SelectorResult[] = [];
  const getIndex = (dir: 1 | -1) => {
    if (!elements.length) {
      currentIndex = -1;
      return currentIndex;
    }
    if (dir > 0) {
      if (currentIndex === elements.length - 1 && loop) {
        currentIndex = 0;
      } else {
        currentIndex = Math.min(elements.length - 1, currentIndex + 1);
      }
    } else if (currentIndex === 0 && loop) {
      currentIndex = elements.length - 1;
    } else {
      currentIndex = Math.max(0, currentIndex - 1);
    }
    return currentIndex;
  };
  return {
    reset: (elementList: SelectorResult[]) => {
      currentIndex = -1;
      elements = elementList;
    },
    next: () => {
      console.log('currentIndex', currentIndex);
      const index = getIndex(1);
      console.log('index', index);
      return forceFocusToElement(elements[index]);
    },
    previous: () => {
      const index = getIndex(-1);
      return forceFocusToElement(elements[index]);
    },
    isFocused: () => {
      return elements.length > 0;
    },
  };
}

function isChild(parent: HTMLElement, assumedChildren: Array<SelectorResult | null | undefined>) {
  return assumedChildren.some((child) => {
    return child && parent.contains(child as Node);
  });
}

function resolveWasEventWithinElement(parent: HTMLElement, event: FocusEvent) {
  const elements: Array<SelectorResult> = [document.activeElement];
  if (event.currentTarget) {
    elements.push(event.currentTarget);
  }
  if (event.relatedTarget) {
    elements.push(event.relatedTarget);
  }
  return isChild(parent, elements);
}

function bindEvents({
  target,
  keyListener,
  focusInListener,
  focusOutListener,
}: {
  target: HTMLElement;
  keyListener: EventListener;
  focusInListener: EventListener;
  focusOutListener: EventListener;
}) {
  const addListeners = () => {
    target.addEventListener('focusin', focusInListener);
    target.addEventListener('focusout', focusOutListener);
    target.addEventListener('keyup', keyListener);
  };
  const removeListeners = () => {
    target.removeEventListener('focusin', focusInListener);
    target.removeEventListener('focusout', focusOutListener);
    target.removeEventListener('keyup', keyListener);
  };
  addListeners();
  return () => removeListeners();
}

function resolveKeyboardCommand(event: KeyboardEvent, keys: Props['keys']): EventType | null {
  const { key } = event;
  if (keys.escape && keys.escape.includes(key)) {
    return 'escape';
  }
  if (keys.nextSibling.includes(key)) {
    return 'next';
  }
  if (keys.previousSibling.includes(key)) {
    return 'previous';
  }
  return null;
}

function createKeyboardTracker(target: HTMLElement, keys: Props['keys'], childGetter: ElementGetter) {
  const focusTracker = createFocusTracker();
  const keyListener = (keyboardEvent: KeyboardEvent) => {
    if (!focusTracker.isFocused()) {
      return;
    }
    const command = resolveKeyboardCommand(keyboardEvent, keys);
    if (!command) {
      return;
    }
    if (command === 'escape') {
      //
    }
    if (command === 'next' || command === 'previous') {
      const wasElementFocused = focusTracker[command]();
      if (!wasElementFocused) {
        console.log('element was not focusable');
      }
    }
  };
  const focusInListener = () => {
    if (focusTracker.isFocused()) {
      return;
    }
    focusTracker.reset(childGetter());
  };
  const focusOutListener = (focusEvent: FocusEvent) => {
    if (resolveWasEventWithinElement(target, focusEvent)) {
      console.log('WITHIN');
    } else {
      console.log('OUT');
      focusTracker.reset([]);
    }
  };

  const eventDisposer = bindEvents({
    target,
    keyListener,
    focusInListener,
    focusOutListener,
  });

  return {
    dispose: () => {
      eventDisposer();
      focusTracker.reset([]);
    },
    insertLevel: () => {
      //
    },
    removeLevel: () => {
      //
    },
  };
}

function useKeyboardNavigation(props: Props = {}) {
  const { keys } = props;
  const combinedProps = {
    ...defaultProps,
    ...props,
    keys: {
      ...defaultProps.keys,
      ...keys,
    },
  };
  const observedElementRef = useRef<HTMLElement | null>(null);
  const tracker = useRef<KeyboardTracker | undefined>(undefined);

  // memoize:
  const childGetter: ElementGetter =
    typeof combinedProps.childSelector === 'string'
      ? () => {
          if (!observedElementRef.current) {
            return [];
          }
          return Array.from(
            observedElementRef.current.querySelectorAll(combinedProps.childSelector as string),
          ) as FocusableElement[];
        }
      : combinedProps.childSelector;

  const refListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      observedElementRef.current = observedElement;
      if (observedElement) {
        tracker.current = createKeyboardTracker(observedElement, combinedProps.keys, childGetter);
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
    getCurrentElement: () => {
      return observedElementRef.current;
    },
    reset: () => {
      //
    },
    changeToSubmenu: () => {
      //
    },
  };
}
export default useKeyboardNavigation;
