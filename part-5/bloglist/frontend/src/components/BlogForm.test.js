import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import BlogForm from './BlogForm';

test('should call `onCreateBlog` with proper params on submit', async () => {
  const createBlogHandler = jest.fn();

  const { container } = render(<BlogForm onCreateBlog={createBlogHandler} />);

  const title = container.querySelector('#title');
  const author = container.querySelector('#author');
  const url = container.querySelector('#url');
  const submit = container.querySelector('input[type="submit"]');

  await act(async () => {
    await userEvent.type(title, 'How to kill enemies');
    await userEvent.type(author, 'John Rambo');
    await userEvent.type(url, 'https://john-rambo.com');
    await userEvent.click(submit);
  });

  expect(createBlogHandler.mock.calls).toHaveLength(1);
  expect(createBlogHandler.mock.calls[0][0]).toBe('How to kill enemies');
  expect(createBlogHandler.mock.calls[0][1]).toBe('John Rambo');
  expect(createBlogHandler.mock.calls[0][2]).toBe('https://john-rambo.com');
});
