import ProductCart from "./ProductCart";
import { getCartProducts } from "@/app/actions/products";

export default async function CartContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { cart } = searchParams;
  if (cart && !Array.isArray(cart)) {
    const carts = await getCartProducts(cart);
    console.log(carts);
  }

  return (
    <div className="bg-[#F8FAFC] p-3 col-span-9">
      <ProductCart />
    </div>
  );
}
