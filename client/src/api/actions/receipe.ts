import gql from 'graphql-tag';

export const DeleteReceipe = gql`
  mutation DeleteReceipe($id: Int!) {
    deleteOneReceipe(where: { id: $id }) {
      title
    }
  }
`;

export const AllReceipes = gql`
  query AllReceipes {
    receipes {
      id
      title
      content
      source
    }
  }
`;
