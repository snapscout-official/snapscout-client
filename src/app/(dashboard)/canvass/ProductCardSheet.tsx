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
import AddToCartDropDown from "./AddToCartDropDown";
import InquireCard from "./InquireCard";
import { writeCookie } from "@/app/actions/products";
import RequestQuote from "./RequestQuote";
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
  const [content, setContent] = useState<string>("product");
  function changeProduct(id: string) {
    //typescript always ruin my fucking coding style!!!!!!!
    setCurrentProduct(product.filter((product) => product._id === id)[0]);
  }
  function handlePanelChange(panel: string) {
    if (content === panel) {
      setContent("product");
      return;
    }
    setContent(panel);
  }
  return (
    <Sheet>
      <SheetTrigger>
        <ProductCard productName={product[0].product_name} />
      </SheetTrigger>
      <SheetContent
        className={`${inter.className} bg-white overflow-auto h-full p-4 md:min-w-[500px] md:overflow-hidden`}
      >
        <SheetHeader>
          <SheetTitle className="text-xl">
            {currentProduct.product_name}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-3 h-full">
          {content == "product" && (
            <div>
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
            </div>
          )}
          {content === "inquire" && <InquireCard />}
          {content === "request-quote" && <RequestQuote product={product} />}
          <div className="flex w-full justify-evenly py-6 gap-x-2">
            <AddToCartDropDown
              disabled={content !== "product"}
              product={currentProduct}
            />
            <Button
              onClick={async () => {
                await writeCookie(product[0]);
                handlePanelChange("inquire");
              }}
              className={
                (content === "inquire"
                  ? "bg-primary text-primary-foreground"
                  : `bg-secondary text-secondary-foreground`) +
                " text-xs md:text-lg md:px-10 md:py-6"
              }
            >
              Inquire
            </Button>
            <Button
              onClick={async () => {
                handlePanelChange("request-quote");
              }}
              className={
                (content === "request-quote"
                  ? "bg-primary text-primary-foreground"
                  : `bg-secondary text-secondary-foreground`) +
                " text-xs md:text-lg md:px-8 md:py-6"
              }
            >
              Request Quote
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
