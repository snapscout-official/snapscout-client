import FruitProduct from "@/public-assets/fruits.jpg";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HoverText from "@/componentUtils/HoverText";
export default function RecentlyCard() {
  return (
    <div className="grid grid-cols-3 shadow-md p-4 bg-white gap-x-3 items-center">
      <Image
        src={FruitProduct}
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
