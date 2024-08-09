import { type ReactElement } from "react";
import MessageBox from "../MessageBox";
import { ConversationType, MessageType } from "@/types/product-types";
import { headers } from "next/headers";
import { fetchWithToken } from "@/services/fetchService";
import { auth } from "@/auth";

export default async function Conversation(): Promise<ReactElement> {
  //we will fetch the messages right here for the conversation
  const headerList = headers();
  const session = await auth();
  const currentPath = headerList.get("x-current-path");
  if (!currentPath) {
    throw new Error("Why is there no path?");
  }
  const conversationId = currentPath.split("/")[2];
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/messages/${conversationId}`,
    method: "GET",
  });
  if (!result.ok) {
    throw new Error("Messages cannot be retrieved");
  }
  const data = await result.json();
  const messages: MessageType[] = data.messages;
  const conversation_data: ConversationType = data.conversation_data;
  const participantName = conversation_data.participants_data.filter(
    (participant) => participant.id != session?.user?.id,
  )[0].name;
  return (
    <MessageBox
      initialMessages={messages}
      conversationId={conversationId}
      participantName={participantName}
    />
  );
}
