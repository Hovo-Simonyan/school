import { gql } from "@apollo/client";

export const GET_ALL_SUBJECTS = gql`
  query {
    subjects {
      id
      name
      teacher {
        id
        name
      }
    }
  }
`;
