"use client";

import { useState } from "react";
import { MessageType } from "@/types/product-types";
import { deliverMessage } from "@/app/actions/message";
import { Thread } from "./Thread";

type MessageBoxProps = {
  initialMessages: MessageType[];
};
export default function MessageBox({ initialMessages }: MessageBoxProps) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  async function sendMessage(message: string) {
    const returnedMessage = await deliverMessage(message);
    setMessages((messages) => [
      ...messages,
      { content: returnedMessage, creator: 1, sending: false },
    ]);
  }
  return (
    <div className="col-span-9 max-h-[816px]">
      <Thread messages={messages} setMessage={sendMessage} />
    </div>
  );
}
