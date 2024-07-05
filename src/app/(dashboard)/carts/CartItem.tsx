import Image from "next/image";
import User from "@/public-assets/user.svg";
type CartItemProp = {
  cartName: string;
};
export default function CartItem({ cartName }: CartItemProp) {
  return (
    <div className="p-2 flex gap-x-1 items-center ">
      <Image src={User} alt="cart-icon" />
      <span className="text-lg font-semibold">{cartName}</span>
    </div>
  );
}
