import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ConversationItem from "./ConversationItem";

export default function ConversationList() {
  const conversationItems = [
    {
      image: "",
      participant: "Merchant Name",
      date: new Date(Date.now()),
      recentMessage: "Hello world",
    },
    {
      image: "",
      participant: "Merchant Name",
      date: new Date(Date.now()),
      recentMessage: "Hello world",
    },
    {
      image: "",
      participant: "Merchant Name",
      date: new Date(Date.now()),
      recentMessage: "Hello world",
    },
    {
      image: "",
      participant: "Merchant Name",
      date: new Date(Date.now()),
      recentMessage: "Hello world",
    },
    {
      image: "",
      participant: "Merchant Name",
      date: new Date(Date.now()),
      recentMessage: "Hello world",
    },
    {
      image: "",
      participant: "Merchant Name",
      date: new Date(Date.now()),
      recentMessage: "Hello world",
    },
  ];
  return (
    <ScrollArea className="bg-white col-span-3 h-[814px]">
      <div className="space-y-3 py-3 px-4">
        {conversationItems.map((conversation, idx) => (
          <ConversationItem
            key={idx}
            image={conversation.image}
            participant={conversation.participant}
            date={conversation.date}
            recentMessage={conversation.recentMessage}
          />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
