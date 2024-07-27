import { type ReactElement } from "react";
import MessageBox from "../MessageBox";
import { MessageType } from "@/types/product-types";

export default function Conversation(): ReactElement {
  const messages: MessageType[] = [
    {
      content: "Hello World",
      creator: 1,
      sending: false,
    },
  ];
  return <MessageBox initialMessages={messages} />;
}
