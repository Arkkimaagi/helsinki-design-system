import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';

import useFocusTrapper from '../useFocusTrapper';

const getElementPositionStorage = jest.fn();
const onFocusListener = jest.fn();

const TestElement = () => {
  const {
    refForFirstTrapper,
    refForLastTrapper,
    disableElements,
    enableElements,
    getElementPosition,
  } = useFocusTrapper({
    manualControls: false,
    onFocus: (type) => {
      onFocusListener(type);
      const nextFocusedElementTestID = type === 'first' ? 'button' : 'input';
      screen.getByTestId(nextFocusedElementTestID).focus();
    },
  });
  return (
    <div>
      <nav>
        <button
          type="button"
          data-testid="disable-button"
          onClick={() => {
            disableElements();
          }}
        >
          Disable
        </button>
        <button
          type="button"
          data-testid="enable-button"
          onClick={() => {
            enableElements();
          }}
        >
          Disable
        </button>
        <button
          type="button"
          data-testid="get-positions-button"
          onClick={() => {
            getElementPositionStorage('first', getElementPosition(screen.getByTestId('first-trapper')));
            getElementPositionStorage('last', getElementPosition(screen.getByTestId('last-trapper')));
          }}
        >
          Get element positions
        </button>
      </nav>
      <div>
        <button type="button" data-testid="first-trapper" ref={refForFirstTrapper}>
          First trapper
        </button>
        <button type="button" data-testid="button">
          Not a trapper
        </button>
        <input type="text" data-testid="input" />
        <button type="button" data-testid="last-trapper" ref={refForLastTrapper}>
          Last trapper
        </button>
      </div>
    </div>
  );
};

const renderElement = () => render(<TestElement />);

describe('useFocusTrapper', () => {
  beforeEach(cleanup);
  it('Assigns two trappers, first and last', async () => {
    renderElement();
    const firstTrapper = screen.queryByTestId('first-trapper') as HTMLElement;
    const lastTrapper = screen.queryByTestId('last-trapper') as HTMLElement;
    fireEvent.focus(firstTrapper);
    expect(onFocusListener).toHaveBeenLastCalledWith('first');
    expect(lastTrapper.getAttribute('disabled')).toBe('true');
    expect(firstTrapper.getAttribute('disabled')).toBe('true');
    const button = screen.getByTestId('button');
    expect(button.ownerDocument.activeElement === button).toBeTruthy();
  });
});
