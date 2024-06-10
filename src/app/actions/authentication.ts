"use server";
import { auth, signIn, signOut } from "@/auth";
import {
  AGENCY_DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_ROUTE,
  MERCHANT_DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { LoginStates, States } from "@/types/auth-types";
import { AuthError } from "next-auth";
export async function registerAgencyUser(formData: States) {
  try {
    const res = await fetch(
      `${process.env.AUTH_SERVICE_URL}/api/v1/agency/signup`,
      {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          email: "gio.gonzales@carsu.edu.ph",
          buildingName: "Test",
          street: "Testing",
          barangay: "San Vicente",
          city: "Butuan City",
          province: "Testing",
          tinNumber: "1331231313",
          country: "Philippines",
          agencyCategory: "Test",
          position: "Manager",
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Auth service has error authenticating");
    }
    await signIn("credentials", {
      email: "gio.gonzales@carsu.edu.ph",
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
          return { error: "Something went wrong" };
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
    const res = await fetch(
      `${process.env.AUTH_SERVICE_URL}/api/v1/merchant/signup`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (!res.ok) {
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
      const res = await fetch("http://localhost:8001/api/v1/agency/login", {
        body: JSON.stringify({ email: email, password: password }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return res;
    }
    const res = await fetch(
      `${process.env.AUTH_SERVICE_URL}/api/v1/merchant/login`,
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
    const res = await fetch(`${process.env.AUTH_SERVICE_URL}/api/v1/bar`, {
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
