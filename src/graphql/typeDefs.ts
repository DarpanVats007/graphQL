import { gql } from "graphql-tag"

// Syntex validation at https://lucasconstantino.github.io/graphiql-online/

export const typeDefs = gql`
type Recipe {
    name: String!
    description: String!
    createdAt: String!
    thumbsUp: Int
    thumbsDown: Int
}

input RecipeInput {
name: String!
description: String!
}

type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(qty: Int): [Recipe] 
}

type Mutation {
    createRecipe(recipeInput: RecipeInput!): Recipe!
    deleteRecipe(ID: ID!): Boolean!
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean!
}
`