const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

/**
 * Connect to the mongoDB database.
 * @param {Function} callback Callback function after connection is established.
 */
const mongoConnect = (callback) => {
    mongoose.connect(process.env.DB_CONNECTION_URL, callback());
};

/**
 * Create a mongoDB model.
 * @param {string} name The name of the model.
 * @param {object} schemaObject Schema object representing the model.
 * @returns The created model.
 */
const createModel = (name, schemaObject) => {
    return mongoose.model(name, mongoose.Schema(schemaObject));
};

module.exports = { mongoConnect, createModel };
