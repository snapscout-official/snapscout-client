import { getCarts } from "@/app/actions/products";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cart } from "@/types/product-types";
import CartItem from "./CartItem";
import CreateNewCartSheet from "./CreateNewCartSheet";

export default async function CartSection() {
    const cartItems: Cart[] = await getCarts();

    return (
        <Card className="col-span-3">
            <CardHeader className="text-center font-semibold p-3">
                My Carts
            </CardHeader>
            <Separator orientation="horizontal" />
            <CardContent className="p-2 space-y-2">
                <div className={`min-h-[300px] ${!cartItems || cartItems.length === 0 ? 'flex items-center' : null} `}>
                    {cartItems && cartItems.length !== 0
                        ? cartItems.map((cartItem, idx) => (
                            <CartItem key={idx} cartName={cartItem.cart_name} />
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
