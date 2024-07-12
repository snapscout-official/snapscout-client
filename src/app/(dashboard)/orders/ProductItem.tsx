import Image from "next/image";
import Spam from "@/public-assets/product-spam.jpg";
import { inter_semilight } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
export default function ProductItem() {
  return (
    <div className="flex justify-between px-3 items-center text-[#64748B]">
      <div className="flex gap-x-3 items-center">
        <Image
          src={Spam}
          alt="product"
          width={70}
          height={70}
          className="md:w-[70px] h-auto"
        />
        <p className="font-bold text-sm"> Product Name</p>
      </div>
      <p className={`${inter_semilight.className} text-sm`}>
        {" "}
        Product Variety here
      </p>
      <p className={`${inter_semilight.className} text-sm`}> x00</p>
      <div
        className={`${inter_semilight.className} flex items-center gap-x-4 text-[#525252]`}
      >
        <Button className="bg-white text-secondary-foreground p-3 border-[#D4D4D4] border-[2px]">
          Rate Product
        </Button>
        <Button className="bg-white text-secondary-foreground p-3 border-[#D4D4D4] border-[2px]">
          View Quote
        </Button>
        <Button className="bg-white text-secondary-foreground p-3 border-[#D4D4D4] border-[2px]">
          View Item
        </Button>
      </div>
    </div>
  );
}
