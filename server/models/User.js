const { createModel } = require("../mongoose");
const { validateRegister, validateLogin } = require("../validation");

const Model = createModel("User", {
    name: {
        type: String,
        required: true,
        max: 255,
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
        min: 6,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    permissions: {
        type: Array,
        default: [1],
    },
});

Object.assign(Model, { validateRegister, validateLogin });

module.exports = Model;
