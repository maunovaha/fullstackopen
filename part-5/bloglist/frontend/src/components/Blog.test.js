import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Blog from './Blog';

test('renders title by default', () => {
  const blog = {
    id: '641c2806c6623a43433ca81a',
    title: 'Example blog',
    author: 'Mr. Bean',
    url: 'https://www.google.com',
    likes: 1337
  };

  render(<Blog blog={blog} />);

  screen.getByText('Example blog', { exact: false });

  const author = screen.queryByText('Mr. Bean', { exact: false });
  expect(author).toBeNull();

  const url = screen.queryByText('https://www.google.com', { exact: false });
  expect(url).toBeNull();

  const likes = screen.queryByText(1337, { exact: false });
  expect(likes).toBeNull();
});

test('renders all information when "View" -button is click', async () => {
  const blog = {
    id: '641c2806c6623a43433ca81a',
    title: 'Example blog',
    author: 'Mr. Bean',
    url: 'https://www.google.com',
    likes: 1337
  };

  render(<Blog blog={blog} />);

  const viewButton = screen.getByText('View');

  await act(async () => {
    await userEvent.click(viewButton);
  });

  screen.getByText('Example blog', { exact: false });
  screen.getByText('Mr. Bean', { exact: false });
  screen.getByText('https://www.google.com', { exact: false });
  screen.getByText(1337, { exact: false });
});

test('clicking like "Like" -button twice should call the proper callback handler', async () => {
  const blog = {
    id: '641c2806c6623a43433ca81a',
    title: 'Example blog',
    author: 'Mr. Bean',
    url: 'https://www.google.com',
    likes: 1337
  };

  const likeBlogHandler = jest.fn();

  render(<Blog blog={blog} onLikeBlog={likeBlogHandler} />);

  const viewButton = screen.getByText('View');

  await act(async () => {
    await userEvent.click(viewButton);
  });

  const likeButton = screen.getByText('Like');

  await act(async () => {
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);
  });

  expect(likeBlogHandler.mock.calls).toHaveLength(2);
  expect(likeBlogHandler.mock.calls[0][0]).toBe('641c2806c6623a43433ca81a');
});