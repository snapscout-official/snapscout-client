import { MessageType } from "@/types/product-types";
import { type ReactElement } from "react";

type MessageProps = {
  message: MessageType;
};
export function Message({ message }: MessageProps): ReactElement {
  return (
    <div className=" flex justify-end max-w-full">
      <div className="max-w-[40%] text-end bg-blue-500 p-3 rounded-xl rounded-br-none  text-wrap">
        <p className=" whitespace-normal">{message.content}</p>
        <p>{message.sending ? "Sending" : ""}</p>
      </div>
    </div>
  );
}
