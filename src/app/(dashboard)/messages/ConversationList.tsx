import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ConversationItem from "./ConversationItem";
import { fetchWithToken } from "@/services/fetchService";
import { ConversationType } from "@/types/product-types";

export default async function ConversationList() {
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/conversations`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  if (!result.ok) {
    throw new Error("Error getting the conversations");
  }
  const fetchData = await result.json();
  const conversationItems: ConversationType[] = fetchData.conversations;
  return (
    <ScrollArea className="bg-white col-span-3 h-[816px] border-[1px] border-gray-300">
      <div className="space-y-3 py-3 px-4">
        {conversationItems.map((conversation) => (
          <ConversationItem
            key={conversation.uuid}
            conversationData={conversation}
          />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
