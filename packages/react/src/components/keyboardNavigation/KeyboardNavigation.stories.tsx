import React, { useCallback, useRef } from 'react';

import { KeyboardNavigation } from './KeyboardNavigation';
import useKeyboardNavigation from '../../hooks/useKeyboardNavigation';
import useFocusTrapping from '../../hooks/useFocusTrapping';
import { KeyboardTrackerProps } from '../../hooks/createKeyboardTracker';

export default {
  component: KeyboardNavigation,
  title: 'Components/KeyboardNavigation',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};
export const Example = () => {
  const { ref } = useKeyboardNavigation({
    childSelector: 'li',
  });

  return (
    <div>
      <div ref={ref}>
        <style>
          {`
          .nav {
            list-style: none;
            display:flex;
          }
          .nav li {
            padding:10px;
          }
        `}
        </style>
        <ul className="nav">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <li tabIndex={0}>Item 1</li>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <li tabIndex={0}>Item 2</li>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <li tabIndex={0}>Item 3</li>
        </ul>
      </div>
    </div>
  );
};

export const ExampleWithFocusHelpers = () => {
  const {
    refForFirstTrapper,
    refForLastTrapper,
    disableElements,
    enableElements,
    getElementPosition,
  } = useFocusTrapping({
    manualControls: true,
  });
  const onChangeListeners = useRef<Set<Required<KeyboardTrackerProps>['onChange']>>(new Set());
  const keyboardTrackerOnChange = useCallback<Required<KeyboardTrackerProps>['onChange']>(
    (type, tracker, item) => {
      const focusIsNotInTrackedElement = !item || (item && item.index === -1);
      if (onChangeListeners.current.size) {
        onChangeListeners.current.forEach((func) => func(type, tracker, item));
      }
      if (type === 'focusIn' && focusIsNotInTrackedElement) {
        const position = item ? getElementPosition(item.element) : undefined;
        console.log('position', position, item && item.element);
        tracker.setFocusedElementByIndex(position === 'last' ? -1 : 0);
        // do not disable before setting index or focus is lost when disabled
        // this will result in focusOut event
        disableElements();
      }
      if (type === 'focusOut' && focusIsNotInTrackedElement) {
        enableElements();
      }
    },
    [enableElements, disableElements],
  );
  const { ref } = useKeyboardNavigation({
    childSelector: 'li',
    onChange: keyboardTrackerOnChange,
  });

  return (
    <div>
      <button type="button">Previous focusable</button>
      <div ref={ref}>
        <style>
          {`
          .nav {
            list-style: none;
            display:flex;
          }
          .nav li {
            padding:10px;
          }
          .hidden{
            height: 0;
             width: 0; 
             overflow:hidden;
            border:0;
            opacity:0;
          }
        `}
        </style>
        <button ref={refForFirstTrapper} type="button" className="hidden">
          Focus trap start
        </button>
        <ul className="nav">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <button ref={refForLastTrapper} type="button" className="hidden">
          Focus trap end
        </button>
      </div>
      <button type="button">Next focusable</button>
    </div>
  );
};
