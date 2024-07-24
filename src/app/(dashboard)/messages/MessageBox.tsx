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
  async function sendMessage({ message }: { message: string }) {
    await deliverMessage("Hello world");
  }
  return (
    <div className="col-span-9">
      <Thread messages={messages} />
    </div>
  );
}
