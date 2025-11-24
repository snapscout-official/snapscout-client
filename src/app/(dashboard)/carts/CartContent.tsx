import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getCartProducts, getCarts } from "@/app/actions/products";
import { ProductType, Cart } from "@/types/product-types";
import ProductCart from "./ProductCart";
import { Button } from "@/components/ui/button";
import { CreateQuoteDialog } from "./CreateQuoteDialog";
export default async function CartContent({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const { cart } = searchParams;
    const carts: Cart[] = await getCarts();


    //HOW CAN CART SEARCH QUERY BECOME AN ARRAY?
    async function retrieveItems(): Promise<{ [key: string]: ProductType[] } | null> {
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
    console.log("cArt Data", cartData)

    return (
        <div className="bg-[#F8FAFC] py-3 col-span-9 rounded-md flex flex-col">
            {cartData ? (
                <ScrollArea className="flex-1">
                    <div className="p-3">
                        {Array.from(Object.entries(cartData)).map(([key, value]) => (
                            <ProductCart
                                cart={value}
                                key={key}
                                merchant_name={key.toString()}
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
                <CreateQuoteDialog buttonProps={{ className: "bg-secondary-foreground hover:bg-[#83CAA8] border-border border-[1px] text-text-secondary shadow-none text-lg px-8 py-5 " }} cartItems={cartData} />
                <Button className="bg-secondary-foreground hover:bg-[#83CAA8] border-border border-[1px] text-text-secondary shadow-none text-lg px-8 py-5 ">
                    Create Itinerary
                </Button>
            </div>
        </div>
    );
}
