const { prisma } = require("../config/database");
const { AuthenticationError, ApolloError } = require("apollo-server-express");
const Query = {
  teachers: async () => {
    try {
      return await prisma.teacher.findMany({ include: { subjects: true } });
    } catch (error) {
      throw new ApolloError("Failed to fetch teachers");
    }
  },

  pupils: async (_, {sortBy}) => {
    try {
      let orderBy = {};
      if(sortBy){
        orderBy = {
          grade: sortBy
        }
      }

      return await prisma.pupil.findMany({
        orderBy,
         include: { subjects: true },
      });
    } catch (error) {
      throw new ApolloError("Failed to fetch pupils");
    }
  },

  subjects: async () => {
    try {
      return await prisma.subject.findMany({
        include: { teacher: true, pupils: true },
      });
    } catch (error) {
      throw new ApolloError("Failed to fetch subjects");
    }
  },

  admin: async (_, __, { adminId }) => {
    try {
      return await prisma.admin.findUnique({ where: { id: adminId } });
    } catch (error) {
      throw new AuthenticationError("Failed to fetch admin");
    }
  }
};

module.exports = {
  Query,
};
