import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { fetchWithToken } from "./services/fetchService";

//checks wether the apitoken is not expired
function getIsValidToken(token: string) {
    if (!token) {
        return false;
    }
    const parsedJWT = parseJWT(token);
    const JWTExpirationDate = new Date(parsedJWT.exp * 1000);
    if (JWTExpirationDate < new Date()) {
        return false;
    }
    return true;
}

//function that will parse the api token
function parseJWT(token: string) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
        return err;
    }
}

export function decodeJWTClaims(token: string | undefined) {
    if (!token) {
        const sessionToken = getSessionToken();
        return sessionToken ? decodeJwt(sessionToken) : null;
    }
    return decodeJwt(token);
}

export function getUserSession() {
    const userData = cookies().get("userData")?.value;
    if (!userData) {
        return null
    }
    return JSON.parse(userData);
}
export function getCurrentUserRole() {
    const token = getSessionToken();
    if (token) {
        const claims = decodeJWTClaims(token);
        switch (claims?.role_id) {
            case 1:
                return "Merchant";
            case 2:
                return "Agency";
            default:
                return "";
        }
    }
}
export function setUserSession(user: MyUser, expires: Date) {
    try {
        cookies().set("userData", JSON.stringify(user), {
            expires: expires,
            httpOnly: true,
            sameSite: true,
        });
        return true;
    } catch (_) {
        return false;
    }
}
export function getSessionToken() {
    return cookies().get("sessionToken")?.value;
}
export function isAuthenticated(request: NextRequest) {
    //we can access cookie from here
    return getSessionToken() ? true : false;
}

/**
 * login function for snapscout users
 * throws error when fetch fails
 */
export async function login({ email, password, role }: any) {
    try {
        if (role === "agency") {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/agency/login`,
                {
                    body: JSON.stringify({ email: email, password: password }),
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                },
            );
            return res;
        }
        const res = await fetch(
            `${process.env.BACKEND_SERVICE_URL}/api/v1/merchant/login`,
            {
                body: JSON.stringify({ email: email, password: password }),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            },
        );
        return res;
    } catch (error) {
        throw error;
    }
}

//retrives authenticated user info from the cookie
//NOTE:: this is useful for a server component
export async function auth() {
    const token = getSessionToken();
    const user = getUserSession();

    if (token && user) {
        return { apiToken: token, user: user };
    }

    return { apiToken: null, user: null };
}

export function updateSessionToken(token: string, expires: Date) {
    setSessionToken(token, expires);
}

export function setSessionToken(token: string, expires: Date) {
    cookies().set("sessionToken", token, {
        expires: expires,
        httpOnly: true,
        sameSite: true,
    });
}

/**
 * invalidates token in laravel/api and delete the api token in cookie
 */
export async function logout() {
    const fetchResult = await fetchWithToken({
        url: `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/signout`,
        method: "POST",
    });
    if (!fetchResult.ok) {
        const signOutErrorData = await fetchResult.json();
        return { error: "Error during signing out", errorData: signOutErrorData };
    }
    cookies().delete("sessionToken");
    cookies().delete("userData");
}
