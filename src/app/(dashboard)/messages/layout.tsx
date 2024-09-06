import React, { type ReactElement } from "react";
import DashboardContainer from "@/componentUtils/DashboardContainer";
import ConversationList from "./ConversationList";
import { auth } from "@/auth";
import { fetchWithToken } from "@/services/fetchService";
import { ConversationType } from "@/types/product-types";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<ReactElement> {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Why is there no path?");
  }

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
  console.log(fetchData.conversations);
  const conversationItems: ConversationType[] = fetchData.conversations;
  return (
    <DashboardContainer>
      <div className="grid grid-cols-12">
        <ConversationList
          conversationItems={conversationItems}
          userId={session.user.id}
        />
        {children}
      </div>
    </DashboardContainer>
  );
}
