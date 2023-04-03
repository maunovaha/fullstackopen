import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import NoteForm from './NoteForm';

it('it updates parent state and calls onSubmit', async () => {
  const createdNote = jest.fn();
  render(<NoteForm onCreateNote={createdNote} />);

  const input = screen.getByPlaceholderText('Write a note..');
  const submit = screen.getByText('Save');

  await act(async () => {
    await userEvent.type(input, 'testing a form');
    await userEvent.click(submit);
  });

  expect(createdNote.mock.calls).toHaveLength(1);
  expect(createdNote.mock.calls[0][0].content).toBe('testing a form');
  expect(createdNote.mock.calls[0][0].important).toBe(true);
});
