"use client";

import { useState } from "react";
import { MessageType } from "@/types/product-types";
import { deliverMessage } from "@/app/actions/message";
import { Thread } from "./Thread";
import Echo from "@ably/laravel-echo";
import useAbly from "@/app/custom-hooks/useAbly";

type MessageBoxProps = {
  initialMessages: MessageType[];
  conversationId: string;
};
export default function MessageBox({
  initialMessages,
  conversationId,
}: MessageBoxProps) {
  const [echo] = useAbly(listenEvents, echoCleaner);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  //fixed our typings

  function listenEvents(echo: Echo) {
    echo
      .join(`conversation.${conversationId}`)
      .subscribed(() => {
        console.log("Subscribed to the presence channel");
      })
      //event type might change base on the information needed
      .listen(".message.sent", function (e: MessageType) {
        //if we are listening we can then make an api call to mark the message as read(not sure)
        setMessages((messages) => [e, ...messages]);
      })
      .error((error: Error) => {
        console.log(error);
      });
  }
  function echoCleaner(echo: Echo) {
    echo.leaveChannel(`presence:conversation.${conversationId}`);
  }
  async function sendMessage(message: string): Promise<void> {
    if (!echo) {
      throw new Error("websocket error: Echo instance is not found");
    }
    const newMessage = await deliverMessage(message, conversationId);
  }
  return (
    <div className="col-span-9 max-h-[816px]">
      <Thread messages={messages} sendMessage={sendMessage} />
    </div>
  );
}
