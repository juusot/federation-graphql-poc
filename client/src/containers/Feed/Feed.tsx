import React from 'react';
import styled from 'styled-components';
import Table from 'Components/Table';
import { useAllPostsQuery, useDeletePostMutation } from 'Api';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const Feed = (): React.ReactElement => {
  const [{ data, fetching, error }] = useAllPostsQuery();
  const [, deleteOnePost] = useDeletePostMutation();

  if (fetching) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oh no! Error: {error.message}</div>;
  }

  const tableData =
    data?.posts.map(post => ({
      id: post.id,
      title: post.title,
      author: post.author?.name,
      remove: 'X',
    })) || [];

  return (
    <Container>
      <h1>Latest information</h1>
      <Table
        columns={['title', 'author', 'remove']}
        data={tableData}
        onClick={{ remove: data => deleteOnePost({ id: data.id }) }}
      />
    </Container>
  );
};

export default Feed;
