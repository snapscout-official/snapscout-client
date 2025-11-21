import DashboardContainer from "@/componentUtils/DashboardContainer";
import SideMenu from "./SideMenu";
import MainContent from "./MainContent";
import { cookies } from "next/headers";

async function Dashboard() {
    cookies();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return (
        <DashboardContainer>
            <div className="grid grid-cols-1 gap-2 h-full xl:grid-cols-12">
                <SideMenu />
                <MainContent />
            </div>
        </DashboardContainer>
    );
}

export default Dashboard;
