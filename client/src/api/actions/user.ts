import gql from 'graphql-tag';

export const AllUsers = gql`
  query AllUsers {
    users {
      name
      email
      posts {
        id
      }
    }
  }
`;

export const AddUser = gql`
  mutation SignUpUser($email: String!, $name: String!, $phoneNumber: String!) {
    signupUser(data: { email: $email, name: $name, phoneNumber: $phoneNumber }) {
      name
      email
      posts {
        id
      }
    }
  }
`;
