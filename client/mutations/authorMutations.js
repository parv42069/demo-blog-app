import { gql } from '@apollo/client';

const ADD_AUTHOR = gql`
  mutation addAuthor($name: String!, $email: String!) {
    addAuthor(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const DELETE_AUTHOR = gql`
  mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      email
    }
  }
`;

export { ADD_AUTHOR, DELETE_AUTHOR };
