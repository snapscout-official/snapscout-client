"use server";
import { fetchWithToken } from "@/services/fetchService";

export async function deliverMessage(message: string, conversation_id: string) {
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/send-message`,
    method: "POST",
    body: JSON.stringify({
      message: message,
      conversation_id: conversation_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!result.ok) {
    //too vague change to proper error handling
    const errorData = await result.json();
    console.log(errorData.message);
    throw new Error("something went wrong in the service");
  }
  await result.json();
}
