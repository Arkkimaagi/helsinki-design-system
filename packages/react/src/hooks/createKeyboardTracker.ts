type FocusableElement = HTMLElement;

type SelectorResult = FocusableElement | Node | EventTarget;

type ElementList = SelectorResult[] | NodeList;

type ChildGetter = (rootElement: HTMLElement) => ElementList;

type EventType = 'next' | 'previous' | 'focusIn' | 'focusOut' | 'focusChange';

type Options = {
  getChildren: ChildGetter;
  keys: {
    next: string[];
    previous: string[];
  };
  loop: boolean;
  onChange?: (event: EventType, tracker: KeyboardTracker, focusItem: FocusItem | null | undefined) => void;
};

type FocusItem = {
  element: SelectorResult;
  index: number;
  hasFocus: boolean;
};

export type KeyboardTrackerProps = Partial<Options> & {
  childSelector?: Options['getChildren'] | string;
};

export type KeyboardTracker = ReturnType<typeof createKeyboardTracker>;

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

  const { keys, ...restProps } = props;
  return {
    ...restDefaults,
    ...restProps,
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

  const setFocusedElementByIndex = (index: number) => {
    if (index < 0) {
      return false;
    }
    const targetData = focusItems[setIndex(index)];
    if (!targetData) {
      return false;
    }
    return forceFocusToElement(targetData.element);
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
    getCurrentItem: () => {
      return currentFocusItem;
    },
    isTrackedElement: (el: SelectorResult | null) => {
      return !!el && focusItems.some((data) => data.element === el);
    },
    setFocusToIndex: (index: number) => {
      const scopedIndex = index < 0 ? focusItems.length + index : Math.min(index, focusItems.length - 1);
      return setFocusedElementByIndex(scopedIndex);
    },
    getElementItem: (element: SelectorResult | null) => {
      return focusItems.find((item) => item.element && item.element === element);
    },
  };
}

function isChild(parent: HTMLElement, assumedChildren: Array<SelectorResult | null | undefined>) {
  return assumedChildren.some((child) => {
    return child && parent.contains(child as Node);
  });
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
  const { keys, getChildren, loop, onChange } = options;
  const focusTracker = createFocusTracker(loop);
  let isFocused = false;
  const triggerOnChange = (type: EventType, element?: FocusableElement | EventTarget | null) => {
    if (!onChange) {
      return;
    }
    const itemByElement = element && focusTracker.getElementItem(element);
    const item = element && !itemByElement ? { element, index: -1, hasFocus: false } : itemByElement;
    onChange(
      type,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      tracker,
      element ? item : focusTracker.getCurrentItem(),
    );
  };
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
  const focusInListener = (focusEvent: FocusEvent) => {
    // focusEvent.currentTarget is the element with listeners, aka. container
    // focusEvent.relatedTarget is the previous element with the focus
    const relevantElement = focusEvent.target;
    if (isFocused) {
      if (!focusTracker.isTrackedElement(relevantElement)) {
        triggerOnChange('focusChange', relevantElement as FocusableElement);
      } else {
        triggerOnChange('focusChange');
      }
      return;
    }
    isFocused = true;
    focusTracker.reset(getChildren(target));
    const item = focusTracker.getElementItem(relevantElement);
    if (item) {
      focusTracker.setFocusToIndex(item.index);
    }
    triggerOnChange('focusIn', relevantElement);
  };
  const focusOutListener = (focusEvent: FocusEvent) => {
    // focusEvent.currentTarget is the element with listeners, aka. container
    // focusEvent.target is the element that got the focus
    const relevantElement = focusEvent.relatedTarget;
    // check activeElement also, because focusout is triggered when
    // browser window loses focus
    if (isChild(target, [relevantElement, document.activeElement])) {
      // do nothing yet
    } else {
      focusTracker.reset([]);
      isFocused = false;
      triggerOnChange('focusOut');
    }
  };

  const eventDisposer = bindEvents({
    target,
    keyListener,
    focusInListener,
    focusOutListener,
  });

  const tracker = {
    dispose: () => {
      eventDisposer();
      focusTracker.reset([]);
    },
    setFocusedElementByIndex: (index: number) => {
      focusTracker.setFocusToIndex(index);
    },
  };
  return tracker;
}
