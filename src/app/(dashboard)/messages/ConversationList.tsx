import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ConversationItem from "./ConversationItem";
import { fetchWithToken } from "@/services/fetchService";
import { ConversationType } from "@/types/product-types";
import { auth } from "@/auth";

export default async function ConversationList() {
  const session = await auth();
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
  console.log(conversationItems);
  return (
    <ScrollArea
      className="bg-white col-span-3 h-[816px] border-[1px] border-gray-300"
      type="scroll"
    >
      <div className="space-y-3 py-3 px-1 max-w-full">
        {conversationItems.map((conversation, idx) => (
          <ConversationItem
            key={conversation.uuid}
            userId={session?.user?.id}
            conversationData={conversation}
          />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
