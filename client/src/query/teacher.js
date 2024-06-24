import { gql } from "@apollo/client";

export const GET_ALL_TEACHERS = gql`
  query {
    teachers {
      id
      name
      subjects {
        id
        name
      }
    }
  }
`;
