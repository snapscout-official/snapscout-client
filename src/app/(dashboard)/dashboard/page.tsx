import DashboardContainer from "@/componentUtils/DashboardContainer";
import SideMenu from "./SideMenu";
import MainContent from "./MainContent";
import { auth } from "@/auth";
import { cookies } from "next/headers";

async function Dashboard() {
  cookies();
  const session = await auth();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <DashboardContainer>
      <div className="grid grid-cols-1 gap-2 min-h-full xl:grid-cols-12">
        <SideMenu />
        <MainContent />
      </div>
    </DashboardContainer>
  );
}

export default Dashboard;
