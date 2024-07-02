import { ProductType } from "@/app/(dashboard)/canvass/ProductCardSheet";
import { addToCart } from "@/app/actions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type CartButtonProp = {
  cartName: string;
  quantity: number;
  product: ProductType;
  children: React.ReactNode;
};
export default function CartMenuItem({
  cartName,
  quantity,
  product,
  children,
}: CartButtonProp) {
  return (
    <DropdownMenuItem
      onClick={async () => {
        await addToCart(cartName, quantity, product);
      }}
    >
      {children}
    </DropdownMenuItem>
  );
}
