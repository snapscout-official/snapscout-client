import Recently4 from "@/public-assets/fruits.jpg";
import Recently1 from "@/public-assets/recently1.jpeg"
import Recently2 from "@/public-assets/recently2.jpeg"
import Recently3 from "@/public-assets/recently3.jpeg"

import Image from "next/image";
import HoverText from "@/componentUtils/HoverText";
export default function RecentlyCard() {
  const products = [Recently1, Recently2, Recently3, Recently4,]
  const randIdx = Math.floor(Math.random() * products.length)
  const selectedProduct = products[randIdx]
  return (
    <div className="grid grid-cols-3 p-4 bg-white gap-x-3 items-center border-2 border-[#F1F1F1] rounded-md ">
      <Image
        src={selectedProduct}
        alt="product"
        placeholder="blur"
        sizes="(max-width: 1536px) 50vw"
        width={150}
        height={150}
        className="col-span-1 max-w-full h-full"
      />
      <div className="col-span-2 text-[#64748B] lg:text-xs 2xl:text-lg">
        <p className="text-black truncate">Product Name</p>
        <HoverText>
          <p className="font-bold truncate">Lopez Jaena St.</p>
        </HoverText>
        <div className="flex justify-between">
          <HoverText>
            <p className="truncate">100 sold</p>
          </HoverText>
          <HoverText>
            <p className="truncate">15 mins away</p>
          </HoverText>
        </div>
      </div>
    </div>
  );
}
