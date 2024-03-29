import bcrypt from "bcryptjs";

/**
 * Hash a password.
 * @param password Password to hash.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

/**
 * Compare two password hashes and see if they match.
 * @param attemptedPassword The attempted password.
 * @param actualPassword The actual hashed password to compare against.
 * @returns Whether the passwords match.
 */
export const comparePassword = async (
    attemptedPassword: string,
    actualPassword: string
) => {
    return await bcrypt.compare(attemptedPassword, actualPassword);
};
