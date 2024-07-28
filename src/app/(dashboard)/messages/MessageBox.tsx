"use client";

import { useState } from "react";
import { MessageType } from "@/types/product-types";
import { deliverMessage } from "@/app/actions/message";
import { Thread } from "./Thread";
import { useEcho } from "@/app/custom-hooks/useEcho";
import Echo from "laravel-echo";

type MessageBoxProps = {
  initialMessages: MessageType[];
  conversationId: string;
};
export default function MessageBox({
  initialMessages,
  conversationId,
}: MessageBoxProps) {
  useEcho(listenEvents, echoCleaner);
  console.log(conversationId);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  function listenEvents(echo: Echo) {
    echo
      .join(`conversation.${conversationId}`)
      //event type might change base on the information needed
      .listen(".message.sent", function (e: MessageType) {
        //if we are listening we can then make an api call to mark the message as read(not sure)
        console.log(e);
        setMessages((messages) => [e, ...messages]);
      })
      .error((error: Error) => {
        console.log(error);
      });
  }
  function echoCleaner(echo: Echo) {
    echo.leave(`conversation.${conversationId}`);
  }
  async function sendMessage(message: string) {
    const newMessage = await deliverMessage(message);
    setMessages((messages) => [
      { content: newMessage, sending: false, creator: 1 },
      ...messages,
    ]);
  }
  return (
    <div className="col-span-9 max-h-[816px]">
      <Thread messages={messages} setMessage={sendMessage} />
    </div>
  );
}
