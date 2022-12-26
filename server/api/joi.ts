import Joi from "@hapi/joi";

type TRegister = {
    name: string;
    email: string;
    password: string;
};
type TLogin = Omit<TRegister, "name">;

type TValidatingObject = TLogin | TRegister;
type TValidatingTypes = "register" | "login";

type TSchemaMap<T> = { [Property in keyof T]: Joi.StringSchema };
type TValidationObjectMap<T> = { [Propery in TValidatingTypes]: TSchemaMap<T> };

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

const validatingObjects: TValidationObjectMap<TValidatingObject> = {
    register: { name, email, password },
    login: { email, password },
};

/**
 * Validate an object.
 * @param object The object to validate.
 * @param type The type of object to validate.
 * @throws If an error occurs whilst validating the object.
 */
export default (
    object: TValidatingObject,
    type: keyof typeof validatingObjects
) => {
    const schema = Joi.object(validatingObjects[type]);
    const { error } = schema.validate(object);
    if (error) throw new Error(error.message);
};
