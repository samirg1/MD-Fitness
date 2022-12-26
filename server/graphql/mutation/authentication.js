const { GraphQLBoolean, GraphQLString } = require("graphql");

const UserType = require("../types/User");
const UserModel = require("../../models/User");
const { hashPassword, comparePassword } = require("../../api/bcrypt");
const { signAccessToken, signRefreshToken } = require("../../api/jsonwebtoken");

const authentication = {
    login: {
        type: UserType,
        description: "Login a user",
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve: async (_, { email, password }, { res }) => {
            const errorMessage = "invalid email and/or password"; // default error message

            if (UserModel.validateLogin({ email, password }))
                throw new Error(errorMessage); // validate login object

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
            const accessToken = signAccessToken({
                email: user.email,
                permissions: user.permissions,
            });

            // get a refresh token
            const refreshToken = signRefreshToken({
                email: user.email,
                permissions: user.permissions,
            });

            // store refresh token in secure cookie
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.header("authentication-token", accessToken);

            // send details
            return user;
        },
    },

    register: {
        type: UserType,
        description: "Register a user",
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve: async (_, { name, email, password }) => {
            // validate the registration
            const validationError = UserModel.validateRegister({
                name,
                email,
                password,
            });
            if (validationError) throw new Error(validationError.message);

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
};

module.exports = authentication;
