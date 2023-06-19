import React from 'react';

import { KeyboardNavigation } from './KeyboardNavigation';
import useKeyboardNavigation from '../../hooks/useKeyboardNavigation';

export default {
  component: KeyboardNavigation,
  title: 'Components/KeyboardNavigation',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = () => {
  const { ref } = useKeyboardNavigation({ childSelector: 'li' });
  return (
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
      <button type="button">Focus</button>
      <ul className="nav">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};
