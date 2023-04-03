import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import Toggleable from './Toggleable';

describe('<Toggleable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Toggleable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Toggleable>
    ).container;
  });

  test('renders its children', () => {
    screen.getByText('togglable content');
  });

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.toggleableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', async () => {
    const button = screen.getByText('show...');

    // Use the asynchronous version of act to apply resolved promises
    // Source: https://legacy.reactjs.org/docs/testing-recipes.html#data-fetching
    await act(async () => {
      await userEvent.click(button);
    });

    const div = container.querySelector('.toggleableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', async () => {
    const button = screen.getByText('show...');
    await act(async () => {
      await userEvent.click(button);
    });

    const closeButton = screen.getByText('cancel');
    await act(async () => {
      await userEvent.click(closeButton);
    });

    const div = container.querySelector('.toggleableContent');
    expect(div).toHaveStyle('display: none');
  });
});