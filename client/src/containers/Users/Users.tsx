import React, { useState } from 'react';
import styled from 'styled-components';
import { useAllUsersQuery, useSignUpUserMutation, SignUpUserMutationVariables } from 'Api';
import Table from 'Components/Table';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const Invite = styled.div`
  margin-bottom: 30px;
`;

const InputBox = styled.div`
  display: grid;
  grid-template-columns: 100px 200px;
`;

const Users = (): React.ReactElement => {
  const emptyUser = {} as SignUpUserMutationVariables;
  const [formData, setFormData] = useState(emptyUser);

  const handleFormChange = (value: Partial<SignUpUserMutationVariables>) =>
    setFormData({ ...formData, ...value });
  const [{ data, error, fetching }] = useAllUsersQuery();
  const [, signUpUser] = useSignUpUserMutation();

  if (fetching) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oh no! Error: {error.message}</div>;
  }

  const tableData =
    data?.users?.map(user => ({
      ...user,
      posts: user.posts.length,
    })) || [];

  return (
    <Container>
      <Invite>
        <h1>Add user</h1>
        <InputBox>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name || ''}
            onChange={event => handleFormChange({ name: event.target.value })}
          />
        </InputBox>
        <InputBox>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={event => handleFormChange({ email: event.target.value })}
          />
        </InputBox>
        <InputBox>
          <label htmlFor="number">Number</label>
          <input
            id="number"
            type="text"
            value={formData.phoneNumber || ''}
            onChange={event => handleFormChange({ phoneNumber: event.target.value })}
          />
        </InputBox>
        <button
          onClick={() => {
            signUpUser(formData);
            setFormData(emptyUser);
          }}
        >
          Add
        </button>
      </Invite>
      <Table
        columns={['name', 'email', 'posts']}
        data={tableData}
        onClick={{
          name: data => (data.name ? console.log(data.name) : console.log('Error')),
        }}
      />
    </Container>
  );
};

export default Users;
