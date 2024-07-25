import { MessageType } from "@/types/product-types";
import { type ReactElement } from "react";

type MessageProps = {
  message: MessageType;
};
export function Message({ message }: MessageProps): ReactElement {
  return (
    <div>
      <p>{message.content}</p>
      <p>{message.sending ? "Sending" : ""}</p>
    </div>
  );
}
