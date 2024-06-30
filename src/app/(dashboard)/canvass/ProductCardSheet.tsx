"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard from "./ProductCard";
import { inter } from "@/app/ui/fonts";
import ProductCarousel from "./ProductCarousel";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddToCardDropDown from "./AddToCartDropDown";
export type ProductType = {
  _id: string;
  barcode: number;
  created_at: string;
  is_available: boolean;
  merchant_id?: number;
  price: number;
  product_name: string;
  quantity: number;
  specs?: Array<String> | null;
  subcategory_id: number;
  updated_at: string;
};
export default function ProductCardSheet({
  product,
}: {
  product: ProductType[];
}) {
  const [currentProduct, setCurrentProduct] = useState<ProductType>(product[0]);
  console.log(currentProduct);
  function changeProduct(id: string) {
    //typescript always ruin my fucking coding style!!!!!!!
    setCurrentProduct(product.filter((product) => product._id === id)[0]);
  }
  return (
    <Sheet>
      <SheetTrigger>
        <ProductCard productName={product[0].product_name} />
      </SheetTrigger>
      <SheetContent className={`${inter.className} bg-white md:min-w-[500px]`}>
        <SheetHeader>
          <SheetTitle className="text-xl">{product[0].product_name}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-3 h-full">
          <div className="flex justify-center w-full">
            <ProductCarousel />
          </div>
          <div>
            <p>Varities</p>
            <ScrollArea className="mt-3 w-full">
              <div className="flex space-x-7 w-max py-4">
                {product.map((product, idx) => (
                  <Button
                    onClick={() => {
                      changeProduct(product._id);
                    }}
                    key={product._id}
                    className="p-3 rounded-[.3rem] bg-secondary text-secondary-foreground hover:bg-secondary"
                  >
                    {"variety " + (idx + 1)}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="flex justify-end w-full">
              <Button variant="link" className="text-lightText">
                View ratings
              </Button>
            </div>
          </div>
          <div className="w-full border-[1px] border-border h-[300px]"></div>
          <div className="flex w-full justify-evenly py-10">
            <AddToCardDropDown />
            <Button className="px-10 py-6 bg-secondary text-secondary-foreground focus:bg-primary focus:text-primary-foreground text-lg">
              Inquire
            </Button>
            <Button className="px-10 py-6 bg-secondary text-secondary-foreground focus:bg-primary focus:text-primary-foreground text-lg">
              Request Quote
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
