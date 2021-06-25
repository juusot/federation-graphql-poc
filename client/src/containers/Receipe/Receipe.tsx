import React from 'react';
import styled from 'styled-components';
import Table from 'Components/Table';
import { useAllReceipesQuery, useDeleteReceipeMutation } from 'Api';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const Feed = (): React.ReactElement => {
  const [{ data, fetching, error }] = useAllReceipesQuery();
  const [, deleteOneReceipe] = useDeleteReceipeMutation();

  if (fetching) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Oh no! Error: {error.message}</div>;
  }

  const tableData =
    data?.receipes.map(receipe => ({
      ...receipe,
      remove: 'X',
    })) || [];

  return (
    <Container>
      <h1>Latest information</h1>
      <Table
        columns={['title', 'source', 'remove']}
        data={tableData}
        onClick={{ remove: data => deleteOneReceipe({ id: data.id }) }}
      />
    </Container>
  );
};

export default Feed;
