import { gql } from '@apollo/client';

const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      id
      name
      email
    }
  }
`;

const GET_AUTHOR = gql`
  query getAuthor($email: String!) {
    authorByEmail(email: $email) {
      id
      name
      email
    }
  }
`;

export { GET_AUTHORS, GET_AUTHOR };
