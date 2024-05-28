"use server";
import { signIn } from "@/auth";
import { AGENCY_DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { States } from "@/types/auth-types";
import { AuthError } from "next-auth";
export async function registerUser(formData: States) {
  try {
    const res = await fetch("http://localhost:8001/api/v1/agency/signup", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        gender: "Male",
        email: "gio.gonzales@carsu.edu.ph",
        buildingName: "Test",
        street: "Testing",
        barangay: "San Vicente",
        city: "Butuan City",
        province: "Testing",
        dateOfBirth: "June 11, 2002",
        tinNumber: "1331231313",
        country: "Philippines",
        agencyCategory: "Test",
        position: "Manager",
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Auth service response went wrong");
      return;
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
