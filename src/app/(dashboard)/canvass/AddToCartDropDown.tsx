"use client";
import User from "@/public-assets/user.svg";
import Add from "@/public-assets/plus.svg";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CartMenuItem from "@/componentUtils/CartMenuItem";
import { ProductType, Cart } from "@/types/product-types";
import { addToCart } from "@/app/actions/products";
import { ToastAction } from "@/components/ui/toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AddToCartDropDown({
    product,
    disabled,
    cartData,
}: {
    product: ProductType;
    disabled: boolean;
    cartData: Cart[];
}) {
    const { toast } = useToast();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    disabled={disabled}
                    className=" py-2 px-2 bg-secondary  hover:bg-primary md:py-6 md:px-8"
                >
                    <Image src={Add} alt="add-icon" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px] bg-white rounded-[.3rem]">
                <DropdownMenuLabel>My Carts</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-[1px] border-lightText" />
                <DropdownMenuGroup>
                    {cartData ? (
                        cartData.map((cart: Cart, idx: number) => (
                            <CartMenuItem
                                key={idx}
                                clickHandler={async () => {
                                    await addToCart(cart.cart_name, {
                                        quantity: 12,
                                        product_id: product.id,
                                    });
                                    toast({
                                        title: `Product Added to Cart ${cart.cart_name}`,
                                        description: `Product ${product.product_name} has been added to cart ${cart.cart_name}`,
                                        action: <ToastAction altText="done">Done</ToastAction>,
                                    });
                                }}
                            >
                                <Image
                                    src={User}
                                    alt="user-icon"
                                    width={25}
                                    height={25}
                                    className="mr-2"
                                />
                                {cart.cart_name}
                            </CartMenuItem>
                        ))
                    ) : (
                        <DropdownMenuItem>No Cart Currently</DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
