import Product7 from "@/public-assets/product-spam.jpg";
import Product1 from "@/public-assets/product1.jpeg"
import Product2 from "@/public-assets/product2.jpeg"
import Product3 from "@/public-assets/product3.jpeg"
import Product4 from "@/public-assets/product4.jpeg"
import Product5 from "@/public-assets/product5.jpeg"
import Product6 from "@/public-assets/product6.jpeg"
import Pin from "@/public-assets/map-pin.svg";
import Image from "next/image";
import { inter } from "@/app/ui/fonts";
import HoverText from "@/componentUtils/HoverText";
type ProductProps = {
    productName: string;
};
export default function ProductCard({ productName }: ProductProps) {
    const products = [Product1, Product2, Product3, Product4, Product5, Product6, Product7,]
    // const randIdx = Math.floor(Math.random() * products.length)
    const selectedProduct = products[0]
    return (
        <div
            className={`bg-white shadow-md rounded-[.5rem] py-2 ${inter.className}`}
        >
            <Image src={selectedProduct} alt="product-picture" />
            <div className="space-y-2">
                <div className="flex px-4 justify-between">
                    <p className="">{productName}</p>
                    <span>4.9</span>
                </div>
                <div className="flex px-4 gap-1 max-w-max">
                    <Image className="w-auto h-auto" src={Pin} alt="map-pin" width={20} height={20} />
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
