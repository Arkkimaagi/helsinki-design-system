import { returnValidElementData, isValidPath } from './createElementMapper';
import {
  FocusableElement,
  NodeOrElement,
  NavigationOptions,
  ElementData,
  ElementMapper,
  ElementPath,
  KeyboardTrackerOptions,
} from '.';

function forceFocusToElement(element?: NodeOrElement) {
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

export function createFocusTracker(
  elementMapper: ElementMapper,
  loop: boolean,
  externalNavigator: KeyboardTrackerOptions['navigator'],
) {
  let pathToCurrentFocusedElement: ElementPath | null = null;
  const navigator = externalNavigator || elementMapper.getNavigationOptions;
  const storeValidPathToFocusedElement = (path?: ElementPath | null) => {
    if (!path) {
      pathToCurrentFocusedElement = null;
    } else {
      const lastItemOnPath = path.at(-1);
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
    const data = returnValidElementData(pathToCurrentFocusedElement.at(-1));
    return (data && data.element) || null;
  };

  const setCurrentPathToFocusedElement = (dataOrPath?: Partial<ElementData> | ElementPath | null): boolean => {
    if (!dataOrPath) {
      return storeValidPathToFocusedElement(null);
    }
    if (Array.isArray(dataOrPath)) {
      return storeValidPathToFocusedElement(dataOrPath);
    }
    return storeValidPathToFocusedElement(dataOrPath.element ? elementMapper.getPath(dataOrPath.element) : null);
  };

  const getElemenData = (element: NodeOrElement | null) => {
    const path = elementMapper.getPath(element as HTMLElement);
    if (path && isValidPath(path)) {
      return path.at(-1);
    }
    return null;
  };

  const setFocusToCurrentElement = () => {
    if (!pathToCurrentFocusedElement) {
      return false;
    }
    const data = pathToCurrentFocusedElement.at(-1) as ElementData;
    return forceFocusToElement(data.element);
  };

  const setFocusByIndexes = (indexes: number[]) => {
    const path = elementMapper.getPathToFocusableByIndexes(indexes);
    setCurrentPathToFocusedElement(path);
    return setFocusToCurrentElement();
  };

  const setFocusToContainer = (container: ElementData | null | undefined, index: number) => {
    if (!container) {
      return false;
    }
    const focusable = elementMapper.getRelatedFocusableElements(container).at(index);
    const path = focusable && elementMapper.getPath(focusable);
    const isValid = storeValidPathToFocusedElement(path);
    if (isValid) {
      setFocusToCurrentElement();
    }
    return isValid;
  };

  const navigateTo = (direction: keyof NavigationOptions) => {
    if (!pathToCurrentFocusedElement) {
      return setFocusToContainer(elementMapper.getRootData(), direction === 'previous' ? -1 : 0);
    }
    const directions = navigator(pathToCurrentFocusedElement, loop);
    return forceFocusToElement(directions[direction]);
  };

  return {
    reset: () => {
      pathToCurrentFocusedElement = null;
    },
    next: () => {
      return navigateTo('next');
    },
    previous: () => {
      return navigateTo('previous');
    },
    levelDown: () => {
      return navigateTo('levelDown');
    },
    levelUp: () => {
      return navigateTo('levelUp');
    },
    hasFocusableItems: (container: ElementData) => {
      return elementMapper.getRelatedFocusableElements(container).length > 0;
    },
    getCurrentFocusedElementData: () => {
      return pathToCurrentFocusedElement ? pathToCurrentFocusedElement.at(-1) : null;
    },
    isTrackedElement: (el: NodeOrElement | null) => {
      if (!el) {
        return false;
      }
      const path = elementMapper.getPath(el as HTMLElement);
      return path && !!isValidPath(path);
    },
    resetFocusToCurrent: () => {
      return setFocusToCurrentElement();
    },
    storeFocusedElement: (element: FocusableElement | null) => {
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
