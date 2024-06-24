import { gql } from "@apollo/client";

export const ADD_PUPIL = gql`
  mutation Add($name: String!, $grade: Int!, $subjectIds: [Int!]) {
    addPupil(name: $name, grade: $grade, subjectIds: $subjectIds)
  }
`;

export const DELETE_PUPIL = gql`
  mutation Delete($id: Int!) {
    deletePupil(id: $id)
  }
`;
export const UPDATE_PUPIL = gql`
  mutation Update(
    $id: Int!
    $name: String!
    $grade: Int!
    $subjectIds: [Int!]
  ) {
    updatePupil(id: $id, name: $name, grade: $grade, subjectIds: $subjectIds)
  }
`;
