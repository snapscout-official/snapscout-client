import RecentlyViewed from "./RecentlyViewed";
import MainSection from "./MainSection";
import { cookies } from "next/headers";
import { Cart } from "@/app/actions/products";
export default async function Canvass() {
  const cartCookie = cookies().get("carts");
  if (cartCookie) {
    const cartData: Cart[] = JSON.parse(cartCookie.value);
    cartData.forEach((cart) => {
      console.log(cart.items);
    });
  }
  return (
    <div className="grid grid-cols-12 gap-x-4 mt-5">
      <RecentlyViewed />
      <MainSection />
    </div>
  );
}
