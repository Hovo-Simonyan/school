import { gql } from "@apollo/client";

export const GET_ADMIN = gql`
  query {
    admin {
      id
      email
    }
  }
`;
