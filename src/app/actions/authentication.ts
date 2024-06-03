"use server";
import { signIn, signOut } from "@/auth";
import { AGENCY_DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginStates, States } from "@/types/auth-types";
import { AuthError } from "next-auth";
export async function registerUser(formData: States) {
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
    await signOut({ redirectTo: "/login" });
    // redirect("/login");
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
export async function authenticate(
  email: string | unknown,
  password: string | unknown,
) {
  try {
    const res = await fetch("http://localhost:8001/api/v1/agency/login", {
      body: JSON.stringify({ email: email, password: password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log("Failed to authenticate user in our server:", error);
    throw new Error("Failed to authenticate user");
  }
}
