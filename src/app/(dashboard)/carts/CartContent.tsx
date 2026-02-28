import { getCartProducts, getCarts } from "@/app/actions/products";
import { ProductType, Cart } from "@/types/product-types";
import ProductCart from "./ProductCart";
import { Button } from "@/components/ui/button";
import { CreateQuoteDialog } from "./CreateQuoteDialog";
import { NotImplementedAlert } from "./NotImplementedAlert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
export default async function CartContent({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const { cart } = searchParams;
    const carts: Cart[] = await getCarts();


    //NOTE:: getCartProducts function returns null on empty cart items
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

    const quoteCartData = Array.from(Object.entries(cartData ?? {})).map(([merchant, items]) => ({
        merchant: merchant,
        items: items
    }))
    return (
        <div className="bg-[#F8FAFC] py-3 col-span-12 rounded-md flex flex-col justify-between h-full overflow-auto md:col-span-8 lg:col-span-9">
            {cartData ? (
                <div className="overflow-auto">
                    < div className="space-y-5 p-3">
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
                </div>
            ) : (
                <div className="p-3 flex-1">
                    <div className="flex flex-col space-y-2 h-full items-center justify-center text-center font-inter">
                        <p className="font-bold text-text-secondary text-3xl">CART IS EMTPY</p>
                        <p className="text-text-secondary text-xl">Add items to cart from Canvass Section</p>
                    </div>

                </div>

            )
            }
            <div className="flex justify-between items-center gap-x-4 px-3 py-2">
                <Button variant="outline" className="text-[#525252] shadow-none text-sm">
                    Print List
                </Button>
                <div className="flex gap-x-3">
                    <CreateQuoteDialog buttonProps={{ className: "bg-secondary-foreground hover:bg-[#83CAA8] border-border border-[1px] text-text-secondary shadow-none text-lg px-8 py-5 " }} cartItems={quoteCartData} currentCart={cart ?? ""} />
                    <Button variant="outline" className="text-[#525252] shadow-none text-sm">
                        Create Itinerary
                    </Button>
                </div>
            </div>
        </div >
    );
}
