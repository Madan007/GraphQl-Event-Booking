const express = require("express");

// Importing Depenedency Modules
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

// Importing Schema and Resolvers
const graphiQlSchema = require("./graphql/schema");
const graphiQlResolvers = require("./graphql/resolvers");

//Importing Middleware
const authMiddleware = require("./middlewares/auth");
const corsMiddleware = require("./middlewares/cors");

const app = express();
app.use(bodyParser.json());

app.use(corsMiddleware);

app.use(authMiddleware);

app.get("/", (req, res, next) => {
  res.send("Server is Running");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphiQlSchema,
    rootValue: graphiQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(`${process.env.MONGO_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Successfully connected to MongoDB Server!!!!!");
    app.listen(process.env.PORT, () => {
      console.log(`server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in Mongo DB Connection", err);
  });
