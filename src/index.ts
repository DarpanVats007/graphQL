import mongoose, { Mongoose } from 'mongoose';

import { ApolloServer } from '@apollo/server';
import { resolvers } from './graphql/resolvers';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/typeDefs';

const MONGODB = "mongodb+srv://mdarpanvats:bN85qw1JUB3W0zuT@recipecluster.fma79cd.mongodb.net/?retryWrites=true&w=majority&appName=RecipeCluster";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

  // Resolvers define how to fetch the types defined in your schema.

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,  
  resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  
  // console.log(`🚀  Server ready at: ${url}`);

  mongoose.connect( MONGODB)
.then(() => {
  console.log("connection to MongoDB successful");
  return startStandaloneServer( server, {
    listen: { port: 4000}
  }).then((res) => 
  console.log(`Listening to ${res.url}`))
})