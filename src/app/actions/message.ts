"use server";

import { MessageType } from "@/types/product-types";

export async function deliverMessage(message: string): Promise<string> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  const messages = [
    {
      content: "Hello",
      creator: 1,
      sending: false,
    },
    {
      content: "Hello",
      creator: 1,
      sending: false,
    },
    {
      content: "Testing",
      creator: 1,
      sending: false,
    },
  ];

  return message;
}
