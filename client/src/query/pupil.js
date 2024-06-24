import { gql } from "@apollo/client";

export const GET_ALL_PUPILS = gql`
  query getPupils($sortBy: String) {
    pupils(sortBy: $sortBy) {
      id
      grade
      name
      subjects {
        id
        name
      }
    }
  }
`;
