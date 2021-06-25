import React, { useState } from 'react';
import styled from 'styled-components';
import { useAllUsersQuery, useCreatePostMutation, CreatePostMutationVariables } from 'Api';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const FormContainer = styled.div`
  margin-bottom: 30px;
`;

const InputBox = styled.div`
  display: grid;
  grid-template-columns: 100px 200px;
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 400px;
`;

const Feed = (): React.ReactElement => {
  const emptyPost = {} as CreatePostMutationVariables;
  const [formData, setFormData] = useState(emptyPost);
  const handleFormChange = (value: Partial<CreatePostMutationVariables>) =>
    setFormData({ ...formData, ...value });

  const [{ data, error, fetching }] = useAllUsersQuery();
  const [, createPost] = useCreatePostMutation();

  if (fetching) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oh no! Error: {error.message}</div>;
  }

  return (
    <Container>
      <h1>Create a new post</h1>
      <FormContainer>
        <InputBox>
          <label htmlFor="author">Author</label>
          <select
            name="author"
            id="author"
            value={formData.authorEmail || ''}
            onChange={event => handleFormChange({ authorEmail: event.target.value })}
          >
            {data?.users.map(user => (
              <option key={user.email} value={user.email}>
                {user.name}
              </option>
            ))}
          </select>
        </InputBox>
        <InputBox>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={formData.title || ''}
            onChange={event => handleFormChange({ title: event.target.value })}
          />
        </InputBox>
        <InputBox>
          <label htmlFor="content">Content</label>
          <TextArea
            id="content"
            value={formData.content || ''}
            onChange={event => handleFormChange({ content: event.target.value })}
          />
        </InputBox>
        <button
          onClick={() => {
            createPost(formData);
            setFormData(emptyPost);
          }}
        >
          Add
        </button>
      </FormContainer>
    </Container>
  );
};

export default Feed;
