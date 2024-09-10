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
  participantName: string;
};
export default function MessageBox({
  initialMessages,
  conversationId,
  participantName,
}: MessageBoxProps) {
  const echo = useAbly(listenEvents, echoCleaner);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  function listenEvents(echo: Echo) {
    echo
      .join(`conversation.${conversationId}`)
      .subscribed(() => {
        console.log("Subscribed to the presence channel");
      })
      .listen(".message.sent", function (e: { message: MessageType }) {
        //if we are listening we can then make an api call to mark the message as read(not sure)
        setMessages((messages) => [e.message, ...messages]);
      })
      .error((error: Error) => {
        //handle message error
        console.log(error);
      });
  }
  function echoCleaner(echo: Echo) {
    echo.leaveChannel(`presence:conversation.${conversationId}`);
  }
  async function sendMessage(message: string): Promise<void> {
    const socketId = echo ? echo.socketId() : "";
    await deliverMessage(message, conversationId, socketId);
    console.log("Done");
  }
  return (
    <div className="col-span-9 max-h-[816px]">
      <Thread
        messages={messages}
        sendMessage={sendMessage}
        merchantName={participantName}
      />
    </div>
  );
}
