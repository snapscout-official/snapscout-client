import { inter, inter_semilight } from "@/app/ui/fonts";
import MessageIcon from "@/public-assets/message-circle-more.svg";
import { Separator } from "@/components/ui/separator";
import ProductItem from "./ProductItem";
import { Order, ProductType } from "@/types/product-types";
import HoverText from "@/componentUtils/HoverText";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TabItem({ order }: { order: Order }) {
  return (
    <div
      className={`${inter.className} bg-white shadow-md rounded-sm text-[#64748B]`}
      id={order.order_id}
    >
      <div
        className={` ${inter_semilight.className} flex justify-between px-5 py-2 text-sm`}
      >
        <span className="inline-flex gap-x-3 font-bold items-center">
          <p>{order.merchant_name}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-[#3AD979] rounded-full aspect-square w-[25px]  flex items-center justify-center ">
                  <Image
                    src={MessageIcon}
                    className="w-[15px] h-auto"
                    width={20}
                    height={20}
                    alt="message-icon"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Message Merchant {order.merchant_name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
        <div className={`${inter_semilight.className} flex gap-x-5`}>
          <p className="text-[#18C873]">{order.status}</p>
          <HoverText>
            <p className="truncate">{order.order_id}</p>
          </HoverText>
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="space-y-2">
        {order.order_items.map((order_item: ProductType) => (
          <ProductItem
            key={order_item._id}
            product={order_item}
            can_rate={order.status === "completed"}
          />
        ))}
      </div>
    </div>
  );
}
