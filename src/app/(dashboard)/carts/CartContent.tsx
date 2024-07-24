import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getCartProducts, getCarts } from "@/app/actions/products";
import { ProductType, Cart } from "@/types/product-types";
import ProductCart from "./ProductCart";
import { Button } from "@/components/ui/button";
export default async function CartContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { cart } = searchParams;
  const carts: Cart[] = await getCarts();
  async function retrieveItems(): Promise<ProductType[][]> {
    try {
      if (cart && !Array.isArray(cart)) {
        return await getCartProducts(cart);
      }

      if (carts.length === 0) {
        return [];
      }
      return await getCartProducts(carts[0].cart_name);
    } catch (err) {
      throw err;
    }
  }
  const cartData = await retrieveItems();
  return (
    <div className="bg-[#F8FAFC] py-3 col-span-9 max-h-full rounded-md">
      <ScrollArea className="h-[750px] max-h-full">
        <div className="p-3">
          {cartData.map((cart_items: ProductType[], idx: number) => (
            <ProductCart
              cart={cart_items}
              key={idx}
              cart_name={
                cart && !Array.isArray(cart) ? cart : carts[0].cart_name
              }
            />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <div className="flex justify-end gap-x-4 px-3">
        <Button className="bg-secondary border-border border-[1px] text-secondary-foreground shadow-none text-lg px-8 py-5 hover:bg-secondary">
          Print List
        </Button>
        <Button className="bg-secondary border-border border-[1px] text-secondary-foreground shadow-none text-lg px-8 py-5 hover:bg-secondary">
          Create Itinerary
        </Button>
      </div>
    </div>
  );
}
