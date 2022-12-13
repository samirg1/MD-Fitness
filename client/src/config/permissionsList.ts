/**
 * List of permissions available for the users.
 */
const PERMISSIONS = {
    'user' : 1,
    'admin' : Number(process.env.REACT_APP_ADMIN_PERMISSION as string),
}

export default PERMISSIONS;