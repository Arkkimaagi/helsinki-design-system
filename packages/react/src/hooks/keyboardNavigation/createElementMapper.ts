import {
  NodeOrElement,
  FocusableElement,
  NavigationOptions,
  ElementData,
  ElementPath,
  Selectors,
  ElementMapper,
} from './index';

const untrackedElementData: ElementData = {
  type: 'untracked',
  index: -1,
  element: undefined,
};

function isElementVisibleOnScreen(element?: NodeOrElement) {
  if (!element || !(element as HTMLElement).getBoundingClientRect) {
    return false;
  }
  const rect = (element as HTMLElement).getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.right > 0 &&
    rect.bottom > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
}

function isChild(parent: HTMLElement, assumedChildren: Array<NodeOrElement | null | undefined>) {
  return assumedChildren.some((child) => {
    return child && parent.contains(child as Node);
  });
}

function findElementPath(searchPath: ElementPath, target: HTMLElement): ElementPath {
  const startPoint = searchPath.at(-1);
  if (!startPoint || !startPoint.element || !isChild(startPoint.element, [target])) {
    return [{ ...untrackedElementData }];
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
        const data = result.at(-1);
        return data && data.element === target;
      });
    return childHit.length ? childHit[0] : [{ ...untrackedElementData }];
  }
  return [{ ...untrackedElementData }];
}

function addMappedElements(path: ElementPath, selectors: Selectors) {
  const targetData = path.at(-1);
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
      // fix
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
    // fix
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

export function returnValidElementData(data?: ElementData | null) {
  return data && data.index > -1 && !!data.element ? data : null;
}

export function isValidPath(elementPath: ElementPath): boolean {
  return !!returnValidElementData(elementPath.at(-1));
}

export function createElementMapper(root: HTMLElement, selectors: Selectors): ElementMapper {
  let rootData: ElementData | null = null;

  const getPath = (element: HTMLElement) => {
    if (!rootData) {
      return null;
    }
    const path = findElementPath([rootData], element);
    const data = path.at(-1);
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
    // first index is always 0 and pointing to the root,
    // so root must exists as first childContainers
    let currentParent: ElementData | undefined = {
      ...untrackedElementData,
      childContainers: rootData ? [rootData] : undefined,
    };
    let notFound = false;
    if (!indexes.length) {
      return [untrackedElementData];
    }
    return indexes.map((index) => {
      if (notFound || !currentParent) {
        return untrackedElementData;
      }
      const containerCount = currentParent.childContainers ? currentParent.childContainers.length : 0;
      const adjustedIndex = index < 0 ? containerCount + index : index;
      const target = currentParent.childContainers && currentParent.childContainers[adjustedIndex];
      if (!target || target.index !== adjustedIndex) {
        notFound = true;
        return untrackedElementData;
      }
      currentParent = target;
      return target;
    });
  };

  const getPathToFocusableByIndexes = (indexes: number[]): ElementPath | null => {
    if (!indexes.length) {
      return null;
    }
    console.log('Indexes', indexes);
    const copy = [...indexes];
    const last = copy.pop() as number;
    const parentPath = getPathToContainerByIndexes(copy);
    const parent = returnValidElementData(parentPath.at(-1));
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
    const containerParent = pathToFocusable.at(-3) || pathToFocusable.at(-2);
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
    const parent = pathToFocusable.at(-2);
    if (!parent) {
      return {};
    }
    const firstContainerDown = parent.childContainers && parent.childContainers[0];
    const levelDown = firstContainerDown && getRelatedFocusableElements(firstContainerDown)[0];

    const grandParent = pathToFocusable.at(-3);
    const closestFocusableUp = grandParent && grandParent.focusable && grandParent.focusable.at(-1);

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
    const data = path.at(-1);
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
    getRelatedFocusableElements,
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
