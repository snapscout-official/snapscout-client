import { inter, inter_semilight } from "@/app/ui/fonts";
import { Separator } from "@/components/ui/separator";
import ProductItem from "./ProductItem";
import { Order } from "@/types/product-types";

export default function TabItem({ order }: { order: Order }) {
  return (
    <div
      className={`${inter.className} bg-white shadow-md rounded-sm text-[#64748B]`}
    >
      <div
        className={` ${inter_semilight.className} flex justify-between px-5 py-2 text-sm`}
      >
        <span className="inline-flex gap-x-3 font-bold">
          <p>Merchant Name</p>
          <p>some messaging icon</p>
        </span>
        <div className={`${inter_semilight.className} flex gap-x-5`}>
          <p className="text-[#18C873]">Order in transit</p>
          <p>Order id</p>
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="space-y-2">
        {order.order_items.map((order_item) => (
          <ProductItem key={order_item._id} />
        ))}
      </div>
    </div>
  );
}
