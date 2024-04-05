import { Recipe } from "../models/Recipe";

export const resolvers = {
    Query: {
        async recipe(_: unknown, args: { ID: number }) {
            return await Recipe.findById(args.ID)
        },

        async getRecipes(_: unknown, args: { qty: number}) {
            return await Recipe.find().sort({createdAt: -1}).limit(args.qty)
        }
    },
    Mutation: {
        async createRecipe(_: unknown, 
            args: {recipeInput: {name: String, description: String}}
            ){
            const createRecipe = new Recipe({
                name: args.recipeInput.name,
                description: args.recipeInput.description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0,
            });

            const res = await createRecipe.save(); // MongoDB saving

          //  console.log(res)
            return {
                ID: res.id,
                ...res
            }
        },

        async deleteRecipe(_: unknown, args: {ID: number}){
            const wasDeleted = (await Recipe.deleteOne({_id: args.ID})).deletedCount;
            return wasDeleted;
        },

        async editRecipe(_: unknown,
            args: {ID: number, recipeInput: {name: String, description: String}}
            ){
                const wasEdited = (await Recipe.updateOne({_id: args.ID},
                { name: args.recipeInput.name,
                    description: args.recipeInput.description,
                })).modifiedCount

                return wasEdited
            }

    }
}