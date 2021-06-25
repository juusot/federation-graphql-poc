import gql from 'graphql-tag';

export const AllPosts = gql`
  query AllPosts {
    posts {
      id
      title
      author {
        name
      }
    }
  }
`;

export const DeletePost = gql`
  mutation DeletePost($id: Int!) {
    deleteOnePost(where: { id: $id }) {
      title
    }
  }
`;

export const CreatePost = gql`
  mutation CreatePost($title: String!, $content: String!, $authorEmail: String!) {
    createPost(title: $title, content: $content, authorEmail: $authorEmail) {
      id
    }
  }
`;
