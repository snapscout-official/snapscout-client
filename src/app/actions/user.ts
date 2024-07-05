"use server";
import { fetchWithToken } from "@/services/fetchService";
import { auth, signOut } from "@/auth";

type UpdateFormData = {
  firstName: string;
  lastName: string;
  email: string;
};
export async function editProfile(formData: UpdateFormData) {
  const session = await auth();
  const res = await fetchWithToken({
    url: `${process.env.AUTH_SERVICE_URL}/api/v1/agency/update-profile`,
    method: "POST",
    apiToken: session?.apiToken,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const data = await res.json();
    return "We got error in update profile";
  }
  //signouts user for invalidating the session
  await signOut();
  //call our endpoint to invalidate token?
  return await res.json();
}
