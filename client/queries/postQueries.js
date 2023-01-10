import { gql } from '@apollo/client';

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      genre
      author {
        name
      }
    }
  }
`;

const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      genre
      content
      author {
        name
        email
      }
    }
  }
`;

export { GET_POSTS, GET_POST };
