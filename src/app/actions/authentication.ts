"use server";
import { auth, signIn, signOut } from "@/auth";
import {
  AGENCY_DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_ROUTE,
  MERCHANT_DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { fetchWithToken } from "@/services/fetchService";
import { LoginStates, States } from "@/types/auth-types";
import { AuthError } from "next-auth";
export async function registerAgencyUser(formData: States) {
  console.log("submitted form data:", formData);
  try {
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
      const data = await res.json();
      console.log(data);
      throw new Error("Auth service has error authenticating");
    }
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      role: "agency",
      redirectTo: AGENCY_DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
}
export async function agencyLoginUser(formData: LoginStates) {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      role: "agency",
      redirectTo: AGENCY_DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "something went wrong" };
      }
    }
    throw err;
  }
}
export async function logoutUser() {
  try {
    await signOut({
      redirectTo: DEFAULT_LOGIN_ROUTE,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "SignOutError":
          return { error: "Error Signing Out" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
}

export async function registerMerchantUser(formData: FormData) {
  //persist in the db and wont be authenticated until not reviewed by the admin
  try {
    console.log(formData);
    const res = await fetch(
      `${process.env.BACKEND_SERVICE_URL}/api/v1/merchant/register`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      throw new Error(
        `Something went wrong in the server, status code:  ${res.status}`,
      );
    }
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };
        default:
          return { error: "something went wrong" };
      }
    }
    throw err;
  }
}
type Role = "merchant" | "agency";

export async function authenticate(
  email: string | unknown,
  password: string | unknown,
  role: Role | unknown,
) {
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
    console.log("Failed to authenticate user in our server:", error);
    throw new Error("Failed to authenticate user in our server");
  }
}
export async function loginMerchantUser(credentialsData: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      password: credentialsData.password,
      email: credentialsData.email,
      role: "merchant",
      redirectTo: MERCHANT_DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };
        default:
          return { error: "something went wrong during sign in flow" };
      }
    }
    if (err instanceof Error) {
      console.log("We got Error: ", err.message);
      throw err;
    }
    throw err;
  }
}

export async function foo() {
  const authResult = await auth();
  if (authResult) {
    const res = await fetch(`${process.env.BACKEND_SERVICE_URL}/api/v1/bar`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authResult.apiToken}`,
      },
    });
    const data = await res.json();
    return data;
  }
  return null;
}
export async function signOutUser() {
  await signOut({ redirectTo: "/login" });
}
export async function destroyApiToken(apiToken: string) {
  await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/signout`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}
