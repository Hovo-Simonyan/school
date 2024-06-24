const {
  AuthenticationError,
  UserInputError,
  ApolloError,
} = require("apollo-server-express");
const { prisma } = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutation = {
  login: async (_, { email, password }) => {
    try {
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (!admin) {
        throw new UserInputError("User or password incorrect");
      }

      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) {
        throw new AuthenticationError("User or password incorrect");
      }

      const token = jwt.sign({ adminId: admin.id }, process.env.SECRET);
      return { token, id: admin.id, email: admin.email };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(error.message + "Login failed");
    }
  },
  register: async (_, { email, password }) => {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      await prisma.admin.create({
        data: { email, password: hashPassword },
      });
      return true;
    } catch (error) {
      throw new ApolloError("Register failed");
    }
  },
  addTeacher: async (_, { name }) => {
    try {
      await prisma.teacher.create({
        data: {
          name,
        },
      });
      return true;
    } catch (error) {
      throw new ApolloError("Failed to add teacher");
    }
  },
  updateTeacher: async (_, { id, name }) => {
    try {
      await prisma.teacher.update({ where: { id }, data: { name } });
      return true;
    } catch (error) {
      throw new ApolloError("Failed to update teacher");
    }
  },
  deleteTeacher: async (_, { id }) => {
    try {
      await prisma.teacher.delete({
        where: { id },
        include: { subjects: true },
      });
      return true;
    } catch (error) {
      throw new ApolloError("Failed to delete teacher");
    }
  },

  addPupil: async (_, { name, grade, subjectIds }) => {
    try {
      await prisma.pupil.create({
        data: {
          name,
          grade,
          subjects: {
            connect: subjectIds.map((id) => ({ id })),
          },
        },
      });
      return true;
    } catch (error) {
      throw new ApolloError("Failed to add pupil");
    }
  },

  updatePupil: async (_, { id, name, grade, subjectIds }) => {
    try {
      await prisma.pupil.update({
        where: { id },
        data: {
          name,
          grade,
          subjects: {
            set: subjectIds.map((id) => ({ id })),
          },
        },
      });
      return true;
    } catch (error) {
      throw new ApolloError("Failed to update pupil");
    }
  },

  deletePupil: async (_, { id }) => {
    try {
      await prisma.pupil.delete({ where: { id } });
      return true;
    } catch (error) {
      throw new ApolloError("Failed to delete pupil");
    }
  },

  addSubject: async (_, { name, teacherId }) => {
    try {
      await prisma.subject.create({
        data: { name, teacher: { connect: { id: teacherId } } },
      });
      return true;
    } catch (error) {
      throw new ApolloError("Failed to add subject");
    }
  },

  updateSubject: async (_, { id, name, teacherId }) => {
    try {
      await prisma.subject.update({
        where: { id },
        data: { name, teacher: { connect: { id: teacherId } } },
      });
      return true;
    } catch (error) {
      throw new ApolloError("Failed to update subject");
    }
  },

  deleteSubject: async (_, { id }) => {
    try {
      await prisma.subject.delete({ where: { id } });
      return true;
    } catch (error) {
      throw new ApolloError("Failed to delete subject");
    }
  },
};

module.exports = {
  Mutation,
};
