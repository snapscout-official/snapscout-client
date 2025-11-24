import Image from "next/image";
import { ShoppingCart } from 'lucide-react';
import Link from "next/link";
type CartItemProp = {
    cartName: string;
    selected: boolean
};
export default function CartItem({ cartName, selected }: CartItemProp) {
    const params = new URLSearchParams();
    params.set("cart", cartName);
    return (
        <Link
            className={`p-2 flex gap-x-1 items-center shadow-none rounded-md ${selected ? "bg-green-400 hover:bg-green-200" : "bg-transparent hover:bg-background"}`}
            href={"/carts?" + encodeURI(params.toString())}
        >
            <ShoppingCart />
            <span className="text-md font-normal">
                {cartName}
            </span>
        </Link>
    );
}
