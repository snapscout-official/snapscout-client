import DashboardContainer from "@/componentUtils/DashboardContainer";
import OrdersTab from "./OrdersTab";
export default function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //if we fetch all orders data in here
  return (
    <DashboardContainer>
      <div className="flex flex-col h-[814px]">
        <OrdersTab />
      </div>
    </DashboardContainer>
  );
}
