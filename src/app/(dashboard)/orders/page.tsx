import DashboardContainer from "@/componentUtils/DashboardContainer";
import OrdersTab from "./OrdersTab";
export default function Orders({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <DashboardContainer>
      <div className="flex flex-col">
        <OrdersTab />
      </div>
    </DashboardContainer>
  );
}
