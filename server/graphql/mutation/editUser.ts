import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { hashPassword } from "../../api/bcrypt.js";
import validateObject from "../../api/joi.js";
import UserModel from "../../models/User.js";
import UserType from "../types/User.js";

/**
 * GraphQL Query object for accessing purchases
 */
const EditUserType = new GraphQLObjectType({
    name: "EditUser",
    description: "Edit a user's details",
    fields: () => ({
        editUser: {
            type: UserType,
            description: "Add a purchase to a user",
            args: {
                userEmail: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLString },
            },
            resolve: async (_, { userEmail, name, email, password }) => {
                try {
                    validateObject({ name, email, password }, "signup");
                } catch (validationError) {
                    if (password) throw validationError;
                    if (!validationError.message.startsWith(`"password"`))
                        throw validationError;
                }

                const user: any = await UserModel.findOne({ email: userEmail });
                if (!user) throw new Error("Current user not found");

                await user.updateOne({ name, email });

                if (password) {
                    password = await hashPassword(password);
                    await user.updateOne({ password });
                }

                return await user.save();
            },
        },
    }),
});

export default EditUserType;
