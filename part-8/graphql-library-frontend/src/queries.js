import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      published
      title
      author {
        id
        name
        born
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      published
      title
      genres
      author {
        id
        name
        born
      }
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      born
      name
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;