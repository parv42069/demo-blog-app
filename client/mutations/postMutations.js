import { gql } from '@apollo/client';

const ADD_POST = gql`
  mutation AddPost(
    $title: String!
    $content: String!
    $genre: String!
    $authorId: ID!
  ) {
    addPost(
      title: $title
      content: $content
      genre: $genre
      authorId: $authorId
    ) {
      id
      title
      content
      genre
      author {
        id
        name
        email
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String!
    $content: String!
    $genre: String!
  ) {
    updatePost(id: $id, title: $title, content: $content, genre: $genre) {
      id
      title
      content
      genre
      author {
        id
        name
        email
      }
    }
  }
`;

export { ADD_POST, DELETE_POST, UPDATE_POST };
