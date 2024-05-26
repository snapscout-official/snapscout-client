"use server";
import { States } from "@/types/auth-types";
import { signIn } from "next-auth/react";
export async function registerUser(formData: States) {
  try {
    const res = await fetch("http://localhost:8080/api/v1/agency/signup", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        gender: "Male",
        email: "gio.gonzales@carsu.edu.ph",
        buildingName: "Test",
        street: "Testing",
        barangay: "SanVicente",
        city: "Butuan City",
        province: "Testing",
        country: "Philippines",
        agencyCategory: "Test",
        position: "Manager",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Error: ", res.status);
      return;
    }
    signIn(undefined, { callbackUrl: "/" });
  } catch (err) {
    console.log(err);
  }
}
