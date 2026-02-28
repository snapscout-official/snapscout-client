import { getCarts } from "@/app/actions/products";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/types/product-types";
import CartItem from "./CartItem";
import CreateNewCartSheet from "./CreateNewCartSheet";

interface CartSectionProps {
    selectedCart?: string
}
export default async function CartSection({ selectedCart }: CartSectionProps) {
    const cartItems: Cart[] = await getCarts();

    return (
        <Card className="col-span-3 h-full overflow-hidden sticky top-0">
            <CardHeader className="font-semibold p-3">
                My Carts
            </CardHeader>
            <Separator orientation="horizontal" />
            <CardContent className="p-2 space-y-2">
                <div className={`min-h-[300px] ${!cartItems || cartItems.length === 0 ? 'flex items-center' : null} `}>
                    {cartItems && cartItems.length !== 0
                        ? cartItems.map((cartItem, idx) => (
                            <CartItem key={idx} cartName={cartItem.cart_name} selected={selectedCart && selectedCart === cartItem.cart_name ? true : false} />
                        ))
                        : (
                            <p className="text-center font-inter font-semibold text-text-secondary text-lg flex items-center justify-center min-h-full">
                                NO CART AVAILABLE CURRENTLY. CREATE A CART
                            </p>
                        )}
                </div>
                <Separator orientation="horizontal" />
                <CreateNewCartSheet />
            </CardContent>
        </Card>
    );
}

export async function CartSectionV2({ selectedCart }: CartSectionProps) {
    const cartItems: Cart[] = await getCarts();

    return (
        <Card className="col-span-3 h-full sticky top-0">
            <CardHeader className="font-semibold p-3 text-lg">
                My Carts
            </CardHeader>
            <CardContent className="p-2 space-y-2">
                <div className={`min-h-[300px] ${!cartItems || cartItems.length === 0 ? 'flex flex-col items-center' : null} `}>
                    {cartItems && cartItems.length !== 0
                        ? cartItems.map((cartItem, idx) => (
                            <CartItem key={idx} cartName={cartItem.cart_name} selected={selectedCart && selectedCart === cartItem.cart_name ? true : false} />
                        ))
                        : (
                            <p className="text-center font-inter font-semibold text-text-secondary text-lg flex items-center justify-center min-h-full">
                                NO CART AVAILABLE CURRENTLY. CREATE A CART
                            </p>
                        )}
                    <CreateNewCartSheet />
                </div>
            </CardContent>
        </Card>
    )
}
