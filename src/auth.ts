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
//functio that will parse the api token
function parseJWT(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    console.log(err);
  }
}
export function decodeJWTClaims(token?: string) {
  if (!token) {
    const sessionToken = getSessionToken();
    return sessionToken ? decodeJwt(sessionToken) : null;
  }
  return decodeJwt(token);
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

export function getSessionToken() {
  return cookies().get("sessionToken")?.value;
}
export function isAuthenticated(request: NextRequest) {
  //we can access cookie from here
  return getSessionToken() ? true : false;
}

/**
 * invalidates token in laravel/api and delete the api token in cookie
 */
export async function logout() {
  //invalidate the sessionToken first
  const fetchResult = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/signout`,
    method: "POST",
  });
  if (!fetchResult.ok) {
    const signOutErrorData = await fetchResult.json();
    return { error: "Error during signing out", errorData: signOutErrorData };
  }
  cookies().delete("sessionToken");
}
/**
 * login function for snapscout users
 * throws error when fetch fails
 */
export async function login({ email, password, role }: any) {
  try {
    if (role === "agency") {
      const res = await fetch(
        `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/login`,
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
//this returns the sessionData
export async function auth() {
  //only server components can call this function or anything that resides in the server environment
  const sessionData = getSessionToken();
  if (sessionData) {
    const user = decodeJWTClaims(sessionData);
    return { apiToken: sessionData, user: user };
  }
  return null;
}
