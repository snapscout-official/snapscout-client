"use server";
import { fetchWithToken } from "@/services/fetchService";

export async function deliverMessage(
  message: string,
  conversation_id: string,
  socket_id: string,
) {
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/send-message`,
    method: "POST",
    body: JSON.stringify({
      message: message,
      conversation_id: conversation_id,
    }),
    //socket id is not working currently
    headers: {
      "Content-Type": "application/json",
      // "X-Socket-ID": socket_id,
    },
  });
  if (!result.ok) {
    //too vague change to proper error handling
    const errorData = await result.json();
    throw new Error("something went wrong in the service");
  }
  await result.json();
}
