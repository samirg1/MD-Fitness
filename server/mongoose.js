const mongoose = require("mongoose");

const mongoConnect = (callback) => {
    mongoose.connect(process.env.DB_CONNECTION_URL, callback());
};

const createModel = (name, schemaObject) => {
    return mongoose.model(name, mongoose.Schema(schemaObject));
};

module.exports = { mongoConnect, createModel };
