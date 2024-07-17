import DashboardContainer from "@/componentUtils/DashboardContainer";
import Client from "./Client";
import { auth } from "@/auth";

export default async function WebSocket() {
  const { apiToken } = await auth();
  return (
    <DashboardContainer>
      <Client apiToken={apiToken} />
    </DashboardContainer>
  );
}
