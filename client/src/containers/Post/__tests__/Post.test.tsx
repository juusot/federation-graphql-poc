import React from 'react';
import { screen, render } from '@testing-library/react';
import Post from '../Post';

import { AllUsersQuery, CreatePostMutation } from 'Api';
import { query } from 'Utils/test/api';

const mockPosts: AllUsersQuery = {
  users: [{ name: 'Jest', email: 'jest@example.com', posts: [] }],
};
const useAllUsersQuery = (fetching = false) =>
  query({
    response: {
      data: mockPosts,
      fetching,
    },
  });

const deleteOnePostMock = jest.fn();
const mockDeleteOne: CreatePostMutation = { createPost: { id: 1 } };
const useCreatePostMutation = query({
  response: { data: mockDeleteOne },
  action: deleteOnePostMock,
});

const useAllUsersQueryMock = jest.fn().mockImplementation(() => useAllUsersQuery());

jest.mock('Api', () => ({
  useAllUsersQuery: () => useAllUsersQueryMock(),
  useCreatePostMutation: () => useCreatePostMutation,
}));

beforeEach(() => {
  deleteOnePostMock.mockClear();
});

describe('Post component', () => {
  test('renders', async () => {
    render(<Post />);
    expect(screen.getByText(/Create a new post/)).toBeInTheDocument();
  });
});
