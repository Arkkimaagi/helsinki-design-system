import React, { useCallback, useEffect, useRef } from 'react';

type FocusableElement = HTMLElement;
type SelectorResult = FocusableElement | Node | EventTarget;
type ElementGetter = () => SelectorResult[];
type SubLevelElementGetter = (parent: SelectorResult, index: number) => SelectorResult[];
type ElementSelector = string | ElementGetter;
type RefListener = (element: HTMLElement | null) => React.MutableRefObject<HTMLElement | null>;
type EventListener = (e: Event) => void;
type EventType = 'escape' | 'focusOut' | 'focusIn' | 'next' | 'previous' | 'levelDown' | 'levelUp';
type KeyboardTracker = ReturnType<typeof createKeyboardTracker>;
type Props = {
  childSelector?: ElementSelector;
  escapeSelector?: ElementSelector;
  subLevelSelector?: string | SubLevelElementGetter;
  keys?: {
    nextSibling: string[];
    previousSibling: string[];
    nextLevel?: string[];
    previousLevel?: string[];
    escape?: string[];
  };
  loop?: boolean;
  filterHiddenElements?: boolean;
  forceFocus?: boolean;
  disableOnMultiKeyDown?: boolean;
  onChange?: (type: EventType, element?: HTMLElement) => void;
  isSubLevelVisible?: (element: FocusableElement, index: number) => boolean;
};
type FocusData = {
  element: SelectorResult;
  index: number;
  hasFocus: boolean;
  subLevel: FocusData[] | null;
  parentData: FocusData | null;
};

const defaultProps: Props = {
  childSelector: 'a',
  keys: {
    nextSibling: ['ArrowDown'],
    previousSibling: ['ArrowUp'],
    nextLevel: ['s'],
    previousLevel: ['w'],
  },
  loop: false,
  forceFocus: true,
  disableOnMultiKeyDown: true,
  filterHiddenElements: true,
};

function deepFindData(targetArray: FocusData[], predicate: (item: FocusData) => boolean): FocusData | null {
  const result = targetArray.find(predicate);
  if (result) {
    return result;
  }
  const filteredResult = targetArray.filter((item) => !!item.subLevel && deepFindData(item.subLevel, predicate));
  return filteredResult ? filteredResult[0] : null;
}

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
  return document.activeElement === element;
}

function isElementVisibleOnScreen(element?: SelectorResult) {
  if (!element || !(element as HTMLElement).getBoundingClientRect) {
    return false;
  }
  const rect = (element as HTMLElement).getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function createFocusData(element: SelectorResult, index: number): FocusData {
  return {
    element,
    index,
    hasFocus: false,
    subLevel: null,
    parentData: null,
  };
}
function createFocusTracker() {
  const loop = true;
  let focusedData: FocusData | null = null;
  let data: FocusData[] = [];
  const getIndex = (dir: 1 | -1) => {
    if (!data.length) {
      focusedData = null;
      return -1;
    }
    if (!focusedData) {
      return 0;
    }
    if (dir > 0) {
      if (focusedData.index === data.length - 1 && loop) {
        return 0;
      }
      return Math.min(data.length - 1, focusedData.index + 1);
    }
    if (focusedData.index === 0 && loop) {
      return data.length - 1;
    }
    return Math.max(0, focusedData.index - 1);
  };
  const setIndex = (index: number) => {
    if (focusedData) {
      focusedData.hasFocus = false;
    }
    focusedData = data[index];
    if (!focusedData) {
      return -1;
    }
    focusedData.hasFocus = true;
    return index;
  };
  const getElementData = (element: SelectorResult) => {
    return deepFindData(data, (item: FocusData) => item.element === element);
  };
  const getIndexPath = (focusData: FocusData, target: number[] = []) => {
    const { index } = focusData;
    target.unshift(index);
    if (focusData.parentData) {
      return getIndexPath(focusData.parentData, target);
    }
    return target;
  };
  const getDataFromIndexPath = (indexPath: number[] = []) => {
    const start = data[indexPath[0]];
    if (!start) {
      return null;
    }
    return indexPath.reduce((currentData, pathIndex, index) => {
      // ignore first item because it is picked aboce
      if (index === 0) {
        return currentData;
      }
      return currentData ? currentData.subLevel[pathIndex] : null;
    }, start);
  };
  const getFocusData = (target: number[] | SelectorResult | FocusData): FocusData | null => {
    if ((target as FocusData).element !== undefined) {
      return target as FocusData;
    }
    if (Array.isArray(target)) {
      return getDataFromIndexPath(target as number[]);
    }
    return getElementData(target as SelectorResult);
  };
  return {
    reset: (elementList: SelectorResult[]) => {
      focusedData = null;
      data = elementList.filter(isElementVisibleOnScreen).map(createFocusData);
    },
    next: () => {
      const targetData = data[setIndex(getIndex(1))];
      return forceFocusToElement(targetData.element);
    },
    previous: () => {
      const targetData = data[setIndex(getIndex(-1))];
      return forceFocusToElement(targetData.element);
    },
    levelDown: () => {
      const subLevelItems = focusedData.subLevel && focusedData.subLevel.length ? focusedData.subLevel : null;
      if (!subLevelItems) {
        return false;
      }
      const { element } = subLevelItems[0];
      return forceFocusToElement(element);
    },
    isFocused: () => {
      return data.length > 0;
    },
    getCurrentIndex: () => {
      return focusedData.index;
    },
    getCurrentItem: () => {
      return focusedData || null;
    },
    getCurrentElement: () => {
      return focusedData ? (focusedData.element as HTMLElement) : null;
    },
    getElementData,
    getIndexPath,
    getElementIndexPath: (element: SelectorResult) => {
      const d = getElementData(element);
      return d ? getIndexPath(d) : [];
    },
    insertSublevel: (target: number[] | SelectorResult | FocusData, elementList: SelectorResult[]) => {
      const parent = getFocusData(target);
      if (!parent) {
        return false;
      }
      parent.subLevel = elementList.filter(isElementVisibleOnScreen).map(createFocusData);
      console.log('SUBLEVEL ADDED', parent);
      return true;
    },
    removeSublevel: (indexPath: number[]) => {
      const target = indexPath ? getDataFromIndexPath(indexPath) : focusedData;
      if (!target) {
        return false;
      }
      const { hasFocus } = target;
      target.subLevel = undefined;
      if (hasFocus) {
        // or child had focus....
      }
      return true;
    },
  };
}

/*
function getLogicalSublevelKey(element?: SelectorResult) {
  if (!element || !(element as HTMLElement).getBoundingClientRect) {
    return false;
  }
  const rect = (element as HTMLElement).getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
*/

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
  if (keys.previousLevel && keys.previousLevel.includes(key)) {
    return 'levelUp';
  }
  if (keys.nextLevel && keys.nextLevel.includes(key)) {
    return 'levelDown';
  }
  return null;
}

function createKeyboardTracker(
  target: HTMLElement,
  props: Props,
  childGetter: ElementGetter,
  subLevelGetter?: SubLevelElementGetter,
) {
  const { keys } = props;
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
      } else if (subLevelGetter) {
        const currentItem = focusTracker.getCurrentItem();
        if (!currentItem) {
          return;
        }
        const subLevelItems = subLevelGetter(currentItem.element, currentItem.index);
        if (subLevelItems.length) {
          console.log('subLevelItems', subLevelItems);
          focusTracker.insertSublevel(currentItem, subLevelItems);
        }
      }
    }
    if (command === 'levelDown') {
      focusTracker.levelDown();
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

  const subLevelGetter: SubLevelElementGetter | undefined =
    typeof combinedProps.subLevelSelector === 'string'
      ? () => {
          if (!observedElementRef.current) {
            return [];
          }
          return Array.from(
            observedElementRef.current.querySelectorAll(combinedProps.subLevelSelector as string),
          ) as FocusableElement[];
        }
      : combinedProps.subLevelSelector;

  const refListener: RefListener = useCallback(
    (observedElement: HTMLElement | null) => {
      observedElementRef.current = observedElement;
      if (observedElement) {
        tracker.current = createKeyboardTracker(observedElement, combinedProps, childGetter, subLevelGetter);
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
    refresh: () => {
      //
    },
    forceFocus: (index: number, targetSublevel = false) => {
      if (targetSublevel) {
        //
      }
    },
  };
}
export default useKeyboardNavigation;
