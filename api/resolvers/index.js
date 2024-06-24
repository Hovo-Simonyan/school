const { prisma } = require("../config/database");
const { Query } = require("./query");
const { Mutation } = require("./mutation");
const { ApolloError } = require("apollo-server-express");
const Teacher = {
  subjects: async (parent) => {
    try {
      return await prisma.subject.findMany({ where: { teacherId: parent.id } });
    } catch (error) {
      throw new ApolloError("Failed to fetch subjects for teacher");
    }
  },
};

const Pupil = {
  subjects: async (parent) => {
    try {
      return await prisma.subject.findMany({
        where: { pupils: { some: { id: parent.id } } },
      });
    } catch (error) {
      throw new ApolloError("Failed to fetch subjects for pupil");
    }
  },
};

const Subject = {
  teacher: async (parent) => {
    try {
      return await prisma.teacher.findUnique({
        where: { id: parent.teacherId },
      });
    } catch (error) {
      throw new ApolloError("Failed to fetch teacher for subject");
    }
  },

  pupils: async (parent) => {
    try {
      return await prisma.pupil.findMany({
        where: { subjects: { some: { id: parent.id } } },
      });
    } catch (error) {
      throw new ApolloError("Failed to fetch pupils for subject");
    }
  },
};

const resolvers = {
  Query,
  Mutation,
  Teacher,
  Pupil,
  Subject,
};

module.exports = {
  resolvers,
};
