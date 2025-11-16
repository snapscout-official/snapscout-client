"use client";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard from "./ProductCard";
import { inter } from "@/app/ui/fonts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddToCartDropDown from "./AddToCartDropDown";
import InquireCard from "./InquireCard";
import { writeCookie } from "@/app/actions/products";
import RequestQuote from "./RequestQuote";
import { Cart, ProductType } from "@/types/product-types";
import ProductInformation from "./ProductInformation";
export default function ProductCardSheet({
    product,
    cartData,
}: {
    product: ProductType[];
    cartData: Cart[];
}) {
    const [currentProduct, setCurrentProduct] = useState<ProductType>(product[0]);
    const [content, setContent] = useState<string>("product");
    function changeProduct(id: string) {

        setCurrentProduct(product.filter((product) => product.id === id)[0]);
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
                className={`${inter.className} bg-white overflow-auto h-full p-4 md:min-w-[500px]`}
            >
                <SheetHeader>
                    <SheetTitle className="text-xl">
                        {currentProduct.product_name}
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-2 h-full">
                    {content == "product" && (
                        <ProductInformation
                            product={product}
                            changeProduct={changeProduct}
                        />
                    )}
                    {content === "inquire" && <InquireCard />}
                    {content === "request-quote" && <RequestQuote product={product} />}
                    <div className="flex w-full justify-evenly py-6 gap-x-2">
                        <AddToCartDropDown
                            disabled={content !== "product"}
                            product={currentProduct}
                            cartData={cartData}
                        />
                        <Button
                            onClick={async () => {
                                await writeCookie(product[0]);
                                handlePanelChange("inquire");
                            }}
                            className={
                                (content === "inquire"
                                    ? "bg-primary text-primary-foreground"
                                    : `bg-secondary text-secondary border-1 border-secondary-foreground`) +
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
                                    : `bg-secondary text-secondary border-1 border-secondary-foreground`) +
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
