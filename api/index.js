require('dotenv').config();
const express = require("express");
const { ApolloServer, ForbiddenError } = require("apollo-server-express");
const verifyToken = require("./utils/verifyToken");
const { resolvers } = require("./resolvers/index");
const { typeDefs } = require("./schema/schema");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(
  cors({
    origin: "*",
  })
);

// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const operationName = req.body.operationName;

    // Allow login and register mutation without authentication
    if (operationName === "Login" || operationName === "Register" ) {
      return;
    }
    const adminId = verifyToken(req);
    if (!adminId) throw new ForbiddenError("Not authenticated");
    return { adminId};
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(PORT, (err) =>
    err
      ? console.log(err)
      : console.log(
          `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        )
  );
});
