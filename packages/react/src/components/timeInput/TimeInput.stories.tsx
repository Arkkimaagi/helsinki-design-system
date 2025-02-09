import React from 'react';

import { TimeInput } from './TimeInput';

export default {
  component: TimeInput,
  title: 'Components/TimeInput',
  decorators: [(storyFn) => <div style={{ maxWidth: '400px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    id: 'time',
    label: 'Label',
    hoursLabel: 'hours',
    minutesLabel: 'minutes',
    helperText: 'Assistive text',
    value: '00:00',
    disabled: false,
  },
};

export const Default = (args) => {
  return <TimeInput {...args} />;
};
