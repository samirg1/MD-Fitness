import { createModel, TObjectId } from "../api/mongoose";

/**
 * Interface to represent user documents
 */
interface IUser {
    _id: typeof TObjectId;
    name: string;
    email: string;
    password: string;
    permissions: number[];
    dateCreated: Date;
    activated: boolean;
}

/**
 * User model for the database.
 */
const UserModel = createModel<IUser>("User", {
    name: {
        type: String,
        required: true,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    permissions: {
        type: Array,
        default: [1],
    },
    activated: {
        type: Boolean,
        default: false,
    },
});

export default UserModel;
