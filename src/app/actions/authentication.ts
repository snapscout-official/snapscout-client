"use server";
import {
  decodeJWTClaims,
  login,
  logout,
  setSessionToken,
  setUserSession,
} from "@/auth";
import {
  AGENCY_DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_ROUTE,
  MERCHANT_DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { LoginStates, States } from "@/types/auth-types";
import { decodeJwt } from "jose";
import { redirect } from "next/navigation";

/**
 * accepts relevant merchant information for registering and sends it to the laravel/api
 * if success, api returns user info and token and sets the token to the session cookie
 **/
export async function registerAgencyUser(formData: States) {
  const res = await fetch(
    `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/register`,
    {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        agencyCategory: "Testing123",
        position: "CEO",
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    return { error: "error registering agency user", errorData: errorData };
  }
  const successResultData = await res.json();
  const tokenClaims = decodeJWTClaims(successResultData.token);

  if (tokenClaims?.exp) {
    setSessionToken(successResultData.token, new Date(tokenClaims.exp * 1000));
  } else {
    setSessionToken(
      successResultData.token,
      new Date(Date.now() + 60 * 60 * 1000),
    );
  }
  //sets token in the session cookie and sets its expiration
  setSessionToken(successResultData.token, new Date(Date.now() + 60 * 1000));
  redirect(AGENCY_DEFAULT_LOGIN_REDIRECT);
}

export async function agencyLoginUser(formData: LoginStates) {
  try {
    const loginResult = await login({
      email: formData.email,
      password: formData.password,
      role: "agency",
    });

    if (!loginResult.ok) {
      const errorLoginData = await loginResult.json();
      return { error: errorLoginData.error, errorData: errorLoginData };
    }

    const successLoginData = await loginResult.json();
    const claims = decodeJwt(successLoginData.token);

    if (claims.exp) {
      setSessionToken(successLoginData.token, new Date(claims.exp * 1000));
    } else {
      return { error: "No expiration claim detected in returned token" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Error logging agency in" };
  }

  //redirect to the dashboard
  redirect(AGENCY_DEFAULT_LOGIN_REDIRECT);
}

/**
 * accepts relevant merchant information for registering and sends it to the laravel/api
 * if success, api returns user info and token and sets the token to the session cookie
 */
export async function registerMerchantUser(formData: FormData) {
  //todo:persist in the db and wont be authenticated until not reviewed by the admin
  const registerResult = await fetch(
    `${process.env.BACKEND_SERVICE_URL}/api/v1/merchant/register`,
    {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    },
  );
  if (!registerResult.ok) {
    const errorRegisterData = await registerResult.json();
    return {
      error: "Something went wrong during merchant registration",
      errorData: errorRegisterData,
    };
  }
  const successRegisterData = await registerResult.json();
  const claims = decodeJwt(successRegisterData.token);
  if (claims.exp) {
    setSessionToken(successRegisterData.token, new Date(claims.exp * 1000));
  } else {
    setSessionToken(
      successRegisterData.token,
      new Date(Date.now() + 60 * 60 * 1000),
    );
  }
  redirect(MERCHANT_DEFAULT_LOGIN_REDIRECT);
}

/**
 * logins merchant user and retrieves jwt api token from laravel/api
 * sets the retrieved api token into the session cookie of the app
 */
export async function loginMerchantUser(credentialsData: {
  email: string;
  password: string;
}) {
  try {
    const loginRes = await login({ ...credentialsData, role: "merchant" });
    if (!loginRes.ok) {
      const errorLoginData = await loginRes.json();
      return {
        error: errorLoginData.error,
        errorData: errorLoginData,
      };
    }

    const successLoginData = await loginRes.json();

    const claims = decodeJwt(successLoginData.token);

    if (claims.exp) {
      setSessionToken(successLoginData.token, new Date(claims.exp * 1000));
      if (!setUserSession(successLoginData.user, new Date(claims.exp * 1000)))
        return { error: "Error setting user session data" };
    } else {
      setSessionToken(
        successLoginData.token,
        new Date(Date.now() + 60 * 60 * 1000),
      );
      if (
        !setUserSession(
          successLoginData.user,
          new Date(Date.now() + 60 * 60 * 1000),
        )
      )
        return { error: "Error setting user session data" };
    }
  } catch (error) {
    return { error: "Error logging merchant in" };
  }

  redirect(MERCHANT_DEFAULT_LOGIN_REDIRECT);
}

/**
 * Throws an error
 */
export async function signOutUser() {
  const logoutResult = await logout();
  if (logoutResult?.error) {
    throw new Error("Error signing out");
  }
  redirect(DEFAULT_LOGIN_ROUTE);
}
