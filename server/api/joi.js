const Joi = require("@hapi/joi");

/**
 * Validate an object based on a Joi object.
 * @param {object} data The data to validate.
 * @param {object} validatingObject The object to validate against.
 * @returns The error that occurred if any.
 */
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

/**
 * Validate a registering object.
 * @param {object} registerObject The registering object to validate.
 * @returns The error that occured during validation if any.
 */
const validateRegister = (registerObject) => {
    return validate({ name, email, password }, registerObject);
};

/**
 * Validate a login object.
 * @param {object} loginObject The login object to validate.
 * @returns The error that occured during validation if any.
 */
const validateLogin = (loginObject) => {
    return validate({ email, password }, loginObject);
};

module.exports = { validateRegister, validateLogin };
