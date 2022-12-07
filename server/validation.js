const Joi = require("@hapi/joi");

const validate = (data, validatingObject) => {
    const schema = Joi.object(data);
    const { error } = schema.validate(validatingObject);
    return error;
};

// the validating fields
const name = Joi.string().required().max(50);
const email = Joi.string().required().email();
const password = Joi.string()
    .required()
    .pattern(
        new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
    );

// validating functions
const validateRegister = (registerObject) => {
    return validate({ name, email, password }, registerObject);
};

const validateLogin = (loginObject) => {
    return validate({ email, password }, loginObject);
};

module.exports = { validateRegister, validateLogin };
