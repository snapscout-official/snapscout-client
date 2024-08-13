import { cn } from "@/lib/utils";
import { MessageType } from "@/types/product-types";
import { type ReactElement } from "react";

type MessageProps = {
  message: MessageType;
  userId: number | undefined;
};
export function Message({ message, userId }: MessageProps): ReactElement {
  return (
    <div
      className={cn("flex flex-col max-w-full", {
        "items-end": message.creator == userId,
        "items-start": message.creator != userId,
      })}
    >
      <div
        className={cn("max-w-[40%] p-3 rounded-xl text-wrap", {
          "rounded-br-none bg-green-500": message.creator == userId,
          "rounded-bl-none bg-gray-500": message.creator != userId,
        })}
      >
        <p className="whitespace-normal">{message.content}</p>
      </div>
      <span>{message.status === "sending" ? "Sending" : ""}</span>
    </div>
  );
}
