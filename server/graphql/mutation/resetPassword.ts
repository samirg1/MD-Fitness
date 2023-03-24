import crypto from 'crypto';

import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { sendPasswordResetEmail } from '../../api/mailer';
import UserModel from "../../models/User";

const ResetPasswordType = new GraphQLObjectType({
    name: "Password Reset",
    description: "Restting a user's password",
    fields: () => ({
        requestResetCode: {
            type: GraphQLBoolean,
            description: "Add a purchase to a user",
            args: {
                userEmail: { type: GraphQLNonNull(GraphQLString) },
                emailHtml: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, { userEmail, emailHtml }) => {
                const foundUser = await UserModel.findOne({ email: userEmail });
                if (!foundUser) throw new Error("No user found with that email");

                const resetPasswordCode = crypto.randomBytes(3).toString('hex').toUpperCase();
                foundUser.resetPasswordCode = resetPasswordCode;

                sendPasswordResetEmail(userEmail, emailHtml, resetPasswordCode);
                return true;
            },
        },
    }),
});

export default ResetPasswordType;