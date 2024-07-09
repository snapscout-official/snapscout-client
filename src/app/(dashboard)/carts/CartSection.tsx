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
        {cartItems
          ? cartItems.map((cartItem, idx) => (
              <CartItem key={idx} cartName={cartItem.cart_name} />
            ))
          : null}
        <Separator orientation="horizontal" />
        <CreateNewCartSheet />
      </CardContent>
    </Card>
  );
}
