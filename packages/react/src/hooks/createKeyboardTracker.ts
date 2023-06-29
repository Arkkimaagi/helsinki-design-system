type FocusableElement = HTMLElement;

type SelectorResult = FocusableElement | Node | EventTarget;

type EventType = 'next' | 'previous' | 'focusIn' | 'focusOut' | 'focusChange' | 'dataUpdated' | 'levelDown' | 'levelUp';

type NodeSelector = (parent: HTMLElement, path: ElementPath) => NodeList;
type Selector = (parent: HTMLElement, path: ElementPath) => HTMLElement[];

type Selectors = {
  containerElements?: Selector;
  focusableElements: Selector;
};

type NavigationOptions = {
  next?: FocusableElement;
  previous?: FocusableElement;
  levelUp?: FocusableElement;
  levelDown?: FocusableElement;
};

type ElementData = {
  type: 'untracked' | 'root' | 'container' | 'focusable';
  index: number;
  element?: HTMLElement;
  childContainers?: ElementData[];
  focusable?: ElementData[];
};

type ElementPath = ElementData[];

type Options = {
  keys: {
    next: string[];
    previous: string[];
    levelDown: string[];
    levelUp: string[];
  };
  loop: boolean;
  onChange?: (event: EventType, tracker: KeyboardTracker, path: ElementPath | null | undefined) => void;
  selectors: Selectors;
  autoFocusAfterUpdate: boolean;
};

/*
type FocusItem = {
  element: SelectorResult;
  index: number;
  hasFocus: boolean;
};


type TrackerData = {
  elements: TrackedElements;
  index: number;
  focusedElementIndex: number;
};
*/

export type KeyboardTrackerProps = Partial<Options> & {
  focusableSelector?: NodeSelector | string;
  containerSelector?: NodeSelector | string;
};

export type KeyboardTracker = ReturnType<typeof createKeyboardTracker>;
type ElementTracker = ReturnType<typeof createElementTracker>;

const defaults: Options = {
  keys: {
    next: ['ArrowDown', 'ArrowRight'],
    previous: ['ArrowUp', 'ArrowLeft'],
    levelDown: [''],
    levelUp: ['Escape'],
  },
  loop: true,
  autoFocusAfterUpdate: true,
  selectors: {
    focusableElements: (root: HTMLElement) => {
      return Array.from(root.querySelectorAll('a'));
    },
  },
};

const searchMiss: ElementData = {
  type: 'untracked',
  index: -1,
  element: undefined,
};

function convertPropToSelectorFunction(prop: NodeSelector | string): Selector {
  return typeof prop === 'string'
    ? (target) => {
        if (!target) {
          return [];
        }
        return Array.from(target.querySelectorAll(prop as string)) as HTMLElement[];
      }
    : (target, path) => {
        return Array.from((prop as NodeSelector)(target, path)) as HTMLElement[];
      };
}

function createSelectorsFromDefaultsAndProps(defaultOptions: Options, props: KeyboardTrackerProps): Selectors {
  const { selectors: defaultSelectors } = defaultOptions;
  const { focusableSelector, containerSelector } = props;
  const selectors: Selectors = { ...defaultSelectors };
  if (focusableSelector) {
    selectors.focusableElements = convertPropToSelectorFunction(focusableSelector);
  }
  if (containerSelector) {
    selectors.containerElements = convertPropToSelectorFunction(containerSelector);
  }

  return selectors;
}

function createOptions(props: KeyboardTrackerProps): Options {
  const { keys: defaultkeys, ...restDefaults } = defaults;
  const selectors = createSelectorsFromDefaultsAndProps(defaults, props);

  // destructuring also unused vars to keep them from restProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { keys, focusableSelector, containerSelector, ...restProps } = props;
  return {
    ...restDefaults,
    ...restProps,
    keys: {
      ...defaultkeys,
      ...keys,
    },
    selectors,
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

function isChild(parent: HTMLElement, assumedChildren: Array<SelectorResult | null | undefined>) {
  return assumedChildren.some((child) => {
    return child && parent.contains(child as Node);
  });
}

function getArrayItemByIndex<T>(arr: T[] | null | undefined, index: number): T | undefined {
  if (!arr || !arr.length) {
    return undefined;
  }
  const targetIndex = index < 0 ? arr.length + index : index;
  if (targetIndex < 0) {
    return undefined;
  }
  return arr[targetIndex];
}

/*
function createFocusData(element: SelectorResult, index = -1): FocusItem {
  return {
    element,
    index,
    hasFocus: false,
  };
}


function hasTrackedElement(trackedElements: TrackedElements, element: SelectorResult): boolean {
  if (trackedElements.containerElement && trackedElements.containerElement === element) {
    return true;
  }
  if (trackedElements.focusableElements && !!trackedElements.focusableElements.includes(element as HTMLElement)) {
    return true;
  }

  return false;
}

function getElementIndex(
  parent: HTMLElement,
  path: ElementPath,
  predicate: (el: HTMLElement) => boolean,
  selector?: Selector,
): number {
  if (!selector) {
    return -1;
  }
  return selector(parent, path).findIndex(predicate);
}


function getElementPath(path: ElementPath, target: HTMLElement, selectors: Selectors): ElementPath {
  const parentPosition = path[path.length - 1];
  if (!parentPosition || !parentPosition.element) {
    return [...searchMiss];
  }
  const parent = parentPosition.element;
  if (parent === target) {
    return path;
  }
  const predicate = (element: HTMLElement) => element === target;

  const focusableIndex = getElementIndex(parent, path, predicate, selectors.focusableElements);
  if (focusableIndex > -1) {
    path.push({ type: 'focusable', index: focusableIndex, element: target });
    return path;
  }

  const containerIndex = getElementIndex(parent, path, predicate, selectors.containerElements);
  if (containerIndex > -1) {
    path.push({ type: 'container', index: containerIndex, element: target });
    return path;
  }

  const subLevelIndex = getElementIndex(parent, path, predicate, selectors.containerElements);
  if (subLevelIndex > -1) {
    path.push({ type: 'container', index: subLevelIndex, element: parent });
    return getElementPath(path, target, selectors);
  }

  return path;
}

*/

function findElementPath(searchPath: ElementPath, target: HTMLElement): ElementPath {
  const startPoint = searchPath[searchPath.length - 1];
  if (!startPoint || !startPoint.element || !isChild(startPoint.element, [target])) {
    return [{ ...searchMiss }];
  }
  const predicate = (data: ElementData) => data.element === target;
  if (startPoint.focusable) {
    const hit = startPoint.focusable.find(predicate);
    if (hit) {
      return [...searchPath, hit];
    }
  }
  if (startPoint.childContainers) {
    const hit = startPoint.childContainers.find(predicate);
    if (hit) {
      return [...searchPath, hit];
    }
    const childHit = startPoint.childContainers
      .map((data) => {
        return findElementPath([...searchPath, data], target);
      })
      .filter((result) => {
        const data = result[result.length - 1];
        return data.element === target;
      });
    return childHit.length ? childHit[0] : [{ ...searchMiss }];
  }
  return [{ ...searchMiss }];
}

function addMappedElements(path: ElementPath, selectors: Selectors) {
  const targetData = path[path.length - 1];
  const element = targetData && targetData.element;
  if (!element) {
    return;
  }
  const containers =
    selectors.containerElements && selectors.containerElements(element, path).filter(isElementVisibleOnScreen);
  if (containers && containers.length) {
    const childContainers: ElementData[] = containers.map((container, elementIndex) => {
      const data: ElementData = {
        element: container,
        type: 'container',
        index: elementIndex,
      };
      return data;
    });
    if (childContainers.length) {
      targetData.childContainers = childContainers;
      childContainers.forEach((data) => {
        addMappedElements([...path, data], selectors);
      });
    }
  }

  const focusableElements = selectors.focusableElements(element, path).filter(isElementVisibleOnScreen);
  const focusable: ElementData[] = focusableElements.map((focusableElement, elementIndex) => {
    return {
      element: focusableElement,
      index: elementIndex,
      type: 'focusable',
    };
  });
  if (focusable.length) {
    targetData.focusable = focusable;
  }
}
function mapAllElements(root: HTMLElement, selectors: Selectors) {
  const rootData: ElementData = {
    type: 'root',
    element: root,
    index: 0,
  };
  addMappedElements([rootData], selectors);
  return rootData;
}

function disposeData(elementData: ElementData | null) {
  /* eslint-disable no-param-reassign */
  if (!elementData) {
    return;
  }
  elementData.element = undefined;
  if (elementData.childContainers) {
    elementData.childContainers.forEach(disposeData);
    elementData.childContainers = undefined;
  }
  if (elementData.focusable) {
    elementData.focusable.forEach(disposeData);
    elementData.focusable = undefined;
  }
  /* eslint-enable no-param-reassign */
}

function returnValidElementData(data?: ElementData | null) {
  return data && data.index > -1 && !!data.element ? data : null;
}

function isValidPath(elementPath: ElementPath): boolean {
  return !!returnValidElementData(getArrayItemByIndex(elementPath, -1));
}

function createElementTracker(root: HTMLElement, selectors: Selectors) {
  let rootData: ElementData | null = null;

  const getPath = (element: HTMLElement) => {
    if (!rootData) {
      return null;
    }
    const path = findElementPath([rootData], element);
    const data = path[path.length - 1];
    if (!data || data.index === -1) {
      return null;
    }
    return path;
  };

  const collectDeepestFocusable = (parent: ElementData) => {
    if (parent.childContainers) {
      return parent.childContainers.reduce((currentList, container) => {
        if (!container.focusable) {
          return currentList;
        }
        return [...currentList, ...container.focusable];
      }, [] as ElementData[]);
    }
    if (parent.focusable) {
      return parent.focusable;
    }
    return [];
  };

  const getPathToContainerByIndexes = (indexes: number[]): ElementPath => {
    let parent = rootData;
    let notFound = false;
    if (!indexes.length) {
      return [parent || searchMiss];
    }
    return indexes.map((index) => {
      if (notFound || !parent) {
        return searchMiss;
      }
      const containerCount = parent.childContainers ? parent.childContainers.length : 0;
      const adjustedIndex = index < 0 ? containerCount + index : index;
      const target = parent.childContainers && parent.childContainers[adjustedIndex];
      if (!target || target.index !== adjustedIndex) {
        notFound = true;
        return searchMiss;
      }
      parent = target;
      return target;
    });
  };

  const getPathToFocusableByIndexes = (indexes: number[]): ElementPath | null => {
    if (!indexes.length) {
      return null;
    }
    const copy = [...indexes];
    const last = copy.pop() as number;
    const parentPath = getPathToContainerByIndexes(copy);
    const parent = returnValidElementData(getArrayItemByIndex<ElementData>(parentPath, -1));
    if (!parent) {
      return null;
    }
    const focusableCount = parent.focusable ? parent.focusable.length : 0;
    const adjustedIndex = last < 0 ? focusableCount + last : last;
    const focusable = returnValidElementData(parent.focusable && parent.focusable[adjustedIndex]);
    if (focusable && focusable.index === adjustedIndex) {
      parentPath.push(focusable);
      return parentPath;
    }
    return null;
  };

  const getRelatedFocusableElements = (container: ElementData): FocusableElement[] => {
    const list = collectDeepestFocusable(container);
    return list.map((data) => data.element).filter((el) => !!el) as FocusableElement[];
  };

  const getRelatedFocusables = (pathToFocusable: ElementPath): FocusableElement[] => {
    // (parent is index -2 on the path and -1 is the current element, the focusable)
    // parent is the container holding the focusable
    // grandparent is the container holding parent and it siblings
    // related focusables are parent's and its sibling container's focusables.
    const containerParent = getArrayItemByIndex(pathToFocusable, -3) || getArrayItemByIndex(pathToFocusable, -2);
    if (!containerParent) {
      return [];
    }
    return getRelatedFocusableElements(containerParent);
  };

  const getVerticalNavigationElements = (
    pathToFocusable: ElementPath,
  ): { levelUp?: FocusableElement; levelDown?: FocusableElement } => {
    // if parent container has childContainers and there are focusables, then user can navigate down
    // if parent's parent has focusables (other than current), then user can navigate up.
    const parent = getArrayItemByIndex(pathToFocusable, -2);
    if (!parent) {
      return {};
    }
    const firstContainerDown = parent.childContainers && parent.childContainers[0];
    const levelDown = firstContainerDown && getRelatedFocusableElements(firstContainerDown)[0];

    const grandParent = getArrayItemByIndex(pathToFocusable, -3);
    const closestFocusableUp = grandParent && grandParent.focusable && getArrayItemByIndex(grandParent.focusable, -1);

    return {
      levelDown,
      levelUp: closestFocusableUp && closestFocusableUp.element,
    };
  };

  const getNavigationOptions = (elementOrPath: HTMLElement | ElementPath, loop: boolean): NavigationOptions => {
    const path = Array.isArray(elementOrPath) ? (elementOrPath as ElementPath) : getPath(elementOrPath as HTMLElement);
    if (!path) {
      return {};
    }
    const data = path[path.length - 1];
    if (!data || !data.type || data.index === -1 || data.type !== 'focusable') {
      return {};
    }

    const getNextIndex = (arr: unknown[], startIndex: number, loopIndex: boolean): number => {
      if (startIndex === -1) {
        return -1;
      }
      const { length } = arr;
      const next = startIndex + 1;
      if (next >= length) {
        return loopIndex ? 0 : -1;
      }
      return next;
    };
    const getPreviousIndex = (arr: unknown[], startIndex: number, loopIndex: boolean): number => {
      if (startIndex === -1) {
        return -1;
      }
      const { length } = arr;
      const previous = startIndex - 1;
      if (previous < 0) {
        return loopIndex ? length - 1 : -1;
      }
      return previous;
    };

    const focusableSiblings = getRelatedFocusables(path);
    const currentElementIndex = focusableSiblings.findIndex((el) => el === data.element);
    const next = focusableSiblings[getNextIndex(focusableSiblings, currentElementIndex, loop)];
    const previous = focusableSiblings[getPreviousIndex(focusableSiblings, currentElementIndex, loop)];

    const { levelDown, levelUp } = getVerticalNavigationElements(path);
    return {
      next,
      previous,
      levelUp,
      levelDown,
    };
  };

  return {
    getPath,
    getNavigationOptions,
    getPathToFocusableByIndexes,
    getPathToContainerByIndexes,
    getClosestFocusableElements: getRelatedFocusableElements,
    dispose: () => {
      disposeData(rootData);
    },
    refresh: () => {
      disposeData(rootData);
      rootData = mapAllElements(root, selectors);
    },
    getRootData: () => {
      return rootData;
    },
  };
}

function createFocusTracker(elementTracker: ElementTracker, loop: boolean) {
  let pathToCurrentFocusedElement: ElementPath | null = null;

  const storeValidPathToFocusedElement = (path?: ElementPath | null) => {
    if (!path) {
      pathToCurrentFocusedElement = null;
    } else {
      const lastItemOnPath = getArrayItemByIndex(path, -1);
      if (!lastItemOnPath || !returnValidElementData(lastItemOnPath) || lastItemOnPath.type !== 'focusable') {
        pathToCurrentFocusedElement = null;
      } else {
        pathToCurrentFocusedElement = path;
      }
    }
    return path ? pathToCurrentFocusedElement === path : true;
  };

  const getStoredFocusedElement = (): FocusableElement | null => {
    if (!pathToCurrentFocusedElement) {
      return null;
    }
    const data = returnValidElementData(getArrayItemByIndex(pathToCurrentFocusedElement, -1));
    return (data && data.element) || null;
  };

  const setCurrentPathToFocusedElement = (dataOrPath?: Partial<ElementData> | ElementPath | null): boolean => {
    if (!dataOrPath) {
      return storeValidPathToFocusedElement(null);
    }
    if (Array.isArray(dataOrPath)) {
      return storeValidPathToFocusedElement(dataOrPath);
    }
    return storeValidPathToFocusedElement(dataOrPath.element ? elementTracker.getPath(dataOrPath.element) : null);
  };

  const getElemenData = (element: SelectorResult | null) => {
    const path = elementTracker.getPath(element as HTMLElement);
    if (path && isValidPath(path)) {
      return getArrayItemByIndex(path, -1);
    }
    return null;
  };

  const setFocusToCurrentElement = () => {
    if (!pathToCurrentFocusedElement) {
      return false;
    }
    const data = getArrayItemByIndex(pathToCurrentFocusedElement, -1) as ElementData;
    return forceFocusToElement(data.element);
  };

  const setFocusByIndexes = (indexes: number[]) => {
    const path = elementTracker.getPathToFocusableByIndexes(indexes);
    setCurrentPathToFocusedElement(path);
    return setFocusToCurrentElement();
  };

  const setFocusToContainer = (container: ElementData | null | undefined, index: number) => {
    if (!container) {
      return false;
    }
    const focusable = getArrayItemByIndex(elementTracker.getClosestFocusableElements(container), index);
    const path = focusable && elementTracker.getPath(focusable);
    const isValid = storeValidPathToFocusedElement(path);
    if (isValid) {
      setFocusToCurrentElement();
    }
    return isValid;
  };

  return {
    reset: () => {
      pathToCurrentFocusedElement = null;
    },
    next: () => {
      if (!pathToCurrentFocusedElement) {
        return setFocusToContainer(elementTracker.getRootData(), 0);
      }
      const { next } = elementTracker.getNavigationOptions(pathToCurrentFocusedElement, loop);
      return forceFocusToElement(next);
    },
    previous: () => {
      if (!pathToCurrentFocusedElement) {
        return setFocusToContainer(elementTracker.getRootData(), -1);
      }
      const { previous } = elementTracker.getNavigationOptions(pathToCurrentFocusedElement, loop);
      return forceFocusToElement(previous);
    },
    levelDown: () => {
      if (!pathToCurrentFocusedElement) {
        return setFocusToContainer(elementTracker.getRootData(), 0);
      }
      const { levelDown } = elementTracker.getNavigationOptions(pathToCurrentFocusedElement, loop);
      return forceFocusToElement(levelDown);
    },
    levelUp: () => {
      if (!pathToCurrentFocusedElement) {
        return setFocusToContainer(elementTracker.getRootData(), 0);
      }
      const { levelUp } = elementTracker.getNavigationOptions(pathToCurrentFocusedElement, loop);
      return forceFocusToElement(levelUp);
    },
    hasFocusableItems: (container: ElementData) => {
      return elementTracker.getClosestFocusableElements(container).length > 0;
    },
    getCurrentFocusedElementData: () => {
      return pathToCurrentFocusedElement ? getArrayItemByIndex(pathToCurrentFocusedElement, -1) : null;
    },
    isTrackedElement: (el: SelectorResult | null) => {
      if (!el) {
        return false;
      }
      const path = elementTracker.getPath(el as HTMLElement);
      return path && !!isValidPath(path);
    },
    resetFocusToCurrent: () => {
      return setFocusToCurrentElement();
    },
    storeFocusedElement: (element?: SelectorResult | null) => {
      return element ? setCurrentPathToFocusedElement({ element } as Partial<ElementData>) : false;
    },
    getStoredFocusedElement,
    storeValidPathToFocusedElement,
    getPathToCurrentFocusedElement: () => pathToCurrentFocusedElement,
    getElemenData,
    setFocusByIndexes,
    setFocusToElement: (element?: FocusableElement | null) => {
      setCurrentPathToFocusedElement(element ? { element } : null);
      return setFocusToCurrentElement();
    },
    setFocusToElementDataOrPath: (dataOrPath?: Partial<ElementData> | ElementPath | null) => {
      setCurrentPathToFocusedElement(dataOrPath);
      return setFocusToCurrentElement();
    },
  };
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
  console.log('key', key, keys);
  if (keys.next.includes(key)) {
    return 'next';
  }
  if (keys.previous.includes(key)) {
    return 'previous';
  }
  if (keys.levelDown && keys.levelDown.includes(key)) {
    return 'levelDown';
  }
  if (keys.levelUp && keys.levelUp.includes(key)) {
    return 'levelUp';
  }
  return null;
}

export function createKeyboardTracker(target: HTMLElement, props: KeyboardTrackerProps) {
  const options = createOptions(props);
  const { loop, onChange, selectors, autoFocusAfterUpdate } = options;
  const elementTracker = createElementTracker(target, selectors);
  const focusTracker = createFocusTracker(elementTracker, loop);
  let isFocused = false;

  const triggerOnChange = (type: EventType, path?: ElementPath | null) => {
    if (!onChange) {
      return;
    }
    onChange(
      type,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      tracker,
      path,
    );
  };

  const updateElementData = (focusActiveElement: boolean) => {
    const currentPath = focusTracker.getPathToCurrentFocusedElement();
    elementTracker.refresh();
    focusTracker.reset();
    if (focusActiveElement && currentPath && document.activeElement && isChild(target, [document.activeElement])) {
      focusTracker.setFocusToElement(document.activeElement as HTMLElement);
    }
    triggerOnChange('dataUpdated', focusTracker.getPathToCurrentFocusedElement());
  };
  const disposeElementData = () => {
    elementTracker.dispose();
    focusTracker.storeFocusedElement(null);
    triggerOnChange('dataUpdated');
  };

  const keyListener = (keyboardEvent: KeyboardEvent) => {
    const command = resolveKeyboardCommand(keyboardEvent, options.keys);
    console.log('command', command);
    if (!command) {
      return;
    }
    if (command === 'next' || command === 'previous' || command === 'levelDown' || command === 'levelUp') {
      focusTracker[command]();
    }
  };

  const focusInListener = (focusEvent: FocusEvent) => {
    // focusEvent.currentTarget is the element with listeners, aka. container
    // focusEvent.relatedTarget is the previous element with the focus
    const relevantElement = focusEvent.target;
    if (isFocused) {
      if (!focusTracker.isTrackedElement(relevantElement)) {
        triggerOnChange('focusChange');
      } else {
        const focusWasChanged = focusTracker.storeFocusedElement(relevantElement);
        if (focusWasChanged) {
          triggerOnChange('focusChange', focusTracker.getPathToCurrentFocusedElement());
        }
      }
      return;
    }
    isFocused = true;
    updateElementData(false);
    focusTracker.storeValidPathToFocusedElement(elementTracker.getPath(relevantElement as HTMLElement));
    triggerOnChange(
      'focusIn',
      focusTracker.getPathToCurrentFocusedElement() || [
        { ...searchMiss, element: relevantElement as FocusableElement },
      ],
    );
  };

  const focusOutListener = (focusEvent: FocusEvent) => {
    // focusEvent.currentTarget is the element with listeners, aka. container
    // focusEvent.target is the element that got the focus
    const relevantElement = focusEvent.relatedTarget;
    // check also document.activeElement, because focusout is triggered when
    // browser window loses focus
    if (isChild(target, [relevantElement, document.activeElement])) {
      // do nothing yet
    } else {
      const isTrackedElement = focusTracker.isTrackedElement(relevantElement);
      const current = focusTracker.getPathToCurrentFocusedElement();
      disposeElementData();
      isFocused = false;

      triggerOnChange(
        'focusOut',
        isTrackedElement ? current || null : [{ ...searchMiss, element: relevantElement as FocusableElement }],
      );
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
      focusTracker.reset();
      elementTracker.dispose();
    },
    setFocusedElementByIndex: (index: number | number[]) => {
      const indexes = Array.isArray(index) ? index : [index];
      return focusTracker.setFocusByIndexes(indexes);
    },
    setFocusToElement: (element?: FocusableElement | null) => {
      return focusTracker.setFocusToElement(element);
    },
    setFocusToElementDataOrPath: (dataOrPath?: Partial<ElementData> | ElementPath | null) => {
      return focusTracker.setFocusToElementDataOrPath(dataOrPath);
    },
    refresh: () => {
      updateElementData(autoFocusAfterUpdate);
    },
    getNavigationOptions: (): ReturnType<ElementTracker['getNavigationOptions']> => {
      const current = focusTracker.getCurrentFocusedElementData();
      return current && current.element ? elementTracker.getNavigationOptions(current.element, loop) : {};
    },
    getFocusedElement: () => {
      const current = focusTracker.getCurrentFocusedElementData();
      return (current && current.element) || document.activeElement;
    },
    setKeys: (newKeys: Partial<Options['keys']>) => {
      options.keys = {
        ...options.keys,
        ...newKeys,
      };
      return options.keys;
    },
  };
  return tracker;
}
