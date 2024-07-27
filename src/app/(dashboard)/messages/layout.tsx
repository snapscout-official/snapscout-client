import React, { type ReactElement } from "react";
import DashboardContainer from "@/componentUtils/DashboardContainer";
import ConversationList from "./ConversationList";
export default function layout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <DashboardContainer>
      <div className="grid grid-cols-12  ">
        <ConversationList />
        {children}
      </div>
    </DashboardContainer>
  );
}
