import Image from "next/image";
import User from "@/public-assets/user.svg";
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
            className={`p-2 flex gap-x-1 items-center  shadow-none rounded-md ${selected ? "bg-green-400 hover:bg-green-200" : "bg-transparent hover:bg-background"}`}
            href={"/carts?" + encodeURI(params.toString())}
        >
            <Image src={User} alt="cart-icon" />
            <span className="text-lg text-text-secondary font-semibold">
                {cartName}
            </span>
        </Link>
    );
}
