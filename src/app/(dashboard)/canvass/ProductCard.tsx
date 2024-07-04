import ProductSpam from "@/public-assets/product-spam.jpg";
import Pin from "@/public-assets/map-pin.svg";
import Image from "next/image";
import { inter } from "@/app/ui/fonts";
import HoverText from "@/componentUtils/HoverText";
type ProductProps = {
  productName: string;
};
export default function ProductCard({ productName }: ProductProps) {
  return (
    <div
      className={`bg-white shadow-md rounded-[.5rem] py-2 ${inter.className}`}
    >
      <Image src={ProductSpam} alt="product-picture" />
      <div className="space-y-2">
        <div className="flex px-4 justify-between">
          <p className="">{productName}</p>
          <span>4.9</span>
        </div>
        <div className="flex px-4 gap-1 max-w-max">
          <Image src={Pin} alt="map-pin" width={20} height={20} />
          <HoverText>
            <p className="text-[#64748B] font-semibold truncate">
              Lopez Jaena St.
            </p>
          </HoverText>
        </div>
      </div>
    </div>
  );
}
