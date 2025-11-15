import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getCartProducts, getCarts } from "@/app/actions/products";
import { ProductType, Cart } from "@/types/product-types";
import ProductCart from "./ProductCart";
import { Button } from "@/components/ui/button";
export default async function CartContent({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const { cart } = searchParams;
    const carts: Cart[] = await getCarts();


    //HOW CAN CART SEARCH QUERY BECOME AN ARRAY?
    async function retrieveItems(): Promise<ProductType[][] | null> {
        try {

            if (cart) {
                return await getCartProducts(cart);
            }

            return null
        } catch (err) {
            throw err;
        }
    }
    const cartData = await retrieveItems();
    return (
        <div className="bg-[#F8FAFC] py-3 col-span-9 max-h-full rounded-md min-h-[calc(100vh-8rem)] flex flex-col">
            {cartData && cartData.length !== 0 ? (
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
            ) : (
                <div className="p-3 flex-1">
                    <div className="flex flex-col space-y-2 h-full items-center justify-center text-center font-inter">
                        <p className="font-bold text-text-secondary text-3xl">CART IS EMTPY</p>
                        <p className="text-text-secondary text-xl">Add items to cart from Canvass Section</p>
                    </div>

                </div>

            )}
            <div className="flex justify-end gap-x-4 px-3">
                <Button className="bg-secondary-foreground hover:bg-[#83CAA8] border-border border-[1px] text-text-secondary shadow-none text-lg px-8 py-5 ">
                    Print List
                </Button>
                <Button className="bg-secondary-foreground hover:bg-[#83CAA8] border-border border-[1px] text-text-secondary shadow-none text-lg px-8 py-5 ">
                    Create Itinerary
                </Button>
            </div>
        </div>
    );
}
