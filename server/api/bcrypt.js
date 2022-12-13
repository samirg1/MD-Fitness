const bcrypt = require("bcryptjs");

/**
 * Hash a password.
 * @param {string} password Password to hash.
 * @returns {string} The hashed password.
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

/**
 * Compare two password hashes and see if they match.
 * @param {string} attemptedPassword The attempted password.
 * @param {string} actualPassword The actual password to compare against.
 * @returns {boolean} Whether the passwords match.
 */
const comparePassword = async (attemptedPassword, actualPassword) => {
    return await bcrypt.compare(attemptedPassword, actualPassword);
};

module.exports = { hashPassword, comparePassword };
