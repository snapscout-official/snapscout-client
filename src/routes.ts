/**
 * An array of routes that are public to users
 * Routes that do not require authentication
 * @type {string []}
 */
export const publicRoutes = ["/", "/register", "/login"];

/**
 * An array of routes that are used for authentication
 * @type {string []}
 */

export const authRoutes = ["/register", "/login"];
/**
 *
 * Redirect route after for agencies login
 * Routes will redirect to /settings
 *
 * @type {string }
 */
export const AGENCY_DEFAULT_LOGIN_REDIRECT = "/dashboard";
/**
 * The route for logging in
 * @type {string }
 */
export const DEFAULT_LOGIN_ROUTE = "/login";
/**
 * The route for registering in
 * @type {string }
 */
export const DEFAULT_REGISTER_ROUTE = "/register";
