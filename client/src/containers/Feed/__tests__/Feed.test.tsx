import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { AllPostsQuery, DeletePostMutation } from 'Api';
import { query } from 'Utils/test/api';
import Feed from '../Feed';

const mockPosts: AllPostsQuery = {
  posts: [{ id: 1, title: 'TestTitle', author: { name: 'Jest' } }],
};
const useAllPostsQuery = (fetching = false) =>
  query({
    response: {
      data: mockPosts,
      fetching,
    },
  });

const deleteOnePostMock = jest.fn();
const mockDeleteOne: DeletePostMutation = { deleteOnePost: { title: 'test' } };
const useDeletePostMutation = query({
  response: { data: mockDeleteOne },
  action: deleteOnePostMock,
});

const useAllPostsQueryMock = jest.fn().mockImplementation(() => useAllPostsQuery());

jest.mock('Api', () => ({
  useAllPostsQuery: () => useAllPostsQueryMock(),
  useDeletePostMutation: () => useDeletePostMutation,
}));

beforeEach(() => {
  deleteOnePostMock.mockClear();
});

describe('Feed component', () => {
  test('renders', async () => {
    render(<Feed />);
    expect(screen.getByText(/Latest information/)).toBeInTheDocument();
  });

  test('removing item succeeds', async () => {
    render(<Feed />);
    expect(screen.getByText(/TestTitle/)).toBeInTheDocument();
    const removeButton = screen.getByText(/X/);

    fireEvent.click(removeButton);
    expect(deleteOnePostMock).toHaveBeenCalledTimes(1);
    expect(deleteOnePostMock).toHaveBeenCalledWith({ id: 1 });
  });

  test('loading shows', async () => {
    useAllPostsQueryMock.mockImplementationOnce(() => useAllPostsQuery(true));
    render(<Feed />);
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });
});
