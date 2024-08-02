import { type ReactElement } from "react";
import MessageBox from "../MessageBox";
import { MessageType } from "@/types/product-types";
import { headers } from "next/headers";

export default function Conversation(): ReactElement {
  //we will fetch the messages right here for the conversation
  const headerList = headers();
  const currentPath = headerList.get("x-current-path");
  if (!currentPath) {
    throw new Error("Why is there no path?");
  }
  const conversationId = currentPath.split("/")[2];

  const messages: MessageType[] = [
    {
      content: "Hello World",
      creator: 1,
      is_read: true,
      sending: false,
    },
  ];
  return (
    <MessageBox initialMessages={messages} conversationId={conversationId} />
  );
}
