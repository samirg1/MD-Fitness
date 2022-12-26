import mongoose from "mongoose";

mongoose.set("strictQuery", false);

/**
 * Connect to the mongoDB database.
 * @param callback Callback function after connection is established.
 */
export const mongoConnect = (callback: () => void) => {
    mongoose.connect(process.env.DB_CONNECTION_URL as string, callback);
};

/**
 * Create a mongoDB model.
 * @param name The name of the model.
 * @param schemaObject Schema object representing the model.
 * @returns The created model.
 */
export const createModel = (name: string, schemaObject: object) => {
    return mongoose.model(name, new mongoose.Schema(schemaObject));
};
