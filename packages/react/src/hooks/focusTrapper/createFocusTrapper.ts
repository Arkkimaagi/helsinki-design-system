export type FocusTrapper = ReturnType<typeof createFocusTrapper>;
export type FocusTrapperProps = {
  firstTrapperElement?: HTMLElement;
  lastTrapperElement?: HTMLElement;
  onFocus?: (type: 'first' | 'last') => void;
  trapIn?: boolean;
  manualControls?: boolean;
};
export type Position = 'first' | 'last';

export function createFocusTrapper({
  firstTrapperElement,
  lastTrapperElement,
  onFocus,
  trapIn = false,
  manualControls = false,
}: FocusTrapperProps) {
  const elements = {
    first: firstTrapperElement,
    last: lastTrapperElement,
  };

  const enableElementFocus = (element?: HTMLElement) => {
    if (!element) {
      return;
    }
    element.setAttribute('tabindex', '0');
    element.removeAttribute('disabled');
  };

  const enableTracking = () => {
    enableElementFocus(elements.first);
    enableElementFocus(elements.last);
  };

  const disableElementFocus = (element?: HTMLElement) => {
    if (!element) {
      return;
    }
    element.setAttribute('tabindex', '-1');
    element.setAttribute('disabled', 'true');
  };

  const disableTracking = () => {
    disableElementFocus(elements.first);
    disableElementFocus(elements.last);
  };

  const getElementPosition = (element?: HTMLElement | Node | EventTarget | null): Position | undefined => {
    if (!element) {
      return undefined;
    }
    if (element === elements.first) {
      return 'first';
    }
    if (element === elements.last) {
      return 'last';
    }
    return undefined;
  };

  const listener = (focusEvent: FocusEvent) => {
    const position = getElementPosition(focusEvent.target as HTMLElement);
    if (!position) {
      return;
    }
    if (onFocus) {
      onFocus(position);
    }
    if (!trapIn && !manualControls) {
      disableTracking();
    }
  };

  const addFocusListener = (element?: HTMLElement) => {
    if (!element) {
      return;
    }
    element.addEventListener('focus', listener);
  };

  const removeFocusListener = (element?: HTMLElement) => {
    if (!element) {
      return;
    }
    element.removeEventListener('focus', listener);
  };

  addFocusListener(elements.first);
  addFocusListener(elements.last);

  return {
    registerTrackerElement: (type: 'first' | 'last', element: HTMLElement | null) => {
      removeFocusListener(elements[type]);
      if (element) {
        elements[type] = element;
        addFocusListener(elements[type]);
      }
    },
    dispose: () => {
      removeFocusListener(elements.first);
      removeFocusListener(elements.last);
    },
    disableTracking,
    enableTracking,
    getElementPosition,
  };
}
