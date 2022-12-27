/**
 * The public settings menu options.
 */
export const PUBLIC_SETTINGS = {
    loginSignup: "Login / Signup",
} as const;

/**
 * The user settings menu options.
 */
export const USER_SETTINGS = {
    accountPage: "Account",
    logout: "Logout",
} as const;

/**
 * The admin settings menu options.
 */
export const ADMIN_SETTINGS = {
    accountPage: "Account" as const,
    admin: "Admin",
    logout: "Logout",
} as const;

/**
 * The publicly available pages
 */
export const PUBLIC_PAGES = {
    programs: "Programs",
} as const;
