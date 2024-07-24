import TabItem from "./TabItem";
import { Order } from "@/types/product-types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchWithToken } from "@/services/fetchService";
import ProductDialog from "./ProductDialog";

export default async function AllTab({ tab }: { tab?: string | undefined }) {
  const res = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/agency/orders?status=${tab ? tab : null}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    //we will comeback for a decent error handling
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  const orders: Order[] = data.orders.flat();
  return orders.length !== 0 ? (
    <div className="bg-[#F8FAFC]">
      <ScrollArea className="h-[774px] p-5">
        <div className="space-y-7">
          {orders.map((order: Order, idx: number) => (
            <TabItem key={idx} order={order} />
          ))}
          {orders.map((order: Order, idx: number) => (
            <ProductDialog key={idx} order={order} />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  ) : (
    <div className=" font-bold text-2xl text-red-500 flex justify-center items-center h-[300px]">
      No current orders
    </div>
  );
}
