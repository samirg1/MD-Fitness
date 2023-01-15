import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";

import { comparePassword, hashPassword } from "../../api/bcrypt";
import validateObject from "../../api/joi";
import { signToken } from "../../api/jsonwebtoken";
import UserModel from "../../models/User";
import UserType from "../types/User";

/**
 * GraphQL mutation object for logging in, registering and logging out.
 */
const AuthenticationType = new GraphQLObjectType({
    name: "Authentication",
    description: "Authentication resolvers for login, signup, and logout",
    fields: () => ({
        login: {
            type: UserType,
            description: "Login a user",
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, { email, password }, { res }) => {
                const errorMessage = "invalid email and/or password"; // default error message

                validateObject({ email, password }, "login"); // validate login object

                const user = await UserModel.findOne({ email }); // get user

                // ensure user exists and has been activated
                if (!user) throw new Error(errorMessage);
                if (!user.activated)
                    throw new Error(
                        "Account has not been activated, please check your email for a confirmation"
                    );

                // check password
                const validPassword = await comparePassword(
                    password,
                    user.password
                );
                if (!validPassword) throw new Error(errorMessage);

                // get an access token
                const accessToken = signToken(
                    {
                        email: user.email,
                        permissions: user.permissions,
                    },
                    "access"
                );

                // get a refresh token
                const refreshToken = signToken(
                    {
                        email: user.email,
                        permissions: user.permissions,
                    },
                    "refresh"
                );

                // store refresh token in secure cookie
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.header("authentication-token", accessToken);

                // send details
                const returnObject = user;
                returnObject.accessToken = accessToken;
                return returnObject;
            },
        },

        signup: {
            type: UserType,
            description: "Register a user",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, { name, email, password }) => {
                validateObject({ name, email, password }, "signup"); // validate the registration

                const emailExists = await UserModel.findOne({ email }); // check if the email exists
                if (emailExists) throw new Error("email already exists");

                // create new user
                password = await hashPassword(password);
                const user = new UserModel({ name, email, password });

                // save user
                try {
                    return await user.save();
                } catch (savingError) {
                    throw new Error(savingError);
                }
            },
        },

        logout: {
            type: GraphQLBoolean,
            description: "Logout a user",
            resolve: async (_, __, context) => {
                const { res } = context;
                const cookies = context.cookies; // get the cookies
                if (!cookies?.jwt) return true;
                res.clearCookie("jwt", {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                }); // clear the cookie
                return true;
            },
        },
    }),
});

export default AuthenticationType;
