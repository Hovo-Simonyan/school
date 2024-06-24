import { gql } from "@apollo/client";

export const ADD_SUBJECT = gql`
  mutation Add($name: String!, $teacherId: Int!) {
    addSubject(name: $name, teacherId: $teacherId)
  }
`;

export const DELETE_SUBJECT = gql`
  mutation Delete($id: Int!) {
    deleteSubject(id: $id)
  }
`;
export const UPDATE_SUBJECT = gql`
  mutation Update($id: Int!, $name: String!, $teacherId: Int!) {
    updateSubject(id: $id, name: $name, teacherId: $teacherId)
  }
`;
