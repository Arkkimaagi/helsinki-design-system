import React, { useCallback, useEffect, useRef, useState } from 'react';

import { KeyboardNavigation } from './KeyboardNavigation';
import useKeyboardNavigation from '../../hooks/useKeyboardNavigation';
import useFocusTrapping from '../../hooks/useFocusTrapping';
import { KeyboardTrackerProps } from '../../hooks/createKeyboardTracker';
import { Button } from '../button/Button';
import { TextInput } from '../textInput/TextInput';

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

export const ExampleWithDynamicElements = () => {
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
  const [insertionIndex, setInsertionIndex] = useState<string>('-1');
  const lastFocusedIndexRef = useRef<number[]>([]);
  const resetFocusProps = useRef<{ removeIndex: number; addIndex: number } | undefined>(undefined);
  const { ref, refresh, setFocusedElementByIndex } = useKeyboardNavigation({
    childSelector: 'li a',
    onChange: (type, tracker, item) => {
      if (type === 'focusChange' && item && item.index > -1) {
        lastFocusedIndexRef.current.unshift(item.index);
      }
    },
  });
  const resetFocus = ({ removeIndex, addIndex }: { removeIndex: number; addIndex: number }) => {
    const previouslyFocusedElement =
      removeIndex > -1
        ? lastFocusedIndexRef.current.find((index) => removeIndex !== index)
        : lastFocusedIndexRef.current[0];
    refresh();

    if (previouslyFocusedElement === undefined) {
      return;
    }
    if (removeIndex > -1) {
      lastFocusedIndexRef.current = lastFocusedIndexRef.current.filter((i) => i !== removeIndex);
      setFocusedElementByIndex(
        previouslyFocusedElement > removeIndex ? previouslyFocusedElement - 1 : previouslyFocusedElement,
      );
    }
    if (addIndex > -1) {
      setFocusedElementByIndex(
        addIndex >= previouslyFocusedElement ? previouslyFocusedElement : previouslyFocusedElement + 1,
      );
    }
  };
  const removeItem = (e: React.MouseEvent, removeIndex: number) => {
    setItems((currentItems) => {
      const clone = [...currentItems];
      clone.splice(removeIndex, 1);
      return clone;
    });
    e.preventDefault();
    resetFocusProps.current = { removeIndex, addIndex: -1 };
  };
  const addItem = () => {
    const index = parseInt(insertionIndex, 10);
    setItems((currentItems) => {
      const clone = [...currentItems];
      const addIndex = !Number.isNaN(index) && index >= 0 ? index : currentItems.length;
      clone.splice(addIndex, 0, `New ${addIndex + 1}/${clone.length + 1}`);
      resetFocusProps.current = { removeIndex: -1, addIndex };
      return clone;
    });
  };
  useEffect(() => {
    if (resetFocusProps.current) {
      resetFocus(resetFocusProps.current);
      resetFocusProps.current = undefined;
    }
  }, [items.length]);
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
          .nav li a{
            padding:4px;
          }
          .nav li a:focus,.nav li a:focus-visible  {
            outline:1px solid blue;
          }
        `}
        </style>
        <p>Click an item to remove it.</p>
        <ul className="nav">
          {items.map((data, index) => {
            return (
              <li key={`${data}_${Math.random()}`}>
                <a
                  tabIndex={0}
                  href="#remove"
                  onClick={(e) => {
                    removeItem(e, index);
                  }}
                >
                  {data}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p>Add a new item</p>
        <TextInput
          id="insertionIndex"
          label="Index"
          value={insertionIndex}
          onInput={(e) => {
            setInsertionIndex(e.currentTarget.value);
          }}
        />
        <Button onClick={() => addItem()}>Add item</Button>
      </div>
    </div>
  );
};

export const MutationExample = () => {
  const { ref } = useKeyboardNavigation({
    childSelector: 'li',
    autoUpdateOnMutation: true,
  });
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu((current) => !current);
  };
  return (
    <div>
      <div ref={ref}>
        <style>
          {`
          .menu {
            list-style: none;
            display:flex;
            flex-direction: column;
          }
          .menu.hidden {
            display:none;
          }
          .menu li {
            padding:10px;
          }
        `}
        </style>
        <div className="container">
          <button type="button" onClick={() => toggleMenu()}>
            Open menu
          </button>
          <ul className={`menu${showMenu ? '' : ' hidden'}`}>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <li tabIndex={0}>Item 1</li>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <li tabIndex={0}>Item 2</li>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <li tabIndex={0}>Item 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const MultiLevelExample = () => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const pendingFocusShift = useRef<number>(-1);
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { ref, getElement, setFocusedItem } = useKeyboardNavigation({
    childSelector: ':scope li > a, :scope li > button',
    autoUpdateOnMutation: true,
    onChange: (type) => {
      if (type === 'dataUpdated' && pendingFocusShift.current > 0) {
        const element = getElement();
        const buttons = element && element.querySelectorAll(':scope li > button');
        const target = buttons && buttons.length && buttons[pendingFocusShift.current];
        if (target) {
          setFocusedItem({ element: target });
        }
        pendingFocusShift.current = -1;
      }
    },
  });
  const setFocus = (index: number) => {
    setFocusedIndex(focusedIndex === index ? -1 : index);
    pendingFocusShift.current = index;
  };
  return (
    <div ref={ref}>
      <style>
        {`
          .nav {
            list-style: none;
            display:flex;
            flex-direction:column;
          }
          .nav li {
            padding:10px;
            display:flex;
            position:relative;
          }
          .nav li a{
            padding:4px;
            border:1px solid #ccc;
            margin: 2px;
          }
          .nav li a:focus, .nav li a:focus-visible{
            background-color:#ccc;
            outline:1px solid blue;
          }
          .subNav{
            flex-direction:row;
          }
        `}
      </style>
      <ul className="nav">
        {items.map((data, index) => {
          return (
            <li key={data}>
              <a
                tabIndex={0}
                href="#nothing"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {data}
              </a>
              <button type="button" onClick={() => setFocus(index)}>
                x
              </button>
              {focusedIndex === index && (
                <ul className="nav subNav">
                  {[0, 1, 2].map((childData) => {
                    return (
                      <li key={`${data}.${childData}}`}>
                        <a
                          tabIndex={0}
                          href="#nothing"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {`${data}.${childData}`}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
