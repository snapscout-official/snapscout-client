"use server";

import { fetchWithToken } from "@/services/fetchService";
import { MessageType } from "@/types/product-types";

export async function deliverMessage(
  message: string,
  conversation_id: string,
  socket_id: string,
): Promise<MessageType> {
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/send-message`,
    method: "POST",
    body: JSON.stringify({
      message: message,
      conversation_id: conversation_id,
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Socket-ID": socket_id,
    },
  });
  if (!result.ok) {
    //too vague change to proper error handling
    const errorData = await result.json();
    console.log(errorData);
    throw new Error("something went wrong in the service");
  }
  const data: MessageType = await result.json();

  return data;
}
