import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/product-types";
import Spam from "@/public-assets/product-spam.jpg";
import Image from "next/image";
import Link from "next/link";
import { inter, inter_semilight } from "@/app/ui/fonts";
import LinkButton from "@/componentUtils/LinkButton";
import DeleteCartItemButton from "./DeleteCartItemButton";
export default function ProductCart({
  cart,
  cart_name,
}: {
  cart: ProductType[];
  cart_name: string;
}) {
  return (
    <div className={`${inter.className} bg-white`}>
      <div className="px-7 py-2 flex justify-between">
        <div className="flex gap-x-3">
          <span className="text-[#64748B] font-semibold">Merchant Name</span>
          <p>some messaging icon</p>
        </div>
        <p>Address of Merchant Here</p>
      </div>
      <Separator orientation="horizontal" />
      {cart.map((cart_item: ProductType) => (
        <div
          key={cart_item._id}
          className="flex justify-around  text-[#64748B] text-sm items-center px-3"
        >
          <div className="flex flex-1 items-center gap-x-5 ">
            <Image
              src={Spam}
              alt="product-picture"
              width={70}
              height={70}
              className="w-[100px] h-auto md:w-[70px]"
              sizes="(max-width: 768px) 100px, 70px"
            />
            <span className="flex-1 text-[#64748B] font-semibold text-sm">
              {cart_item.product_name}
            </span>
          </div>
          <span className={`${inter_semilight.className} flex-1 `}>
            Product Variety Here
          </span>
          <span
            className={
              cart_item.quantity <= 5
                ? "text-[#64748B] flex-1"
                : "text-[#18C873] flex-1"
            }
          >
            {cart_item.quantity <= 5
              ? `${cart_item.quantity} Stocks Left`
              : "In Stock"}
          </span>
          <LinkButton className={`${inter_semilight.className} text-[#64748B]`}>
            <Link href="#">Go To Item</Link>
          </LinkButton>
          <DeleteCartItemButton
            product_id={cart_item._id}
            cart_name={cart_name}
          />
        </div>
      ))}
    </div>
  );
}
