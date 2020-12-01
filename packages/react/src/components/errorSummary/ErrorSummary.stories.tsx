import React from 'react';

import { ErrorSummary } from './ErrorSummary';

export default {
  component: ErrorSummary,
  title: 'Components/ErrorSummary',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  args: {
    label: 'Form contains following errors',
  },
};

const getContent = () => (
  <ul>
    <li>
      Error 1: <a href="#field1">Please enter your first name</a>
    </li>
    <li>
      Error 2: <a href="#field2">Please enter your last name</a>
    </li>
    <li>
      Error 3: <a href="#field3">Please enter a valid email address</a>
    </li>
  </ul>
);

export const Default = (args) => <ErrorSummary {...args}>{getContent()}</ErrorSummary>;

export const Large = (args) => <ErrorSummary {...args}>{getContent()}</ErrorSummary>;
Large.args = {
  size: 'large',
};
