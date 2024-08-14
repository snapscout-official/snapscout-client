"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ConversationItem from "./ConversationItem";
import { ConversationType } from "@/types/product-types";
import { useState } from "react";
import useAbly from "@/app/custom-hooks/useAbly";
import Echo from "@ably/laravel-echo";
type ConversationListProps = {
  conversationItems: ConversationType[];
  userId: string;
};
export default function ConversationList({
  conversationItems,
  userId,
}: ConversationListProps) {
  const [conversations, setConversations] =
    useState<ConversationType[]>(conversationItems);
  const executor = (echo: Echo) => {
    echo
      .private(`conversation_user.${userId}`)
      .subscribed(() => {
        console.log("we have subscribed");
      })
      .listen(
        ".conversation.update",
        //make this readable
        (e: { updated_conversation: ConversationType }) => {
          setConversations((conversations) =>
            sortByKey(
              [
                ...conversations.filter(
                  (conversation) =>
                    e.updated_conversation.uuid !== conversation.uuid,
                ),
                e.updated_conversation,
              ],
              "updated_at",
            ),
          );
        },
      )
      .error((error: Error) => {
        //rethrow the error. handle properly
        throw error;
      });
  };
  useAbly(executor, (echo) => {
    echo.leaveChannel(`private:conversation_user.${userId}`);
  });

  //sorts conversation based on updated_at
  function sortByKey<T>(items: T[], key: keyof T): T[] {
    return items.toSorted((a, b) => {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    });
  }

  return (
    <ScrollArea
      className="bg-white col-span-3 h-[816px] border-[1px] border-gray-300"
      type="scroll"
    >
      <div className="space-y-3 py-3 px-1 max-w-full">
        {conversations.map((conversation, _) => (
          <ConversationItem
            key={conversation.uuid}
            userId={userId}
            conversationData={conversation}
          />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
