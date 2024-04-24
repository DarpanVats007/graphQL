import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";
import { resolvers } from "./graphql/resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typeDefs";

const MONGODB =
  "mongodb+srv://mdarpanvats:bN85qw1JUB3W0zuT@recipecluster.fma79cd.mongodb.net/?retryWrites=true&w=majority&appName=RecipeCluster";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:

mongoose.connect(MONGODB).then(() => {
  console.log("connection to MongoDB successful");
  return startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then((res) => console.log(`Listening to ${res.url}`));
});
