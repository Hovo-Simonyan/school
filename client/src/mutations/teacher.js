import { gql } from "@apollo/client";

export const ADD_TEACHER = gql`
  mutation Add($name: String!) {
    addTeacher(name: $name)
  }
`;

export const DELETE_TEACHER = gql`
  mutation Delete($id: Int!) {
    deleteTeacher(id: $id)
  }
`;
export const UPDATE_TEACHER = gql`
  mutation Add($id: Int!, $name: String!) {
    updateTeacher(id: $id, name: $name)
  }
`;
