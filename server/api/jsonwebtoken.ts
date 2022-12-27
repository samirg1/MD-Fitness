import jsonwebtoken from "jsonwebtoken";

/**
 * Token types used throughout the application
 */
const tokenTypes = {
    access: {
        secret: process.env.TOKEN_SECRET as string,
        expiry: 60 * 10, // 10 mins
    },
    refresh: {
        secret: process.env.REFRESH_TOKEN_SECRET as string,
        expiry: 60 * 60 * 24, // 1 day
    },
    confirmation: {
        secret: process.env.CONFIRMATION_TOKEN_SECRET as string,
        expiry: 60 * 60, // 1 hour
    },
};
type TTokenTypes = keyof typeof tokenTypes;

/**
 * Sign and create a JWT.
 * @param payload The payload to send in the token.
 * @param type The type of token to create.
 * @param options Additional options for signing.
 * @returns The signed token.
 */
export const signToken = (
    payload: string | object,
    type: TTokenTypes,
    options?: jsonwebtoken.SignOptions
) => {
    return jsonwebtoken.sign(payload, tokenTypes[type].secret, {
        ...options,
        expiresIn: tokenTypes[type].expiry,
    });
};

/**
 * Verify a JWT.
 * @param token The token to verify.
 * @param type The type of token to verify.
 * @param callback The callback function to run once the token has been verified.
 * @param permissions The valid permissions for this token to have.
 * @throws If the token is invalid or authentication is denied.
 */
export const verifyToken = (
    token: string,
    type: TTokenTypes,
    callback: (decoded: any) => void,
    permissions?: number[]
) => {
    jsonwebtoken.verify(
        token,
        tokenTypes[type].secret,
        (error, decoded: any) => {
            if (error) throw new Error("Forbidden error");
            if (!decoded) throw new Error("Invalid credentials");
            if (permissions) {
                const permisionFound = permissions.find((permission) =>
                    decoded.permissions.includes(permission)
                );
                if (!permisionFound) throw new Error("Unauthorised access");
            }
            callback(decoded);
        }
    );
};
