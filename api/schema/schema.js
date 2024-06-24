const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Admin {
    id: Int!
    email: String!
    password: String!
  }

  type Teacher {
    id: Int!
    name: String!
    subjects: [Subject!]
  }

  type Pupil {
    id: Int!
    name: String!
    grade: Int!
    subjects: [Subject!]
  }

  type Subject {
    id: Int!
    name: String!
    teacher: Teacher!
    pupils: [Pupil!]
  }

  type Query {
    teachers: [Teacher!]!
    pupils(sortBy: String): [Pupil!]!
    subjects: [Subject!]!
    admin: Admin!
  }

  type AuthPayload {
    token: String!
    id: ID!
    email: String!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(email: String!, password: String!): Boolean!
    addTeacher(name: String!, subjectIds: [Int!]): Boolean!
    updateTeacher(id: Int!, name: String!): Boolean!
    deleteTeacher(id: Int!): Boolean!
    addPupil(name: String!, grade: Int!, subjectIds: [Int!]): Boolean!
    updatePupil(
      id: Int!
      name: String!
      grade: Int!
      subjectIds: [Int!]
    ): Boolean!
    deletePupil(id: Int!): Boolean!
    addSubject(name: String!, teacherId: Int!): Boolean!
    updateSubject(id: Int!, name: String!, teacherId: Int!): Boolean!
    deleteSubject(id: Int!): Boolean!
  }
`;

module.exports = {
  typeDefs,
};
