type FocusableElement = HTMLElement;

type SelectorResult = FocusableElement | Node | EventTarget;

type ElementList = SelectorResult[] | NodeList;

type ChildGetter = (rootElement: HTMLElement) => ElementList;

type EventType = 'next' | 'previous';

type Options = {
  getChildren: ChildGetter;
  keys: {
    next: string[];
    previous: string[];
  };
  loop: boolean;
};

type FocusItem = {
  element: SelectorResult;
  index: number;
  hasFocus: boolean;
};

export type KeyboardTrackerProps = Partial<Options> & {
  childSelector?: Options['getChildren'] | string;
};

const defaults: Options = {
  getChildren: (root) => root.querySelectorAll('a'),
  keys: {
    next: ['ArrowDown', 'ArrowRight'],
    previous: ['ArrowUp', 'ArrowLeft'],
  },
  loop: true,
};

function createOptions(props: KeyboardTrackerProps): Options {
  const { getChildren: defaultGetChildren, keys: defaultkeys, ...restDefaults } = defaults;
  const getChildren: Options['getChildren'] =
    typeof props.childSelector === 'string'
      ? (target) => {
          if (!target) {
            return [];
          }
          return target.querySelectorAll(props.childSelector as string);
        }
      : props.childSelector || defaultGetChildren;
  const { keys } = props;
  return {
    ...restDefaults,
    keys: {
      ...defaultkeys,
      ...keys,
    },
    getChildren,
  };
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
    rect.left + rect.width >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top + rect.height >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function createFocusData(element: SelectorResult, index: number): FocusItem {
  return {
    element,
    index,
    hasFocus: false,
  };
}

function createFocusTracker(loop: boolean) {
  let currentFocusItem: FocusItem | null = null;
  let focusItems: FocusItem[] = [];
  const getIndex = (dir: 1 | -1) => {
    if (!focusItems.length) {
      currentFocusItem = null;
      return -1;
    }
    if (!currentFocusItem) {
      return 0;
    }
    if (dir > 0) {
      if (currentFocusItem.index === focusItems.length - 1 && loop) {
        return 0;
      }
      return Math.min(focusItems.length - 1, currentFocusItem.index + 1);
    }
    if (currentFocusItem.index === 0 && loop) {
      return focusItems.length - 1;
    }
    return Math.max(0, currentFocusItem.index - 1);
  };
  const setIndex = (index: number) => {
    if (currentFocusItem) {
      currentFocusItem.hasFocus = false;
    }
    currentFocusItem = focusItems[index];
    if (!currentFocusItem) {
      return -1;
    }
    currentFocusItem.hasFocus = true;
    return index;
  };

  return {
    reset: (elementList: ElementList) => {
      const elementArray = Array.isArray(elementList) ? elementList : Array.from(elementList);
      currentFocusItem = null;
      focusItems = elementArray.filter(isElementVisibleOnScreen).map(createFocusData);
    },
    next: () => {
      const targetData = focusItems[setIndex(getIndex(1))];
      return forceFocusToElement(targetData.element);
    },
    previous: () => {
      const targetData = focusItems[setIndex(getIndex(-1))];
      return forceFocusToElement(targetData.element);
    },
    hasFocusableItems: () => {
      return focusItems.length > 0;
    },
  };
}

function isChild(parent: HTMLElement, assumedChildren: Array<SelectorResult | null | undefined>) {
  return assumedChildren.some((child) => {
    return child && parent.contains(child as Node);
  });
}

function resolveWasEventWithinElement(parent: HTMLElement, event: FocusEvent) {
  const elements: Array<SelectorResult | null> = [document.activeElement];
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
  keyListener: (event: KeyboardEvent) => void;
  focusInListener: (event: FocusEvent) => void;
  focusOutListener: (event: FocusEvent) => void;
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

function resolveKeyboardCommand(event: KeyboardEvent, keys: Options['keys']): EventType | null {
  const { key } = event;
  if (keys.next.includes(key)) {
    return 'next';
  }
  if (keys.previous.includes(key)) {
    return 'previous';
  }
  return null;
}

export function createKeyboardTracker(target: HTMLElement, props: KeyboardTrackerProps) {
  const options = createOptions(props);
  const { keys, getChildren, loop } = options;
  const focusTracker = createFocusTracker(loop);
  const keyListener = (keyboardEvent: KeyboardEvent) => {
    if (!focusTracker.hasFocusableItems()) {
      return;
    }
    const command = resolveKeyboardCommand(keyboardEvent, keys);
    if (!command) {
      return;
    }
    if (command === 'next' || command === 'previous') {
      const wasElementFocused = focusTracker[command]();
      if (!wasElementFocused) {
        // do nothing yet
      }
    }
  };
  const focusInListener = () => {
    if (focusTracker.hasFocusableItems()) {
      return;
    }
    focusTracker.reset(getChildren(target));
  };
  const focusOutListener = (focusEvent: FocusEvent) => {
    if (resolveWasEventWithinElement(target, focusEvent)) {
      // do nothing yet
    } else {
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
  };
}
