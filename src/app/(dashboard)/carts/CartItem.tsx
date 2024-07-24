import Image from "next/image";
import User from "@/public-assets/user.svg";
import Link from "next/link";
type CartItemProp = {
  cartName: string;
};
export default function CartItem({ cartName }: CartItemProp) {
  const params = new URLSearchParams();
  params.set("cart", cartName);
  return (
    <Link
      className="p-2 flex gap-x-1 items-center bg-transparent hover:bg-transparent shadow-none"
      href={"/carts?" + encodeURI(params.toString())}
    >
      <Image src={User} alt="cart-icon" />
      <span className="text-lg text-secondary-foreground font-semibold">
        {cartName}
      </span>
    </Link>
  );
}
