import Joi from "@hapi/joi";

type TRegister = {
    name: string;
    email: string;
    password: string;
};
type TLogin = Omit<TRegister, "name">;
type TValidatingObject = TLogin | TRegister;
type SchemaMap<T> = { [Property in keyof T]: Joi.StringSchema };

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

const validatingObjects: { [name: string]: SchemaMap<TValidatingObject> } = {
    register: { name, email, password },
    login: { email, password },
};

/**
 * Validate an object.
 * @param object The object to validate.
 * @param type The type of object to validate.
 * @returns The error that occured during validation if any.
 */
export default (
    object: TValidatingObject,
    type: keyof typeof validatingObjects
) => {
    const schema = Joi.object(validatingObjects[type]);
    const { error } = schema.validate(object);
    return error;
};
