import { GraphQLObjectType } from "graphql";

import AuthenticationType from "./authentication.js";
import ConfirmationType from "./confirmation.js";
import EditUserType from "./editUser.js";
import PurchaseType from "./purchases.js";
import ResetPasswordType from "./resetPassword.js";

/**
 * Root type for GraphQL mutations.
 */
const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        authentication: { type: AuthenticationType, resolve: () => true },
        confirmation: { type: ConfirmationType, resolve: () => true },
        purchases: { type: PurchaseType, resolve: () => true },
        editAccount: { type: EditUserType, resolve: () => true },
        resetPassword: { type: ResetPasswordType, resolve: () => true },
    }),
});

export default RootMutationType;
