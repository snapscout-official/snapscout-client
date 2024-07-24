"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { inter, inter_semilight } from "@/app/ui/fonts";
import MessageIcon from "@/public-assets/message-circle-more.svg";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/product-types";
import HoverText from "@/componentUtils/HoverText";
import ProductItem from "./ProductItem";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/product-types";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

type ProductDialogProps = {
  order: Order;
};
export default function ProductDialog({ order }: ProductDialogProps) {
  const pathName = useSearchParams();
  const orderQuery = pathName.get("order");
  const router = useRouter();
  return (
    <Dialog open={orderQuery == order.order_id} modal>
      <DialogTrigger asChild>
        <Button className="bg-white text-secondary-foreground p-3 border-[#D4D4D4] border-[2px] hidden">
          View Item
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[1200px]" hideCloseButton>
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
        <div className="flex justify-end">
          <Button
            onClick={() => {
              router.replace("/orders");
            }}
            variant="destructive"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
